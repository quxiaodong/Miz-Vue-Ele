import { useAcl } from '@/hooks/useAcl'
import { App, DirectiveBinding } from 'vue'

const directive = (el: HTMLElement, binding: DirectiveBinding<string[]>) => {
  let type: 'some' | 'every' = 'some'
  if (binding.modifiers.every) {
    type = 'every'
  }
  if (!useAcl(binding.value, type)) {
    switch (binding.arg) {
      default: {
        el.parentNode?.removeChild(el)
      }
    }
  }
}

export const acl = (app: App) => {
  app.directive('acl', directive)
}
