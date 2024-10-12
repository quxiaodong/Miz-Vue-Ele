import { useFullscreen } from '@vueuse/core'
import { createInjectionState } from '@vueuse/shared'
import { ShallowRef } from 'vue'

const [useProvideFullscreenStore, useFullscreenStore] = createInjectionState(
  (el: Readonly<ShallowRef<HTMLDivElement | null>>) => {
    const { toggle } = useFullscreen(el)

    return { toggle }
  }
)

export { useProvideFullscreenStore }

export { useFullscreenStore }
