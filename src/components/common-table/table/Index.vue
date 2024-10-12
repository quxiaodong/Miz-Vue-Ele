<template>
  <div>
    <el-empty
      v-show="!selected.length"
      :description="translate('common:table.no-column')"
    />
    <el-table
      v-show="selected.length"
      v-bind="props.tableProps"
      ref="tableRef"
      :data="props.data"
      :size
      :stripe
      :style
      border
    >
      <template v-for="column in result">
        <template v-if="column.slot">
          <slot :name="column.slot" />
        </template>
        <el-table-column
          v-else
          :key="column.prop"
          v-bind="column"
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
                v-for="vnode in column.defaultComponent(scope)"
                :key="vnode"
              >
                <component :is="vnode" />
              </template>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { isDark } from '@/components/common-dark/stores'
import { translate } from '@/utils/i18n'
import { ElTable } from 'element-plus'
import { computed, useTemplateRef } from 'vue'
import { useColumnStore } from '../stores/column'
import { usePropsStore } from '../stores/props'
import { useSizeStore } from '../stores/size'
import { useStripeStore } from '../stores/stripe'

const { result, selected } = useColumnStore()!
const { stripe } = useStripeStore()!
const { props } = usePropsStore()!
const { size } = useSizeStore()!

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
