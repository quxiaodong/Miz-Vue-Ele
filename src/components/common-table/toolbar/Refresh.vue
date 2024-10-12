<template>
  <el-tooltip :content="$t('common:table.refresh')" placement="top">
    <el-icon size="18" class="cursor-pointer" @click="click">
      <RefreshRight />
    </el-icon>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useApiStore } from '../stores/api'

const { service } = useApiStore()!

const click = () => {
  if (!service.loading.value) {
    service.refresh()
  }
}
</script>
