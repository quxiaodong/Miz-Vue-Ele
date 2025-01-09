import { searchUserInfo, UserInfoOutput } from '@/apis/iam'
import { locale, toggleLocale } from '@/components/common-locale/stores'
import routes from '@/router/routes'
import config from '@/utils/config'
import { getSetting } from '@/utils/storage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'

type Menus = NonNullable<UserInfoOutput['role']>['menus']
type Buttons = NonNullable<UserInfoOutput['role']>['buttons']

/**
 * generateRoutes
 * @param prefix parent path
 * @param route local route
 * @param menus menus from api
 * @param buttons buttons from api
 * @returns final route
 */
function generateRoutes(
  prefix: string,
  route: RouteRecordRaw,
  menus: Menus,
  buttons: Buttons
) {
  const path = prefix
    ? prefix + (route.path ? '/' + route.path : '')
    : route.path

  // find equal path route in menus
  const menu = menus.find(menu => menu.path === path)
  let can = false
  if (route.meta?.permissions) {
    can = buttons.some(button => route.meta?.permissions?.includes(button.code))
  }
  if (!menu && !can) return
  if (menu) {
    const { name, icon } = menu
    // update name
    if (name && route.meta) {
      route.meta.breadcrumb = name
    }
    // update icon
    if (icon && route.meta) {
      route.meta.icon = icon
    }
  }
  // if has children, filter children
  if (route.children) {
    route.children = route.children.filter(route =>
      generateRoutes(path, { ...route }, menus, buttons)
    )
  }
  return route
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInfoOutput>()

  const menus = computed(() => {
    if (user.value?.username === config.superadmin) return routes

    const result: RouteRecordRaw[] = []
    for (const route of routes) {
      const item = generateRoutes(
        '',
        { ...route },
        user.value?.role?.menus || [],
        user.value?.role?.buttons || []
      )
      if (item) {
        result.push(item)
      }
    }
    return result
  })

  const buttons = computed(() => user.value?.role?.buttons || [])

  const fetchUser = () => {
    const { execute } = searchUserInfo()
    return execute().then(({ data }) => {
      user.value = data

      const code = data.locale?.code

      if (!getSetting('language') && code && code !== locale.value?.code) {
        toggleLocale(code, false)
      }

      return data
    })
  }

  const clearUser = () => (user.value = undefined)

  return { user, menus, buttons, fetchUser, clearUser }
})
