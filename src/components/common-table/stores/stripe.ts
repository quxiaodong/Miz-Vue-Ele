import { useToggle } from '@vueuse/core'
import { createInjectionState } from '@vueuse/shared'

const [useProvideStripeStore, useStripeStore] = createInjectionState(
  (initialValue: boolean = false) => {
    const [stripe, toggle] = useToggle(initialValue)

    return { stripe, toggle }
  }
)

export { useProvideStripeStore }

export { useStripeStore }
