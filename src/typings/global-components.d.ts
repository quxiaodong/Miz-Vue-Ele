import CommonDark from '@/components/common-dark/Index.vue'
import CommonDialog from '@/components/common-dialog/Index.vue'
import CommonLocale from '@/components/common-locale/Index.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CommonDark: typeof CommonDark
    CommonLocale: typeof CommonLocale
    CommonDialog: typeof CommonDialog
  }
}
