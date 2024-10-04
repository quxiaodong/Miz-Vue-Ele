<template>
  <div class="px-4 h-14 flex items-center justify-between">
    <el-text size="large">偏好设置</el-text>
    <el-icon class="cursor-pointer" @click="toggleVisible(false)">
      <Close />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { toggleVisible } from '../../stores/setting'
</script>
