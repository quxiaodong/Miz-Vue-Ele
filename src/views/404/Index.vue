<template>
  <el-empty :image class="h-full" :description="translate('/404.description')">
    <el-button type="primary" tag="a" href="#/">
      {{ translate('/404.back') }}
    </el-button>
  </el-empty>
</template>

<script setup lang="ts">
import image from '@/images/404.svg'
import { translate } from '@/utils/i18n'
</script>
