import { ColInstance, FormItemInstance } from 'element-plus'
import { ComputedRef, VNode } from 'vue'
import { ElementPlusComponents } from './element-plus'

export type Tag = keyof ElementPlusComponents

export type TagProps<T extends Tag> = InstanceType<
  ElementPlusComponents[T]
>['$props']

export type Options<T extends Tag> = T extends 'ElSelect'
  ? ComputedRef<{ value: number | string; label: string }[]>
  : never

type BaseSchema = {
  stem?: string
  extra?: boolean
  colProps?: ColInstance['$props']
  formItemProps?: FormItemInstance['$props']
  children?: Schema[]
}

type TagSchema = {
  [K in Tag]: BaseSchema & {
    tag: K
    tagProps?: TagProps<K>
    options?: Options<K>
  }
}[Tag]

export type Schema =
  | BaseSchema
  | (BaseSchema & { slot: string })
  | (BaseSchema & { component: () => VNode })
  | TagSchema
