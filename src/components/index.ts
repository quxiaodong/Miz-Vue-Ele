import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import { App } from 'vue'
import CommonDark from './common-dark/Index.vue'
import CommonDialog from './common-dialog/Index.vue'
import CommonLocale from './common-locale/Index.vue'

const components = (app: App) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(ElementPlus)
  app.component('CommonDark', CommonDark)
  app.component('CommonLocale', CommonLocale)
  app.component('CommonDialog', CommonDialog)
}

export default components
