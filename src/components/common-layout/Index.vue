<template>
  <el-container class="h-full w-screen">
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
        class="page-container flex items-center justify-between"
      >
        <Header />
      </el-header>
      <ElDivider class="!my-0" />
      <div v-if="history" class="page-container z-10">
        <History />
        <el-divider class="!my-0" />
      </div>
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
import History from './history/Index.vue'
import Main from './main/Index.vue'
import Setting from './setting/Index.vue'
import { collapse, visible, width } from './stores/aside'
import { history } from './stores/history'

const { isMobile } = useScreenSize()

const asideWidth = computed(() => {
  if (isMobile.value || !visible.value) return '0px'
  return collapse.value ? '64px' : width.value + 'px'
})
</script>
