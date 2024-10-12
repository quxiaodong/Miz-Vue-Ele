import CommonDark from '@/components/common-dark/Index.vue'
import CommonDialog from '@/components/common-dialog/Index.vue'
import CommonForm from '@/components/common-form/Index.vue'
import CommonLocale from '@/components/common-locale/Index.vue'
import CommonSearch from '@/components/common-search/Index.vue'
import CommonTable from '@/components/common-table/Index.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CommonDark: typeof CommonDark
    CommonLocale: typeof CommonLocale
    CommonDialog: typeof CommonDialog
    CommonForm: typeof CommonForm
    CommonSearch: typeof CommonSearch
    CommonTable: typeof CommonTable
  }
}
