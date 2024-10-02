import CryptoJS from 'crypto-js'
import { markRaw } from 'vue'
import { Item, MAX_SIZE, Slice } from './config'

const calculateHash = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const wordArray = CryptoJS.lib.WordArray.create(
          reader.result as ArrayBuffer
        )
        const hash = CryptoJS.MD5(wordArray).toString(CryptoJS.enc.Hex)
        resolve(hash)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

const handleFile = (hash: string, file: File) => {
  const type = file.name.split('.').pop() as string
  const chunks = Math.ceil(file.size / MAX_SIZE)
  const slices: Slice[] = Array.from({ length: chunks }).map((_, index) => ({
    type,
    index,
    total: chunks,
    status: 'none'
  }))

  const item: Item = {
    file: markRaw(file),
    slices: markRaw(slices),
    hash,
    progress: 0,
    previewUrl: URL.createObjectURL(file),
    status: 'none'
  }

  return item
}

self.onmessage = async (e: { data: { fileList: Item[]; files: File[] } }) => {
  const { fileList, files } = e.data

  for await (const file of files) {
    const hash = await calculateHash(file)

    const exists = fileList.some(item => item.hash === hash)
    if (exists) {
      continue
    }

    const item = handleFile(hash, file)
    self.postMessage(item)
  }
}
