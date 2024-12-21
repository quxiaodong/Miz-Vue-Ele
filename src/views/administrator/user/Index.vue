<template>
  <div>
    <common-search
      v-model:model="searchModel"
      v-model:params="searchParams"
      :service="searchService"
      :init-value
    >
      <el-form-item label="登录账号">
        <el-input v-model="searchModel.username" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="searchModel.nickname" placeholder="请输入" />
      </el-form-item>
      <template #extra>
        <el-form-item label="联系方式">
          <el-input v-model="searchModel.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input v-model="searchModel.email" placeholder="请输入" />
        </el-form-item>
      </template>
    </common-search>
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
          href="/#/administrator/user/create"
        />
      </template>
    </common-table>
  </div>
</template>

<script setup lang="ts">
import { searchUser, SearchUserInput } from '@/apis/administrator/user'
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

watch(searchParams, () => setUrlParams(searchParams.value), { deep: true })

searchService.execute(searchParams.value)
</script>
