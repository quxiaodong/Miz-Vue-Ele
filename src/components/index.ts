import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { App } from 'vue'
import CommonDark from './common-dark/Index.vue'
import { createDialog } from './common-dialog/index'
import CommonDialog from './common-dialog/Index.vue'
import CommonLocale from './common-locale/Index.vue'

const components = (app: App) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(ElementPlus)
  app.component('CommonDark', CommonDark)
  app.component('CommonLocale', CommonLocale)
  createDialog._context = app._context
  app.component('CommonDialog', CommonDialog)
}

export default components
