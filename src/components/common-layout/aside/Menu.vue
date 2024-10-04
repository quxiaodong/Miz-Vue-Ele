<template>
  <el-menu
    router
    :collapse="menuCollapse"
    :collapse-transition="false"
    :default-active="route.path"
    class="!border-r-0 select-none"
    @select="select"
  >
    <template v-for="menu in userStore.menus" :key="menu.path">
      <SubMenu :menu :prefix="''" />
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { collapse, toggleCollapse } from '../stores/aside'
import SubMenu from './SubMenu.vue'

const route = useRoute()
const userStore = useUserStore()
const { isMobile } = useScreenSize()

const menuCollapse = computed(() => (isMobile.value ? false : collapse.value))

const select = () => {
  if (isMobile.value) {
    toggleCollapse()
  }
}
</script>

<style scoped>
:global(.el-menu) {
  --el-menu-item-height: 40px;
  --el-menu-sub-item-height: 40px;
}
</style>
