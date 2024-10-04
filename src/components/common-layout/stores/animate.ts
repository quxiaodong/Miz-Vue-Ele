import config from '@/config'
import { getSetting, setSetting } from '@/utils/storage'
import { ref } from 'vue'

export const animates = ['fade', 'fade-right', 'fade-up', 'fade-down']

export const animate = ref(
  animates.includes(getSetting('animate') ?? '')
    ? getSetting('animate')
    : config.layout.animate
)

export const toggleAnimate = (value: string) => {
  setSetting('animate', value)
  animate.value = value
}
