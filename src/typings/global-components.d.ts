import CommonDark from '@/components/common-dark/Index.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CommonDark: typeof CommonDark
  }
}
