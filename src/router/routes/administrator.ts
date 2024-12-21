import { Permission as RolePermission } from '@/views/administrator/role/permission'
import { Permission as UserPermission } from '@/views/administrator/user/permission'
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
      path: 'user',
      meta: {
        breadcrumb: '用户列表'
      },
      component: () => import('@/views/administrator/user/Index.vue')
    },
    {
      path: 'user/create',
      meta: {
        breadcrumb: '新建用户',
        hideInMenu: true,
        permissions: [UserPermission.Create]
      },
      component: () => import('@/views/administrator/user/Create.vue')
    },
    {
      path: 'user/update',
      meta: {
        breadcrumb: '编辑用户',
        hideInMenu: true,
        permissions: [UserPermission.Update]
      },
      props: route => ({ id: route.query.id }),
      component: () => import('@/views/administrator/user/Update.vue')
    },
    {
      path: 'role',
      meta: {
        breadcrumb: '角色列表'
      },
      component: () => import('@/views/administrator/role/Index.vue')
    },
    {
      path: 'role/create',
      meta: {
        breadcrumb: '新建角色',
        hideInMenu: true,
        permissions: [RolePermission.Create]
      },
      component: () => import('@/views/administrator/role/Create.vue')
    },
    {
      path: 'role/update',
      meta: {
        breadcrumb: '编辑角色',
        hideInMenu: true,
        permissions: [RolePermission.Update]
      },
      props: route => ({ id: route.query.id }),
      component: () => import('@/views/administrator/role/Update.vue')
    },
    {
      path: 'button',
      meta: {
        breadcrumb: '按钮列表'
      },
      component: () => import('@/views/administrator/button/Index.vue')
    },
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
