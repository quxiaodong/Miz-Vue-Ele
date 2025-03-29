import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { defineComponent } from 'vue'

type IconComponent = ReturnType<typeof defineComponent>

const icons: Record<string, { default: IconComponent }> = import.meta.glob(
  './**/*.vue',
  { eager: true }
)

export const CommonIcons = {
  ...ElementPlusIconsVue,
  ...Object.fromEntries(
    Object.entries(icons).map(([path, module]) => {
      const name = path
        .split('/')
        .pop()
        ?.replace(/\.\w+$/, '')
      return ['Icon' + name, module.default]
    })
  )
}
