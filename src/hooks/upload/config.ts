export type Slice = {
  index: number
  total: number
  type: string
  status: 'none' | 'upload' | 'success' | 'error'
}

export type Item = {
  file: File
  hash: string
  slices: Slice[]
  progress: number
  status: 'none' | 'upload' | 'success' | 'error'
  previewUrl: string
  url?: string
}

export const MAX_SIZE = 20 * 1024

export const MAX_RETRIES = 3
