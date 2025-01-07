import {
  ColInstance,
  ElSelect,
  FormItemInstance,
  InputInstance
} from 'element-plus'
import { GlobalComponents } from 'element-plus/global'
import { ComputedRef, VNode } from 'vue'

type ElementTag = keyof GlobalComponents

type TagProps<T extends ElementTag> = GlobalComponents[T] extends new (
  ...args: unknown[]
) => unknown
  ? InstanceType<GlobalComponents[T]>['$props']
  : never

export type Schema = {
  stem?: string
  extra?: boolean
  colProps?: ColInstance['$props']
  formItemProps?: FormItemInstance['$props']
  children?: Schema[]
} & (
  | object
  | {
      slot: string
    }
  | {
      component: () => VNode
    }
  | {
      tag: 'el-input'
      tagProps?: InputInstance['$props']
    }
  | {
      tag: 'el-select'
      tagProps?: InstanceType<typeof ElSelect>['$props']
      options?: ComputedRef<{ value: number | string; label: string }[]>
    }
  | {
      tag: ElementTag
      tagProps?: TagProps<ElementTag>
    }
)
