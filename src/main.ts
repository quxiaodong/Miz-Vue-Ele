import CommonDark from '@/components/common-dark/Index.vue'
import CommonDialog from '@/components/common-dialog/Index.vue'
import CommonForm from '@/components/common-form/Index.vue'
import CommonLocale from '@/components/common-locale/Index.vue'
import CommonSearch from '@/components/common-search/Index.vue'
import CommonTable from '@/components/common-table/Index.vue'
import WidgetCreate from '@/components/common-widget/Create.vue'
import WidgetRemove from '@/components/common-widget/Remove.vue'
import WidgetStatus from '@/components/common-widget/Status.vue'
import WidgetUpdate from '@/components/common-widget/Update.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import plugins from './plugins'
import router from './router'
import './styles/index.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
Object.values(plugins).forEach(plugin => app.use(plugin))
app.component('CommonDark', CommonDark)
app.component('CommonLocale', CommonLocale)
app.component('CommonDialog', CommonDialog)
app.component('CommonForm', CommonForm)
app.component('CommonSearch', CommonSearch)
app.component('CommonTable', CommonTable)
app.component('WidgetCreate', WidgetCreate)
app.component('WidgetRemove', WidgetRemove)
app.component('WidgetStatus', WidgetStatus)
app.component('WidgetUpdate', WidgetUpdate)
app.mount('#app')
