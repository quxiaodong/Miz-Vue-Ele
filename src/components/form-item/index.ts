import {
  ColInstance,
  ElSelect,
  FormItemInstance,
  InputInstance,
  SwitchInstance
} from 'element-plus'
import { ComputedRef, VNode } from 'vue'

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
      tag: 'el-switch'
      tagProps?: SwitchInstance['$props']
    }
  | {
      tag: 'el-select'
      tagProps?: InstanceType<typeof ElSelect>['$props']
      options?: ComputedRef<{ value: number | string; label: string }[]>
    }
)
