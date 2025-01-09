import { toggleColor } from '@/components/common-layout/stores/color'
import { toggleGray } from '@/components/common-layout/stores/gray'
import { toggleWeak } from '@/components/common-layout/stores/weak'
import { getSetting } from '@/utils/storage'

export const layout = () => {
  toggleColor(getSetting('color'))

  toggleWeak(!!getSetting('weak'))

  toggleGray(!!getSetting('gray'))
}
