<template>
  <el-icon v-if="meta?.icon">
    <component :is="meta.icon" />
  </el-icon>
  <span>{{ meta?.stem ? $t(meta.stem) : meta?.breadcrumb }}</span>
</template>

<script setup lang="ts">
import { RouteMeta } from 'vue-router'

type Props = {
  meta?: RouteMeta
}

const { meta } = defineProps<Props>()
</script>
