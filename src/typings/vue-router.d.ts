import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    name: string
    icon?: string | null
    link?: string | null
    stem?: string | null
    cache?: boolean
    hideInMenu?: boolean
    whitelist?: boolean
    embed?: boolean
  }
}
