<template>
  <el-sub-menu v-if="children && children.length && !hideInMenu" :index>
    <template #title>
      <MenuItem :meta />
    </template>
    <template v-for="item in children" :key="item.path">
      <SubMenu :menu="item" />
    </template>
  </el-sub-menu>
  <el-menu-item v-else-if="!hideInMenu" :index>
    <MenuItem :meta />
  </el-menu-item>
</template>

<script setup lang="ts" name="SubMenu">
import { RouteRecordRaw } from 'vue-router'
import MenuItem from './MenuItem.vue'

type Props = {
  menu: RouteRecordRaw
}

const { menu } = defineProps<Props>()
const { meta, children, path: index } = menu
const { hideInMenu } = meta || {}
</script>
