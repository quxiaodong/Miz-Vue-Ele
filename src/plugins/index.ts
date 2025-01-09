import { App } from 'vue'
import { acl } from './acl'
import { dark } from './dark'
import { error } from './error'
import { layout } from './layout'
import { locale } from './locale'
import { permission } from './permission'
import { progress } from './progress'
import { title } from './title'

const plugins = (app: App) => {
  ;[error, acl, dark, layout, progress, permission, locale, title].forEach(
    plugin => app.use(plugin)
  )
}

export default plugins
