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
  dest?: string,
  retries = 1
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
      if (retries >= MAX_RETRIES) {
        slice.status = 'error'
      } else {
        return uploadSlice(item, slice, dest, retries + 1)
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
                  console.error('chunk upload fail', error)
                  slice.status = 'error'
                  break
                }
              }
            }

            console.log('file finish upload: ', item.file.name)
            if (item.slices.every(v => v.status === 'success')) {
              console.log('file upload success')
              item.status = 'success'
            } else if (item.slices.some(v => v.status === 'error')) {
              console.log('file upload fail')
              item.status = 'error'
              reject('file upload fail')
              break
            }
          }
        }

        resolve() // execute resolve after all files are uploaded
      }

      processUpload().catch(error => {
        reject(error) // execute reject if there is any error
      })
    })
  }

  return { fileList, loading, select, upload }
}
