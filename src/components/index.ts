import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import { App } from 'vue'
import CommonDark from './common-dark/Index.vue'
import CommonDialog from './common-dialog/Index.vue'
import CommonForm from './common-form/Index.vue'
import CommonLocale from './common-locale/Index.vue'
import CommonSearch from './common-search/Index.vue'
import CommonTable from './common-table/Index.vue'
import WidgetCancel from './common-widget/Cancel.vue'
import WidgetCreate from './common-widget/Create.vue'
import WidgetRemove from './common-widget/Remove.vue'
import WidgetStatus from './common-widget/Status.vue'
import WidgetSubmit from './common-widget/Submit.vue'
import WidgetUpdate from './common-widget/Update.vue'

const components = (app: App) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(ElementPlus)
  app.component('CommonDark', CommonDark)
  app.component('CommonLocale', CommonLocale)
  app.component('CommonDialog', CommonDialog)
  app.component('CommonForm', CommonForm)
  app.component('CommonSearch', CommonSearch)
  app.component('CommonTable', CommonTable)
  app.component('WidgetCancel', WidgetCancel)
  app.component('WidgetCreate', WidgetCreate)
  app.component('WidgetRemove', WidgetRemove)
  app.component('WidgetStatus', WidgetStatus)
  app.component('WidgetSubmit', WidgetSubmit)
  app.component('WidgetUpdate', WidgetUpdate)
}

export default components
