<template>
  <div>
    <el-empty
      v-show="!columns.length"
      :description="translate('common:table.no-column')"
    />
    <el-table
      v-show="columns.length"
      v-bind="tableProps"
      ref="tableRef"
      :data
      :size
      :stripe
      :style
      border
    >
      <template v-for="column in columns">
        <template v-if="column.slot">
          <slot :name="column.slot" />
        </template>
        <el-table-column
          v-else
          v-bind="column"
          :key="column.prop"
          :label="translate({ stem: column.stem, text: column.label })"
        >
          <template v-if="column.headerComponent" #header="scope">
            <template
              v-for="(vnode, _) in column.headerComponent(scope)"
              :key="_"
            >
              <component :is="vnode" />
            </template>
          </template>
          <template v-if="column.defaultComponent" #default="scope">
            <template v-if="scope.$index !== -1">
              <template
                v-for="(vnode, _) in column.defaultComponent(scope)"
                :key="`${scope.row.id}-${_}`"
              >
                <component :is="vnode" />
              </template>
            </template>
          </template>
        </el-table-column>
      </template>
      <slot />
    </el-table>
  </div>
</template>

<script setup lang="ts" generic="I extends Object">
import { isDark } from '@/components/common-dark/stores'
import { translate } from '@/utils/i18n'
import { ElTable, TableInstance } from 'element-plus'
import { computed, useTemplateRef } from 'vue'
import { Column } from '../index'
import { Code } from '../stores/size'

type Props<I> = {
  columns: Column<I>[]
  stripe?: boolean
  size?: keyof typeof Code
  data?: I[]
  tableProps?: TableInstance['$props']
}

const { columns, stripe, size, data, tableProps } = defineProps<Props<I>>()

const tableRef = useTemplateRef<InstanceType<typeof ElTable>>('tableRef')

const style = computed(() =>
  isDark.value
    ? {
        '--el-table-header-bg-color': 'unset',
        '--el-table-tr-bg-color': 'unset',
        '--el-fill-color-lighter': '#202121' // stripe
      }
    : {}
)

defineExpose({ tableRef })
</script>
