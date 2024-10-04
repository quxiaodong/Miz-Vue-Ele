<template>
  <el-form-item :label="translate('common:layout.setting.tab')">
    <div class="w-full text-right">
      <el-switch :model-value="visible" @change="toggleVisible!" />
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { translate } from '@/utils/i18n'
import { toggleVisible, visible } from '../../stores/tab'
</script>
