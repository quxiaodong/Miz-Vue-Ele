import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { App } from 'vue'

const components = (app: App) => {
  app.use(ElementPlus)
}

export default components
