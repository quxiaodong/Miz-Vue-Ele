<template>
  <div
    class="page-bg flex h-full items-center justify-center bg-[url('@/images/background.svg')] bg-contain bg-center bg-no-repeat"
  >
    <el-space :size="20" class="fixed right-5 top-5">
      <common-dark />
      <common-locale />
    </el-space>
    <div class="w-80 sm:w-4/5">
      <div class="mb-6 flex items-center justify-center gap-2">
        <img src="@/images/logo.png" class="w-10" />
        <el-text class="text-2xl">{{ config.title }}</el-text>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import config from '@/config'
</script>
