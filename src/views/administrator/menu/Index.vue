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
    >
      <template #toolbar>
        <Create @refresh="searchService.refresh" />
      </template>
    </common-table>
  </div>
</template>

<script setup lang="ts">
import { searchMenu, SearchMenuInput } from '@/apis/administrator/menu'
import { Schema } from '@/components/form-item'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import Create from './Create.vue'
import { useTable } from './useTable'

const initValue = (): SearchMenuInput => ({
  pageNo: 1,
  pageSize: 10
})

const searchModel = ref(initValue())

const searchService = searchMenu()
const searchParams = ref(initValue())

const data = computed(() =>
  (searchService.result.value?.data ?? []).map(v => {
    v.createAt = dayjs(v.createAt).format('YYYY-MM-DD HH:mm:ss')
    return v
  })
)

const { columns } = useTable(searchService, searchParams)

const useSchemas = (): { schemas: Schema[] } => {
  const schemas: Schema[] = [
    {
      tag: 'el-input',
      formItemProps: {
        prop: 'name',
        label: '菜单名称'
      }
    },
    {
      tag: 'el-input',
      formItemProps: {
        prop: 'path',
        label: '菜单路径'
      }
    }
  ]

  return { schemas }
}

const { schemas } = useSchemas()

searchService.execute(searchParams.value)
</script>
