import { useScreenSize } from '@/hooks/useScreenSize'
import { createInjectionState } from '@vueuse/shared'
import { ref } from 'vue'

enum Code {
  'small' = 'small',
  'default' = 'default',
  'large' = 'large'
}

const [useProvideSizeStore, useSizeStore] = createInjectionState(() => {
  const { isMobile } = useScreenSize()

  const size = ref(isMobile.value ? Code.small : Code.default)

  const sizes: { code: keyof typeof Code; stem: string }[] = [
    { code: Code.small, stem: 'common:table.size.small' },
    { code: Code.default, stem: 'common:table.size.default' },
    { code: Code.large, stem: 'common:table.size.large' }
  ]

  const change = (value: Code) => {
    size.value = value
  }

  return { size, sizes, change }
})

export { useProvideSizeStore }

export { useSizeStore }
