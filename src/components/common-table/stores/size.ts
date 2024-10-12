import { useScreenSize } from '@/hooks/useScreenSize'
import { translate } from '@/utils/i18n'
import { createInjectionState } from '@vueuse/shared'
import { computed, ComputedRef, ref } from 'vue'

export enum Code {
  'small' = 'small',
  'default' = 'default',
  'large' = 'large'
}

const [useProvideSizeStore, useSizeStore] = createInjectionState(() => {
  const { isMobile } = useScreenSize()

  const size = ref(isMobile.value ? Code.small : Code.default)

  const sizes: ComputedRef<{ code: keyof typeof Code; text: string }[]> =
    computed(() => [
      { code: Code.small, text: translate('common:table.size.small') },
      { code: Code.default, text: translate('common:table.size.default') },
      { code: Code.large, text: translate('common:table.size.large') }
    ])

  const change = (value: Code) => {
    size.value = value
  }

  return { size, sizes, change }
})

export { useProvideSizeStore }

export { useSizeStore }
