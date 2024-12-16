<template>
  <el-link type="primary" underline="never">
    <slot>{{ translate('common.update') }}</slot>
  </el-link>
</template>

<script setup lang="ts">
import { translate } from '@/utils/i18n'
</script>
