<template>
  <el-popover trigger="click" width="200">
    <template #reference>
      <div class="text-[0px]">
        <el-tooltip :content="$t('common:table.setting')" placement="top">
          <el-icon size="18" class="cursor-pointer">
            <Setting />
          </el-icon>
        </el-tooltip>
      </div>
    </template>
    <div class="flex items-center justify-between">
      <el-checkbox :model-value="all" :indeterminate @change="selectAll!">
        {{ $t('common:table.setting.show-sort') }}
      </el-checkbox>
      <el-link type="primary" :underline="false" @click="reset">
        {{ $t('common.reset') }}
      </el-link>
    </div>
    <div class="max-h-80 overflow-y-auto">
      <el-checkbox-group :model-value="selected" @change="select">
        <div ref="dom">
          <div
            v-for="column in columns"
            :key="column.prop"
            class="flex items-center"
          >
            <el-icon size="16" class="mr-2 cursor-move">
              <Rank />
            </el-icon>
            <el-checkbox :value="column.prop" :disabled="column.alwaysShow">
              <el-text truncated>
                {{ column.stem ? $t(column.stem) : column.label }}
              </el-text>
            </el-checkbox>
          </div>
        </div>
      </el-checkbox-group>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import Sortable from 'sortablejs'
import { onMounted, useTemplateRef } from 'vue'
import { useColumnStore } from '../stores/column'

const { columns, selected, all, indeterminate, select, selectAll, reset } =
  useColumnStore()!

const dom = useTemplateRef<HTMLDivElement>('dom')

onMounted(() => {
  new Sortable(dom.value!, {
    animation: 150,
    handle: '.cursor-move',
    onEnd({ oldIndex, newIndex }) {
      if (oldIndex !== undefined && newIndex !== undefined) {
        let col = columns.value.splice(oldIndex, 1)[0]
        columns.value.splice(newIndex, 0, col)
      }
    }
  })
})
</script>

<style scoped>
:deep(.el-checkbox__label) {
  @apply overflow-hidden;
}
</style>
