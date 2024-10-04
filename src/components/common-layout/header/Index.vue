<template>
  <div class="flex items-center">
    <ToggleAside class="item" />
    <Breadcrumb v-if="!isMobile" class="px-3" />
  </div>
  <div class="flex">
    <ToggleSetting class="item" />
    <common-dark v-if="!isMobile" class="item" />
    <common-locale v-if="!isMobile" class="item" />
    <User class="item" />
  </div>
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import Breadcrumb from './Breadcrumb.vue'
import ToggleAside from './ToggleAside.vue'
import ToggleSetting from './ToggleSetting.vue'
import User from './User.vue'

const { isMobile } = useScreenSize()
</script>

<style scoped>
.item.placeholder,
.item :deep(.placeholder) {
  @apply flex h-14 cursor-pointer items-center px-3 hover:bg-gray-50 dark:hover:bg-[#2e3033];
}
</style>
