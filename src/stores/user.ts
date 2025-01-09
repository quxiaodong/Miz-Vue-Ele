import { searchUserInfo, UserInfoOutput } from '@/apis/iam'
import Layout from '@/components/common-layout/Index.vue'
import { locale, toggleLocale } from '@/components/common-locale/stores'
import { buildTree } from '@/utils/array-to-tree'
import { getSetting } from '@/utils/storage'
import { defineStore } from 'pinia'
import { computed, defineComponent, ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'

type Menus = NonNullable<UserInfoOutput['role']>['menus']
type Buttons = NonNullable<UserInfoOutput['role']>['buttons']

type RouteTreeNode = RouteRecordRaw & {
  id: string
  sort?: number | null
  parentId?: string | null
  children?: RouteTreeNode[]
}

const Empty = defineComponent({})

const views = import.meta.glob('../views/**/*.vue')

function loadView(component?: string) {
  if (component === 'Layout') return Layout
  return views[`../views/${component}.vue`] || Empty
}

function generateRoutes(menus: Menus, buttons: Buttons) {
  const routes: RouteTreeNode[] = []

  menus.forEach(menu => {
    if (menu.acls) {
      const acls = menu.acls.split(',')
      const can = buttons.some(button => acls.includes(button.code))
      if (!can) return
    }

    const {
      id,
      sort,
      parentId,
      name,
      path,
      component,
      icon,
      link,
      stem,
      hideInMenu,
      embed
    } = menu
    const route = {
      id,
      sort,
      parentId,
      name,
      path,
      component: loadView(component),
      meta: { name, icon, link, stem, hideInMenu, embed }
    }

    routes.push(route)
  })

  return buildTree(routes)
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInfoOutput>()

  const menus = computed(() =>
    generateRoutes(
      user.value?.role?.menus || [],
      user.value?.role?.buttons || []
    )
  )

  const buttons = computed(() => user.value?.role?.buttons || [])

  const caches = computed(() =>
    user.value?.role?.menus?.filter(menu => menu.cache).map(v => v.name)
  )

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

  return { user, menus, buttons, caches, fetchUser, clearUser }
})
