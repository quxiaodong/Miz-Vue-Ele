import router from '@/router'
import { translate } from '@/utils/i18n'
import { useTitle } from '@vueuse/core'
import { computed } from 'vue'

export const title = () => {
  router.beforeResolve(to => {
    const title = computed(() =>
      translate({ stem: to.meta.stem, text: to.meta.name })
    )
    useTitle(title)
  })
}
