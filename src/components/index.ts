import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { App } from 'vue'
import CommonCropper from './common-cropper/Index.vue'
import CommonDark from './common-dark/Index.vue'
import { createDialog } from './common-dialog/index'
import CommonDialog from './common-dialog/Index.vue'
import CommonForm from './common-form/Index.vue'
import { CommonIcons } from './common-icon'
import CommonLocale from './common-locale/Index.vue'
import CommonSearch from './common-search/Index.vue'
import CommonTable from './common-table/Index.vue'
import WidgetTable from './common-table/table/Index.vue'

const components = (app: App) => {
  app.use(ElementPlus)
  for (const [key, component] of Object.entries(CommonIcons)) {
    app.component(key, component)
  }
  app.component('CommonLocale', CommonLocale)
  app.component('CommonDark', CommonDark)
  createDialog._context = app._context
  app.component('CommonDialog', CommonDialog)
  app.component('CommonForm', CommonForm)
  app.component('CommonSearch', CommonSearch)
  app.component('CommonCropper', CommonCropper)
  app.component('CommonTable', CommonTable)
  app.component('WidgetTable', WidgetTable)
}

export default components
