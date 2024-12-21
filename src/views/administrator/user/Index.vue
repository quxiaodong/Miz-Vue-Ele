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
        <widget-create
          v-acl="[Permission.Create]"
          tag="a"
          href="#/administrator/user/create"
        />
      </template>
    </common-table>
  </div>
</template>

<script setup lang="ts">
import { searchUser, SearchUserInput } from '@/apis/administrator/user'
import { Schema } from '@/components/form-item'
import { getUrlParams, setUrlParams } from '@/utils/url-params'
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'
import { Permission } from './permission'
import { useTable } from './useTable'

const initValue = (): SearchUserInput => ({
  pageNo: 1,
  pageSize: 10
})

const initDefault = (): SearchUserInput => ({
  ...initValue(),
  ...getUrlParams<SearchUserInput>([
    { key: 'pageNo', type: 'Number' },
    { key: 'pageSize', type: 'Number' },
    { key: 'username' },
    { key: 'nickname' },
    { key: 'phone' },
    { key: 'email' },
    { key: 'status', type: 'Array<number>' }
  ])
})

const searchModel = ref(initDefault())

const searchService = searchUser()
const searchParams = ref(initDefault())

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
        prop: 'username',
        label: '登录账号'
      }
    },
    {
      tag: 'el-input',
      formItemProps: {
        prop: 'nickname',
        label: '用户昵称'
      }
    },
    {
      extra: true,
      tag: 'el-input',
      formItemProps: {
        prop: 'phone',
        label: '联系方式'
      }
    },
    {
      extra: true,
      tag: 'el-input',
      formItemProps: {
        prop: 'email',
        label: '邮箱地址'
      }
    }
  ]

  return { schemas }
}

const { schemas } = useSchemas()

watch(searchParams, () => setUrlParams(searchParams.value), { deep: true })

searchService.execute(searchParams.value)
</script>
