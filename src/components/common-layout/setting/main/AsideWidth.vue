<template>
  <el-form-item label="边栏宽度">
    <el-input-number
      :min="minWidth"
      :max="maxWidth"
      :model-value="width"
      class="!w-full"
      @change="toggleWidth!"
    />
  </el-form-item>
</template>

<script setup lang="ts">
import { maxWidth, minWidth, toggleWidth, width } from '../../stores/aside'
</script>
