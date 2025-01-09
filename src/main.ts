import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import components from './components'
import plugins from './plugins'
import router from './router'
import './styles/index.css'

const app = createApp(App)
app.use(createPinia())
app.use(components)
app.use(plugins)
app.use(router)
app.mount('#app')
