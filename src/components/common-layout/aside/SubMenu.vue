<template>
  <el-sub-menu v-if="showSubMenu" :index>
    <template #title>
      <MenuItem :meta />
    </template>
    <template v-for="item in children" :key="item.path">
      <SubMenu :menu="item" />
    </template>
  </el-sub-menu>
  <template v-else-if="!hideInMenu">
    <el-menu-item v-if="!link || (link && embed)" :index>
      <MenuItem :meta />
    </el-menu-item>
    <div v-else class="el-menu-item" @click="click">
      <MenuItem :meta />
    </div>
  </template>
</template>

<script setup lang="ts" name="SubMenu">
import { computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import MenuItem from './MenuItem.vue'

type Props = {
  menu: RouteRecordRaw
}

const { menu } = defineProps<Props>()
const { meta, children, path: index } = menu
const { hideInMenu, link, embed } = meta || {}

const showSubMenu = computed(() => {
  if (hideInMenu) return false
  if (!children || !children.length) return false
  const isWrapedInLayout = children?.length === 1 && children[0].path === ''
  if (isWrapedInLayout) return false
  return true
})

const click = () => window.open(link as string)
</script>

<style scoped>
.el-menu-item.is-active {
  background-color: var(--el-color-primary-light-9);
}
.el-menu-item.is-active::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  background-color: var(--el-color-primary);
}
</style>
