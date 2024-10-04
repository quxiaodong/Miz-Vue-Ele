import { setSetting } from '@/utils/storage'
import { ref } from 'vue'

export const gray = ref(false)

export const toggleGray = (value: boolean) => {
  gray.value = value
  setSetting('gray', value)
  if (value) {
    document.documentElement.classList.add('grayscale')
  } else {
    document.documentElement.classList.remove('grayscale')
  }
}
