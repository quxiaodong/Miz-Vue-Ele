import router from '@/router'
import { useUserStore } from '@/stores/user'
import { getToken, removeToken } from '@/utils/storage'

let dynamicRoutes: (() => void)[] = []

const SIGN_IN = '/sign-in'
const SIGN_UP = '/sign-up'

export const permission = () => {
  router.beforeEach(async to => {
    const userStore = useUserStore()
    const accessToken = getToken().accessToken

    if (!accessToken) {
      userStore.clearUser()
      if (to.meta.whitelist) {
        return true
      } else {
        return { path: SIGN_IN, query: { redirect: to.fullPath } }
      }
    }

    if (!userStore.user) {
      try {
        dynamicRoutes.forEach(cb => cb())
        dynamicRoutes = []

        await userStore.fetchUser()
        userStore.menus.forEach(route => {
          dynamicRoutes.push(router.addRoute(route))
        })
        return to.fullPath
      } catch {
        removeToken()
        return { path: SIGN_IN }
      }
    }

    if ([SIGN_IN, SIGN_UP].includes(to.path)) {
      return { path: '/' }
    }

    return true
  })
}
