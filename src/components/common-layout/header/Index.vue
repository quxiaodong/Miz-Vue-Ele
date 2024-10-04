<template>
  <div>
    <ToggleAside class="item" />
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
import ToggleAside from './ToggleAside.vue'
import ToggleSetting from './ToggleSetting.vue'
import User from './User.vue'

const { isMobile } = useScreenSize()
</script>

<style scoped>
.item.placeholder,
.item :deep(.placeholder) {
  @apply px-3 h-14 flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2e3033];
}
</style>
