import router from '@/router'
import NProgress from 'nprogress'

export const progress = () => {
  router.beforeEach((from, to) => {
    if (from.path !== to.path) {
      NProgress.start()
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
