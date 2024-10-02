import { upload as uploadApi, UploadFileInput } from '@/apis/file'
import { computed, onUnmounted, ref, toRaw } from 'vue'
import { Item, MAX_RETRIES, MAX_SIZE, Slice } from './config'

type Options = {
  multiple?: boolean
  dest?: string
}

const createInput = (options?: Options) => {
  const input = document.createElement('input')
  input.style.display = 'none'
  input.type = 'file'
  input.accept = 'image/*'

  if (options?.multiple) {
    input.multiple = true
  }

  document.body.appendChild(input)

  onUnmounted(() => {
    document.body.removeChild(input)
  })

  return input
}

const uploadSlice = async (
  item: Item,
  slice: Slice,
  dest?: string
): Promise<string | null | void> => {
  slice.status = 'upload'

  const formData = new FormData()
  formData.append('hash', item.hash)
  formData.append('type', slice.type)
  if (dest) {
    formData.append('dest', dest)
  }
  formData.append('index', slice.index.toString())
  formData.append('total', slice.total.toString())
  formData.append(
    'file',
    item.file.slice(slice.index * MAX_SIZE, (slice.index + 1) * MAX_SIZE)
  )

  return uploadApi()
    .execute(formData as unknown as UploadFileInput)
    .then(data => {
      slice.status = 'success'
      return data.data
    })
    .catch(() => {
      if (slice.retries >= MAX_RETRIES - 1) {
        slice.status = 'error'
      } else {
        slice.retries++
        return uploadSlice(item, slice, dest)
      }
    })
}

export const useUpload = (options?: Options) => {
  const input = createInput(options)

  const fileList = ref<Item[]>([])

  const loading = computed(() =>
    fileList.value.some(v => v.status === 'upload')
  )

  const worker = new Worker(new URL('./hash.worker', import.meta.url), {
    type: 'module'
  })

  const select = () => input.click()

  const change = async () => {
    const files = input.files
    if (!files) return

    worker.onmessage = (e: { data: Item }) => {
      if (options?.multiple) {
        fileList.value.push(e.data)
      } else {
        fileList.value = [e.data]
      }
    }
    worker.postMessage({ fileList: toRaw(fileList.value), files })

    input.value = ''
  }

  input.addEventListener('change', change)

  const upload = (dest?: string) => {
    return new Promise<void>((resolve, reject) => {
      const processUpload = async () => {
        for (const item of fileList.value) {
          if (item.status === 'none' || item.status === 'error') {
            item.status = 'upload'

            for (const slice of item.slices) {
              if (slice.status === 'none' || slice.status === 'error') {
                try {
                  const url = await uploadSlice(
                    item,
                    slice,
                    dest || options?.dest
                  )

                  if (slice.status === 'error') {
                    break
                  }

                  if (url) {
                    item.url = url
                  }

                  item.progress =
                    (item.slices.filter(v => v.status === 'success').length /
                      item.slices.length) *
                    100
                } catch (error) {
                  console.error('上传切片失败', error)
                  slice.status = 'error'
                  break
                }
              }
            }

            console.log('文件结束上传: ', item.file.name)
            if (item.slices.every(v => v.status === 'success')) {
              console.log('文件上传成功')
              item.status = 'success'
            } else if (item.slices.some(v => v.status === 'error')) {
              console.log('文件上传失败')
              item.status = 'error'
              reject('上传失败')
              break
            }
          }
        }

        resolve() // 完成上传后调用 resolve
      }

      processUpload().catch(error => {
        reject(error) // 捕获到的错误会被 reject
      })
    })
  }

  return { fileList, loading, select, upload }
}
