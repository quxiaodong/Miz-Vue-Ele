import { Code, toggleMode } from '@/components/common-dark/stores'
import { getSetting } from '@/utils/storage'

export const dark = () => {
  toggleMode(getSetting('dark') ?? Code.auto, false)
}
