import { toggleMode } from '@/components/common-dark/stores'
import config from '@/config'
import { getSetting } from '@/utils/storage'

export const dark = () => {
  toggleMode(getSetting('dark') ?? config.dark, false)
}
