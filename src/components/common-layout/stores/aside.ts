import { useScreenSize } from '@/hooks/useScreenSize'
import { getSetting, setSetting } from '@/utils/storage'
import { useWindowSize } from '@vueuse/core'
import { computed, ref } from 'vue'

const { isMobile } = useScreenSize()
const { width: windowWidth } = useWindowSize()

export const collapse = ref(
  getSetting('asideCollapse') ?? (isMobile.value ? true : false)
)

export const toggleCollapse = (payload?: boolean) => {
  const value = payload ?? !collapse.value
  // 手机端不用存储，保证每次进页面
  // 菜单都是关闭状态
  if (!isMobile.value) {
    setSetting('asideCollapse', value)
  }
  collapse.value = value
}

export const visible = ref(getSetting('asideVisible') ?? true)

export const toggleVisible = (payload?: boolean) => {
  const value = payload ?? !visible.value
  setSetting('asideVisible', value)
  visible.value = value
}

export const minWidth = ref(208)
export const maxWidth = computed(() =>
  isMobile.value ? windowWidth.value : Math.ceil(windowWidth.value * 0.5)
)
export const width = ref(getSetting('asideWidth') ?? minWidth.value)

export const toggleWidth = (payload: number) => {
  setSetting('asideWidth', payload)
  width.value = payload
}
