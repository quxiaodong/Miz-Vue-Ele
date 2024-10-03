import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/sign-up',
      component: () => import('@/views/iam/Index.vue'),
      children: [
        {
          path: '',
          meta: {
            whitelist: true,
            name: '注册',
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
            name: '登录',
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
