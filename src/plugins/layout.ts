import { toggleColor } from '@/components/common-layout/stores/color'
import { toggleGray } from '@/components/common-layout/stores/gray'
import { toggleHistory } from '@/components/common-layout/stores/history'
import { toggleWeak } from '@/components/common-layout/stores/weak'
import { getSetting } from '@/utils/storage'

export const layout = () => {
  toggleColor(getSetting('color'))

  const history = getSetting('history')
  toggleHistory(history === undefined ? true : !!history)

  toggleWeak(!!getSetting('weak'))

  toggleGray(!!getSetting('gray'))
}
