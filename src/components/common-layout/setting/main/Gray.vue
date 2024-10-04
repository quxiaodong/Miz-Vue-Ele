<template>
  <el-form-item :label="$t('common:layout.setting.gray')">
    <div class="w-full text-right">
      <el-switch :model-value="gray" @change="toggleGray!" />
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { gray, toggleGray } from '../../stores/gray'
</script>
