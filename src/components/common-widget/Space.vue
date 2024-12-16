<template>
  <el-space :spacer wrap>
    <slot />
  </el-space>
</template>

<script setup lang="ts">
import { ElDivider } from 'element-plus'
import { h } from 'vue'

const spacer = h(ElDivider, { direction: 'vertical' })
</script>
