import { RouteRecordRaw } from 'vue-router'

const administrator: RouteRecordRaw = {
  path: '/administrator',
  meta: {
    icon: 'User',
    breadcrumb: '权限管理'
  },
  component: () => import('@/components/common-layout/Index.vue'),
  children: [
    {
      path: 'menu',
      meta: {
        breadcrumb: '菜单列表'
      },
      component: () => import('@/views/administrator/menu/Index.vue')
    }
  ]
}

export default administrator
