import { translate } from '@/utils/i18n'
import { setSetting } from '@/utils/storage'
import { computed, ref } from 'vue'

export enum Code {
  'light' = 'light',
  'dark' = 'dark',
  'auto' = 'auto'
}

export const isDark = ref<boolean>()

const code = ref<keyof typeof Code>()

export const modes = computed(() => [
  { icon: 'Sunny', code: Code.light, text: translate('common:mode.light') },
  { icon: 'Moon', code: Code.dark, text: translate('common:mode.dark') },
  { icon: 'Monitor', code: Code.auto, text: translate('common:mode.auto') }
])

export const mode = computed(() => modes.value.find(v => v.code === code.value))

export const toggleMode = (value: string, isSave: boolean = true) => {
  const item = modes.value.find(v => v.code === value)
  code.value = (item ?? modes.value[modes.value.length - 1]).code

  if (isSave) {
    setSetting('dark', code.value)
  }

  if (code.value === Code.light && isDark.value !== false) {
    isDark.value = false
    startViewTransition(() => {
      document.documentElement.classList.remove('dark')
    })
  } else if (code.value === Code.dark && isDark.value !== true) {
    isDark.value = true
    startViewTransition(() => {
      document.documentElement.classList.add('dark')
    })
  } else if (code.value === Code.auto) {
    if (isDark.value !== mediaQuery.matches) {
      isDark.value = mediaQuery.matches
      startViewTransition(() => {
        document.documentElement.classList.toggle('dark', mediaQuery.matches)
      })
    }
  }
}

let event: MouseEvent | null

export const clickItem = (e: MouseEvent) => (event = e)

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

const updatePrefersDark = (event: MediaQueryListEvent) => {
  if (code.value === Code.auto) {
    isDark.value = event.matches
    document.documentElement.classList.toggle('dark', event.matches)
  }
}

mediaQuery.addEventListener('change', updatePrefersDark)

const startViewTransition = (fn: () => void) => {
  document.startViewTransition(fn).ready.then(animate)
}

const animate = () => {
  if (!event) return
  const { clientX, clientY } = event
  event = null

  const radius = Math.hypot(
    Math.max(clientX, innerWidth - clientX),
    Math.max(clientY, innerHeight - clientY)
  )

  document.documentElement.animate(
    {
      clipPath: [
        `circle(0% at ${clientX}px ${clientY}px)`,
        `circle(${radius}px at ${clientX}px ${clientY}px)`
      ]
    },
    {
      duration: 500,
      pseudoElement: '::view-transition-new(root)'
    }
  )
}
