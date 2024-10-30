import { setSetting } from '@/utils/storage'
import { ref } from 'vue'

export enum Code {
  'light' = 'light',
  'dark' = 'dark',
  'auto' = 'auto'
}

type Mode = { code: keyof typeof Code; icon: string; stem: string }

export const isDark = ref<boolean>()

export const mode = ref<Mode>()

export const modes: Mode[] = [
  { icon: 'Sunny', code: Code.light, stem: 'common:mode.light' },
  { icon: 'Moon', code: Code.dark, stem: 'common:mode.dark' },
  { icon: 'Monitor', code: Code.auto, stem: 'common:mode.auto' }
]

export const toggleMode = (code: string, isSave: boolean = true) => {
  const item = modes.find(v => v.code === code)

  mode.value = item ?? modes[modes.length - 1]
  code = mode.value.code

  if (isSave) {
    setSetting('dark', code)
  }

  if (code === Code.light && isDark.value !== false) {
    isDark.value = false
    startViewTransition(() => {
      document.documentElement.classList.remove('dark')
    })
  } else if (code === Code.dark && isDark.value !== true) {
    isDark.value = true
    startViewTransition(() => {
      document.documentElement.classList.add('dark')
    })
  } else if (code === Code.auto) {
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
  if (mode.value?.code === Code.auto) {
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
