<template>
  <el-button type="primary" icon="Plus">
    {{ translate({ stem: 'common.create' }) }}
  </el-button>
</template>

<script setup lang="ts">
import { translate } from '@/utils/i18n'
</script>
