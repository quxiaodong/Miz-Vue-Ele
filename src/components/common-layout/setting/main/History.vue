<template>
  <el-form-item :label="translate('common:layout.setting.history')">
    <div class="w-full text-right">
      <el-switch :model-value="history" @change="toggleHistory!" />
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { translate } from '@/utils/i18n'
import { history, toggleHistory } from '../../stores/history'
</script>
