<template>
  <el-tooltip placement="top" :content="translate('common:table.refresh')">
    <el-icon size="18" class="cursor-pointer" @click="click">
      <RefreshRight />
    </el-icon>
  </el-tooltip>
</template>

<script setup lang="ts">
import { translate } from '@/utils/i18n'
import { useApiStore } from '../stores/api'

const { service } = useApiStore()!

const click = () => {
  if (!service.loading.value) {
    service.refresh()
  }
}
</script>
