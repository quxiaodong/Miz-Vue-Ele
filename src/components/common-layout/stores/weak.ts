import { setSetting } from '@/utils/storage'
import { ref } from 'vue'

export const weak = ref(false)

export const toggleWeak = (value: boolean, isSave: boolean = true) => {
  weak.value = value

  if (isSave) {
    setSetting('weak', value)
  }

  if (value) {
    document.documentElement.classList.add('invert')
  } else {
    document.documentElement.classList.remove('invert')
  }
}
