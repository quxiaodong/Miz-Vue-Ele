import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { App } from 'vue'
import { CommonIcons } from './common-icon'
import CommonLocale from './common-locale/Index.vue'

const components = (app: App) => {
  app.use(ElementPlus)
  for (const [key, component] of Object.entries(CommonIcons)) {
    app.component(key, component)
  }
  app.component('CommonLocale', CommonLocale)
}

export default components
