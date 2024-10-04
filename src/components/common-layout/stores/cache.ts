import router from '@/router'
import { ref } from 'vue'

export const caches = ref<string[]>([])

export const createCache = (path: string) => {
  const exists = caches.value.includes(path)
  if (!exists) {
    caches.value.push(path)
  }
}

export const removeCache = (path: string) => {
  const exists = caches.value.includes(path)
  if (exists) {
    caches.value = caches.value.filter(v => v !== path)
  }
}

export const refreshPage = (path: string, fullPath: string) => {
  const exists = caches.value.includes(path)
  if (exists) {
    caches.value = caches.value.filter(v => v !== path)
  }
  router.replace('/redirect?redirect=' + fullPath).then(() => {
    if (exists) {
      caches.value.push(path)
    }
  })
}
