import { setSetting } from '@/utils/storage'
import { ref } from 'vue'

export const gray = ref(false)

export const toggleGray = (value: boolean, isSave: boolean = true) => {
  gray.value = value

  if (isSave) {
    setSetting('gray', value)
  }

  if (value) {
    document.documentElement.classList.add('grayscale')
  } else {
    document.documentElement.classList.remove('grayscale')
  }
}
