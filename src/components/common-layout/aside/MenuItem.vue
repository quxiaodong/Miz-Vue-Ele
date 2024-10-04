<template>
  <el-icon v-if="meta?.icon">
    <component :is="meta.icon" />
  </el-icon>
  {{ meta?.stem ? $t(meta.stem) : meta?.breadcrumb }}
</template>

<script setup lang="ts">
import { RouteMeta } from 'vue-router'

type Props = {
  meta?: RouteMeta
}

const { meta } = defineProps<Props>()
</script>
