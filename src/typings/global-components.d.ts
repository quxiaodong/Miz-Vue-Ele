import CommonLocale from '@/components/common-locale/Index.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CommonLocale: typeof CommonLocale
  }
}
