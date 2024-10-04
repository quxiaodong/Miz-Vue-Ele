import { setSetting } from '@/utils/storage'
import { ref } from 'vue'

export const history = ref(false)

export const toggleHistory = (value: boolean) => {
  history.value = value
  setSetting('history', value)
}
