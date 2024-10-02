import { DialogProps } from 'element-plus'
import {
  AppContext,
  DefineComponent,
  defineComponent,
  h,
  isVNode,
  ref,
  render,
  VNode
} from 'vue'
import Dialog from './Index.vue'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const createDialog: Function & { _context: AppContext | null } = (
  content: VNode | DefineComponent,
  options: DialogProps & InstanceType<typeof Dialog>['$props']
) => {
  const show = ref(true)

  const container = document.createElement('div')

  const component = defineComponent({
    setup() {
      return () =>
        h(
          Dialog,
          {
            ...options,
            appendTo: container,
            modelValue: show.value,
            'onUpdate:modelValue': (value: boolean) => {
              show.value = value
              if (value === false) {
                document.body.removeChild(container)
              }
            }
          },
          () => (isVNode(content) ? content : h(content))
        )
    }
  })

  const vm = h(component)
  vm.appContext = createDialog._context

  render(vm, container)
  document.body.appendChild(container)

  return {
    open: () => (show.value = true),
    close: () => (show.value = false)
  }
}

createDialog._context = null
