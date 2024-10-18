<template>
  <div>
    <common-search
      v-model:model="searchModel"
      v-model:params="searchParams"
      :service="searchService"
      :init-value
    >
      <el-form-item label="菜单名称">
        <el-input v-model="searchModel.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="菜单路径">
        <el-input v-model="searchModel.path" placeholder="请输入" />
      </el-form-item>
    </common-search>
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

searchService.execute(searchParams.value)
</script>
