import CommonCropper from '@/components/common-cropper/Index.vue'
import CommonDark from '@/components/common-dark/Index.vue'
import CommonDialog from '@/components/common-dialog/Index.vue'
import CommonForm from '@/components/common-form/Index.vue'
import CommonLocale from '@/components/common-locale/Index.vue'
import CommonSearch from '@/components/common-search/Index.vue'
import CommonTable from '@/components/common-table/Index.vue'
import WidgetTable from '@/components/common-table/table/Index.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CommonLocale: typeof CommonLocale
    CommonDark: typeof CommonDark
    CommonDialog: typeof CommonDialog
    CommonForm: typeof CommonForm
    CommonSearch: typeof CommonSearch
    CommonCropper: typeof CommonCropper
    CommonTable: typeof CommonTable
    WidgetTable: typeof WidgetTable
  }
}
