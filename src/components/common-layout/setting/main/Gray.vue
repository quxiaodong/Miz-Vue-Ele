<template>
  <el-form-item :label="translate('common:layout.setting.gray')">
    <div class="w-full text-right">
      <el-switch :model-value="gray" @change="toggleGray!" />
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { translate } from '@/utils/i18n'
import { gray, toggleGray } from '../../stores/gray'
</script>
