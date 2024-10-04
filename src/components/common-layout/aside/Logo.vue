<template>
  <div class="h-14 relative z-10 flex items-center justify-center">
    <img :src class="h-8 cursor-pointer" @click="click" />
  </div>
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import smallLogo from '@/images/element-plus-logo-small.svg'
import largeLogo from '@/images/element-plus-logo.svg'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { collapse, toggleCollapse } from '../stores/aside'

const router = useRouter()
const { isMobile } = useScreenSize()

const src = computed(() => (collapse.value ? smallLogo : largeLogo))

const click = () => {
  if (isMobile.value) {
    toggleCollapse()
  }
  router.push('/')
}
</script>
