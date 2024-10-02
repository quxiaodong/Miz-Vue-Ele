import router from '@/router'
import { i18n } from '@/utils/i18n'
import { useTitle } from '@vueuse/core'
import { computed } from 'vue'

export const title = () => {
  router.beforeResolve(to => {
    const title = computed(() =>
      to.meta.stem ? i18n.t(to.meta.stem) : to.meta.breadcrumb
    )
    useTitle(title)
  })
}
