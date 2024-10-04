import { isDark } from '@/components/common-dark/stores'
import config from '@/config'
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

export const color = ref(getSetting('color'))

export const toggleColor = (value?: string | null, isSave: boolean = true) => {
  const el = document.documentElement

  if (!value) {
    value = config.layout.color
  }

  if (isSave) {
    setSetting('color', value)
  }

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
      hex = Color(value)
        .darken(lighten * 1.2)
        .hex()
    } else {
      hex = Color(value)
        .lighten(lighten * 0.85)
        .hex()
    }

    el.style.setProperty(prop, hex)
  })
}

watch(
  () => isDark.value,
  (_, oldValue) => {
    // don't need to execute toggleColor on first load
    // otherwise, it will be executed twice when loading the page
    if (oldValue !== undefined) {
      toggleColor(color.value, false)
    }
  }
)
