import { createInjectionState } from '@vueuse/shared'
import { Props } from '../index'

const [useProvidePropsStore, usePropsStore] = createInjectionState(
  (props: Props) => ({ props })
)

export { useProvidePropsStore }

export { usePropsStore }
