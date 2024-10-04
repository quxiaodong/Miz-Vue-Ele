<template>
  <div class="relative z-10 flex h-14 items-center justify-center">
    <el-space class="cursor-pointer" @click="click">
      <img src="@/images/logo.png" class="h-8" />
      <el-text v-if="!collapse" class="whitespace-nowrap text-lg">
        {{ config.title }}
      </el-text>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import config from '@/config'
import { useScreenSize } from '@/hooks/useScreenSize'
import { useRouter } from 'vue-router'
import { collapse, toggleCollapse } from '../stores/aside'

const router = useRouter()
const { isMobile } = useScreenSize()

const click = () => {
  if (isMobile.value) {
    toggleCollapse()
  }
  router.push('/')
}
</script>
