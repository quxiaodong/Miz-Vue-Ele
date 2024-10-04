import config from '@/config'
import { useScreenSize } from '@/hooks/useScreenSize'
import { getSetting, setSetting } from '@/utils/storage'
import { useWindowSize } from '@vueuse/core'
import { computed, ref } from 'vue'

const { isMobile } = useScreenSize()
const { width: windowWidth } = useWindowSize()

export const collapse = ref(
  getSetting('asideCollapse') ??
    (isMobile.value ? true : config.layout.asideCollapse)
)

export const toggleCollapse = (payload?: boolean) => {
  const value = payload ?? !collapse.value
  // don't store collapse status on mobile
  // always close menu on mobile
  if (!isMobile.value) {
    setSetting('asideCollapse', value)
  }
  collapse.value = value
}

export const visible = ref(
  getSetting('asideVisible') ?? config.layout.asideVisible
)

export const toggleVisible = (payload?: boolean) => {
  const value = payload ?? !visible.value
  setSetting('asideVisible', value)
  visible.value = value
}

export const minWidth = ref(208)
export const maxWidth = computed(() =>
  isMobile.value ? windowWidth.value : Math.ceil(windowWidth.value * 0.5)
)
export const width = ref(getSetting('asideWidth') ?? config.layout.asideWidth)

export const toggleWidth = (payload: number) => {
  setSetting('asideWidth', payload)
  width.value = payload
}
