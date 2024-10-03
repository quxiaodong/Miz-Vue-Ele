<template>
  <el-empty :image :description="$t('/404.description')" class="h-full">
    <el-button type="primary" tag="a" href="#/">
      {{ $t('/404.back') }}
    </el-button>
  </el-empty>
</template>

<script setup lang="ts">
import image from '@/images/404.svg'
</script>
