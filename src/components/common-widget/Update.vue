<template>
  <el-link type="primary" :underline="false">
    <slot>{{ translate({ stem: 'common.update' }) }}</slot>
  </el-link>
</template>

<script setup lang="ts">
import { translate } from '@/utils/i18n'
</script>
