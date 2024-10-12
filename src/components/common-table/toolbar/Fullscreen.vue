<template>
  <el-tooltip :content="$t('common:table.fullscreen')" placement="top">
    <el-icon size="18" class="cursor-pointer" @click="toggle">
      <FullScreen />
    </el-icon>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useFullscreenStore } from '../stores/fullscreen'

const { toggle } = useFullscreenStore()!
</script>
