<template>
  <el-sub-menu v-if="children && children.length && !hideInMenu" :index>
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
import { RouteRecordRaw } from 'vue-router'
import MenuItem from './MenuItem.vue'

type Props = {
  menu: RouteRecordRaw
}

const { menu } = defineProps<Props>()
const { meta, children, path: index } = menu
const { hideInMenu, link, embed } = meta || {}

const click = () => window.open(link || '')
</script>
