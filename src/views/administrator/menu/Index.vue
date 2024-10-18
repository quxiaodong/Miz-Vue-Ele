<template>
  <div>
    <common-search
      v-model:model="searchModel"
      v-model:params="searchParams"
      :service="searchService"
      :init-value
      :schemas
    />
    <common-table
      v-model:params="searchParams"
      :data
      :columns
      :service="searchService"
      :table-props="tableProps"
    >
      <template #toolbar-right>
        <widget-create v-acl="[Permission.Create]" @click="onCreate" />
      </template>
    </common-table>
  </div>
</template>

<script setup lang="ts">
import { searchMenu, SearchMenuInput } from '@/apis/administrator/menu'
import { createDialog } from '@/components/common-dialog'
import { buildTree } from '@/utils/array-to-tree'
import dayjs from 'dayjs'
import { computed, h, ref } from 'vue'
import Create from './Create.vue'
import { Permission } from './permission'
import { useTable } from './useTable'

const initValue = (): SearchMenuInput => ({})

const searchModel = ref(initValue())

const searchService = searchMenu()
const searchParams = ref(initValue())

const tableProps = { rowKey: 'id' }

const data = computed(() => {
  const menus = (searchService.result.value?.data ?? []).map(v => {
    v.createAt = dayjs(v.createAt).format('YYYY-MM-DD HH:mm:ss')
    return v
  })
  return buildTree(menus)
})

const { columns, schemas } = useTable(searchService, searchParams)

const onCreate = () => {
  const dialog = createDialog(
    h(Create, {
      onRefresh: () => {
        dialog.close()
        searchService.refresh()
      }
    }),
    { type: 'create' }
  )
}

searchService.execute(searchParams.value)
</script>
