<template>
  <div class="placeholder" @click="click">
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="1.6"
    >
      <line x1="4" x2="20" y1="12" y2="12"></line>
      <line x1="4" x2="20" y1="6" y2="6"></line>
      <line x1="4" x2="20" y1="18" y2="18"></line>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import { toggleCollapse, toggleVisible } from '../stores/aside'

const { isMobile } = useScreenSize()

const click = () => {
  if (isMobile.value) {
    toggleCollapse()
  } else {
    toggleVisible()
  }
}
</script>
