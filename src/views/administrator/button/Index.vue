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
import { searchButton, SearchButtonInput } from '@/apis/administrator/button'
import { Schema } from '@/components/form-item'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import Create from './Create.vue'
import { useTable } from './useTable'

const initValue = (): SearchButtonInput => ({
  pageNo: 1,
  pageSize: 10
})

const searchModel = ref(initValue())

const searchService = searchButton()
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
        label: '按钮名称'
      }
    },
    {
      tag: 'el-input',
      formItemProps: {
        prop: 'code',
        label: '按钮代码'
      }
    }
  ]

  return { schemas }
}

const { schemas } = useSchemas()

searchService.execute(searchParams.value)
</script>
