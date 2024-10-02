import CommonDark from '@/components/common-dark/Index.vue'
import CommonDialog from '@/components/common-dialog/Index.vue'
import CommonLocale from '@/components/common-locale/Index.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CommonLocale: typeof CommonLocale
    CommonDark: typeof CommonDark
    CommonDialog: typeof CommonDialog
  }
}
