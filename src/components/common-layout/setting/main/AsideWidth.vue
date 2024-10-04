<template>
  <el-form-item :label="$t('common:layout.setting.aside')">
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
