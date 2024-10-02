import router from '@/router'

export const navigate = {
  back: (options?: { delta?: number; link?: string }) => {
    if (window.history.length > 2) {
      router.back()
    } else {
      router.push(options?.link || '/')
    }
  }
}
