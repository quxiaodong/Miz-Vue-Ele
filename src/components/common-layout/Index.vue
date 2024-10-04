<template>
  <el-container class="w-screen h-screen">
    <el-aside
      :width="asideWidth"
      class="!overflow-hidden transition-all duration-300"
    >
      <Aside />
    </el-aside>
    <el-container>
      <el-header
        height="56px"
        style="--el-header-padding: 0"
        class="flex items-center justify-between page-container"
      >
        <Header />
      </el-header>
      <ElDivider class="!my-0" />
      <el-main style="--el-main-padding: 0" class="page-bg">
        <Main />
      </el-main>
    </el-container>
  </el-container>
  <Setting />
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import { computed } from 'vue'
import Aside from './aside/Index.vue'
import Header from './header/Index.vue'
import Main from './main/Index.vue'
import Setting from './setting/Index.vue'
import { collapse, visible, width } from './stores/aside'

const { isMobile } = useScreenSize()

const asideWidth = computed(() => {
  if (isMobile.value || !visible.value) return '0px'
  return collapse.value ? '64px' : width.value + 'px'
})
</script>
