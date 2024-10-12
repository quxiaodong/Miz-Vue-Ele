import { Service } from '@/utils/service'
import { TableColumnInstance, TableInstance } from 'element-plus'
import { VNode } from 'vue'

export type Params = { pageNo?: number; pageSize?: number }

export type HeaderScope = {
  $index: number
  column: Record<string, unknown>
}

export type DefaultScope<Row> = {
  $index: number
  column: Record<string, unknown>
  row: Row
}

export type Column<Row> = TableColumnInstance['$props'] & {
  prop: string
  stem?: string
  type?: 'default' | 'selection' | 'index' | 'expand'
  alwaysShow?: boolean
  defaultHide?: boolean
  headerSlot?: (scope: HeaderScope) => VNode[]
  defaultSlot?: (scope: DefaultScope<Row>) => VNode[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Props<P extends Params = any, I extends object = any> = {
  data: I[]
  columns: Column<I>[]
  service: Service<P, I[]>
  tableProps?: TableInstance['$props']
}
