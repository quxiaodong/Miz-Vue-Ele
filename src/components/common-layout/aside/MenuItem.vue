<template>
  <el-icon v-if="meta?.icon">
    <component :is="meta.icon" />
  </el-icon>
  <span>{{ translate({ stem: meta?.stem, text: meta?.name }) }}</span>
</template>

<script setup lang="ts">
import { translate } from '@/utils/i18n'
import { RouteMeta } from 'vue-router'

type Props = {
  meta?: RouteMeta
}

const { meta } = defineProps<Props>()
</script>
