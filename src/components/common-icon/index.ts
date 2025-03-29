import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ComponentOptions } from 'vue'

const icons: Record<string, ComponentOptions> = import.meta.glob('./**/*.vue', {
  eager: true
})

export const CommonIcons = {
  ...ElementPlusIconsVue,
  ...Object.fromEntries(
    Object.entries(icons).map(([path, module]) => {
      const _name = path
        .split('/')
        .pop()
        ?.replace(/\.\w+$/, '')
      const name = 'Icon' + _name
      const component = module.default
      component.name = component.name ?? name
      return [name, component]
    })
  )
}
