import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      meta: {
        name: '首页',
        stem: 'common:menu.home'
      },
      component: () => import('@/components/common-layout/Index.vue')
    },
    {
      path: '/redirect',
      component: () => import('@/components/common-layout/Index.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/redirect/Index.vue'),
          props: to => ({ redirect: to.query.redirect })
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
