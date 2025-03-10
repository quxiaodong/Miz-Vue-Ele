import { RouteRecordRaw } from 'vue-router'

const language: RouteRecordRaw = {
  path: '/language',
  meta: {
    icon: 'Reading',
    breadcrumb: '语言管理'
  },
  component: () => import('@/components/common-layout/Index.vue'),
  children: [
    {
      path: 'translation',
      meta: {
        breadcrumb: '翻译列表'
      },
      component: () => import('@/views/language/translation/Index.vue')
    },
    {
      path: 'locale',
      meta: {
        breadcrumb: '语言列表'
      },
      component: () => import('@/views/language/locale/Index.vue')
    }
  ]
}

export default language
