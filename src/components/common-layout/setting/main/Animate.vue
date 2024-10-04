<template>
  <el-form-item label="页面动画" label-position="top">
    <el-space :fill-ratio="100" :size="15" class="w-full">
      <el-card
        v-for="item in animates"
        :key="item"
        shadow="never"
        style="--el-card-padding: 10px; --el-card-bg-color: unset"
        :class="['cursor-pointer', { active: item === animate }]"
        @click="toggleAnimate(item)"
      >
        <div
          class="w-12 h-12 rounded bg-[#f4f4f5] dark:bg-[#2e3033]"
          :style="{ animation: `${item} 3s infinite` }"
        />
      </el-card>
    </el-space>
  </el-form-item>
</template>

<script setup lang="ts">
import { animate, animates, toggleAnimate } from '../../stores/animate'
</script>

<style scoped>
.active {
  --el-card-border-color: var(--el-color-primary);
}
</style>
