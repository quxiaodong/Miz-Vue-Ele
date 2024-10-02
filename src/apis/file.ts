import { UploadFileInput } from '@/openapi/__generated__'
import { service } from '@/utils/service'

export type { UploadFileInput }

export const upload = () => {
  return service<UploadFileInput, string | null>(data => ({
    url: 'file/upload',
    method: 'post',
    data
  }))
}
