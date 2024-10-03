import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    breadcrumb: string
    stem?: string
    icon?: string
    whitelist?: boolean
    hideInMenu?: boolean
    permissions?: string[]
  }
}
