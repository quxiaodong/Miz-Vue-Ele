<template>
  <el-tooltip placement="top" :content="translate('common:table.fullscreen')">
    <el-icon size="18" class="cursor-pointer" @click="toggle">
      <FullScreen />
    </el-icon>
  </el-tooltip>
</template>

<script setup lang="ts">
import { translate } from '@/utils/i18n'
import { useFullscreenStore } from '../stores/fullscreen'

const { toggle } = useFullscreenStore()!
</script>
