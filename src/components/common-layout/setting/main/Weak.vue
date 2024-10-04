<template>
  <el-form-item :label="$t('common:layout.setting.weak')">
    <div class="w-full text-right">
      <el-switch :model-value="weak" @change="toggleWeak!" />
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { toggleWeak, weak } from '../../stores/weak'
</script>
