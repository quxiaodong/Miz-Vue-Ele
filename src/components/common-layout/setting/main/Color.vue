<template>
  <el-form-item label="主题颜色">
    <div class="w-full text-right">
      <el-color-picker :model-value="color" @change="toggleColor" />
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { color, toggleColor } from '../../stores/color'
</script>
