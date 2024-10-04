<template>
  <el-drawer
    :model-value="show"
    :show-close="false"
    :with-header="false"
    direction="ltr"
    :size="width"
    style="--el-drawer-padding-primary: 0"
    @open="toggleCollapse(false)"
    @close="toggleCollapse(true)"
  >
    <slot />
  </el-drawer>
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import { computed } from 'vue'
import { collapse, toggleCollapse, width } from '../stores/aside'

const { isMobile } = useScreenSize()

const show = computed(() => isMobile.value && !collapse.value)
</script>
