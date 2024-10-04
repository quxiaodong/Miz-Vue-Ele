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
      <ElDivider class="!my-0 opacity-50" />
      <div v-if="tabVisible" class="page-container z-10">
        <Tab />
        <el-divider class="!my-0 opacity-50" />
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
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Aside from './aside/Index.vue'
import Header from './header/Index.vue'
import Main from './main/Index.vue'
import Setting from './setting/Index.vue'
import { visible as asideVisible, collapse, width } from './stores/aside'
import { createCache } from './stores/cache'
import { visible as tabVisible, tabs } from './stores/tab'
import Tab from './tab/Index.vue'

const route = useRoute()

const { isMobile } = useScreenSize()

const asideWidth = computed(() => {
  if (isMobile.value || !asideVisible.value) return '0px'
  return collapse.value ? '64px' : width.value + 'px'
})

watch(
  () => route.path,
  () => {
    if (route.meta.cache) {
      createCache(route.path)
    }
    if (route.path === '/redirect') return
    const tab = tabs.value.find(v => v.path === route.path)
    if (tab) {
      tab.fullPath = route.fullPath
    } else {
      tabs.value.push({
        fullPath: route.fullPath,
        path: route.path,
        name: route.meta.name,
        stem: route.meta.stem,
        icon: route.meta.icon
      })
    }
  },
  { immediate: true }
)
</script>
