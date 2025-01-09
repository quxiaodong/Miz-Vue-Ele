import { searchUserInfo, UserInfoOutput } from '@/apis/iam'
import Layout from '@/components/common-layout/Index.vue'
import { locale, toggleLocale } from '@/components/common-locale/stores'
import { buildTree } from '@/utils/array-to-tree'
import { getSetting } from '@/utils/storage'
import { defineStore } from 'pinia'
import { ComponentOptions, computed, defineComponent, ref } from 'vue'
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

const views = import.meta.glob<ComponentOptions>('../views/**/*.vue')

function loadView(component?: string, name?: string) {
  if (component === 'Layout') return Layout
  const view = views[`../views/${component}.vue`]
  if (!view) return Empty

  return async () => {
    const raw = await view()
    const wrapComponent = {
      name: raw.default.name ?? name,
      ...raw.default
    }
    return wrapComponent
  }
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
      component: loadView(component, path),
      meta: { name, icon, link, stem, hideInMenu, embed }
    }

    if (!parentId && component !== 'Layout') {
      const layoutRoute: RouteTreeNode = {
        id,
        sort,
        path,
        component: Layout,
        children: [{ ...route, path: '', meta: undefined }],
        meta: { name, icon, link, stem, hideInMenu, embed }
      }
      routes.push(layoutRoute)
    } else {
      routes.push(route)
    }
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
    // use path instead of name, because name is not unique
    user.value?.role?.menus?.filter(menu => menu.cache).map(v => v.path)
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
