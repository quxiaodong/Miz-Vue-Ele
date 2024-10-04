import config from '@/config'
import { getSetting, setSetting } from '@/utils/storage'
import { ref } from 'vue'

export const history = ref(
  getSetting('history') === undefined
    ? config.layout.history
    : !!getSetting('history')
)

export const toggleHistory = (value: boolean) => {
  history.value = value
  setSetting('history', value)
}
