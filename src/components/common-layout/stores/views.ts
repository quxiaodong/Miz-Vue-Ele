import router from '@/router'
import { ref } from 'vue'

export const show = ref<boolean>(true)
export const caches = ref<string[]>([])

export const setCaches = (value: string[]) => (caches.value = value)

export const refreshPage = (path: string, fullPath: string) => {
  const exists = caches.value.includes(path)
  if (exists) {
    caches.value = caches.value.filter(v => v !== path)
  }
  show.value = false
  router
    .push(fullPath)
    .then(() => (show.value = true))
    .then(() => {
      if (exists) {
        caches.value.push(path)
      }
    })
}
