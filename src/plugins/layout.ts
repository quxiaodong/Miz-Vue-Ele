import { toggleColor } from '@/components/common-layout/stores/color'
import { toggleGray } from '@/components/common-layout/stores/gray'
import { toggleWeak } from '@/components/common-layout/stores/weak'
import config from '@/config'
import { getSetting } from '@/utils/storage'

export const layout = () => {
  const color = getSetting('color')
  toggleColor(color !== undefined ? color : config.layout.color, false)

  const weak = getSetting('weak')
  toggleWeak(weak !== undefined ? !!weak : config.layout.weak, false)

  const gray = getSetting('gray')
  toggleGray(gray !== undefined ? !!gray : config.layout.gray, false)
}
