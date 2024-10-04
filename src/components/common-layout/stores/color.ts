import { isDark } from '@/components/common-dark/stores'
import { getSetting, setSetting } from '@/utils/storage'
import Color from 'color'
import { ref, watch } from 'vue'

const colorPrimary = '--el-color-primary'

const darkProps = Array.from(
  { length: 2 },
  (_, i) => `${colorPrimary}-dark-${i + 1}`
)

const lightProps = Array.from(
  { length: 9 },
  (_, i) => `${colorPrimary}-light-${i + 1}`
)

const defaultColor = '#409EFF'

export const color = ref(getSetting('color'))

export const toggleColor = (value?: string | null) => {
  const el = document.documentElement

  if (!value) {
    setSetting('color', undefined)
    color.value = defaultColor
    el.style.removeProperty(colorPrimary)

    darkProps.forEach(prop => el.style.removeProperty(prop))
    lightProps.forEach(prop => el.style.removeProperty(prop))
    return
  }

  setSetting('color', value)
  color.value = value
  el.style.setProperty(colorPrimary, value)

  darkProps.forEach((prop, index) => {
    const darken = index * 0.2

    let hex
    if (isDark.value) {
      hex = Color(value).lighten(darken).hex()
    } else {
      hex = Color(value).darken(darken).hex()
    }

    el.style.setProperty(prop, hex)
  })

  lightProps.forEach((prop, index) => {
    const lighten = index * 0.08

    let hex
    if (isDark.value) {
      hex = Color(value).darken(lighten).hex()
    } else {
      hex = Color(value).lighten(lighten).hex()
    }

    el.style.setProperty(prop, hex)
  })
}

watch(
  () => isDark.value,
  (_, oldValue) => {
    // 首次不需要执行toggleColor
    // 否则加载页面的时候，会执行两次toggleColor
    if (oldValue !== undefined) {
      toggleColor(color.value)
    }
  }
)
