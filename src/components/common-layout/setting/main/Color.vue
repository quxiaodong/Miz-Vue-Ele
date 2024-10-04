<template>
  <el-form-item :label="translate('common:layout.setting.color')">
    <div class="w-full text-right">
      <el-color-picker :model-value="color" @change="toggleColor" />
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { translate } from '@/utils/i18n'
import { color, toggleColor } from '../../stores/color'
</script>
