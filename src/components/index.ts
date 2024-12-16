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
import WidgetCancel from './common-widget/Cancel.vue'
import WidgetCreate from './common-widget/Create.vue'
import WidgetLink from './common-widget/Link.vue'
import WidgetRemove from './common-widget/Remove.vue'
import WidgetSpace from './common-widget/Space.vue'
import WidgetStatus from './common-widget/Status.vue'
import WidgetStatusFilter from './common-widget/StatusFilter.vue'
import WidgetSubmit from './common-widget/Submit.vue'
import WidgetUpdate from './common-widget/Update.vue'

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
  app.component('WidgetCancel', WidgetCancel)
  app.component('WidgetCreate', WidgetCreate)
  app.component('WidgetLink', WidgetLink)
  app.component('WidgetRemove', WidgetRemove)
  app.component('WidgetSpace', WidgetSpace)
  app.component('WidgetStatus', WidgetStatus)
  app.component('WidgetStatusFilter', WidgetStatusFilter)
  app.component('WidgetSubmit', WidgetSubmit)
  app.component('WidgetUpdate', WidgetUpdate)
}

export default components
