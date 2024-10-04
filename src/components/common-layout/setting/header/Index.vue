<template>
  <div class="flex h-14 items-center justify-between px-4">
    <el-text size="large">{{ $t('common:layout.setting') }}</el-text>
    <el-icon class="cursor-pointer" @click="toggleVisible(false)">
      <Close />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { toggleVisible } from '../../stores/setting'
</script>
