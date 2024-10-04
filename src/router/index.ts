import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      meta: {
        breadcrumb: '首页',
        stem: 'common:menu.home'
      },
      component: () => import('@/components/common-layout/Index.vue')
    },
    {
      path: '/sign-up',
      component: () => import('@/views/iam/Index.vue'),
      children: [
        {
          path: '',
          meta: {
            whitelist: true,
            breadcrumb: '注册',
            stem: 'common:menu.sign-up'
          },
          component: () => import('@/views/iam/sign-up/Index.vue')
        }
      ]
    },
    {
      path: '/sign-in',
      component: () => import('@/views/iam/Index.vue'),
      children: [
        {
          path: '',
          meta: {
            whitelist: true,
            breadcrumb: '登录',
            stem: 'common:menu.sign-in'
          },
          component: () => import('@/views/iam/sign-in/Index.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/404/Index.vue')
    }
  ]
})

export default router
