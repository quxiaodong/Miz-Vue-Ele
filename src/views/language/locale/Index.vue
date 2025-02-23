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
      <template #toolbar-right>
        <Create @refresh="searchService.refresh" />
      </template>
    </common-table>
  </div>
</template>

<script setup lang="ts">
import { searchLocale, SearchLocaleInput } from '@/apis/language/locale'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import Create from './Create.vue'
import { useTable } from './useTable'

const initValue = (): SearchLocaleInput => ({
  pageNo: 1,
  pageSize: 10
})

const searchModel = ref(initValue())

const searchService = searchLocale()
const searchParams = ref(initValue())

const data = computed(() =>
  (searchService.result.value?.data ?? []).map(v => {
    v.createAt = dayjs(v.createAt).format('YYYY-MM-DD HH:mm:ss')
    return v
  })
)

const { columns, schemas } = useTable(searchService, searchParams)

searchService.execute(searchParams.value)
</script>
