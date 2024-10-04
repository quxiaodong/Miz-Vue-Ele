<template>
  <el-sub-menu v-if="children && children.length && !meta?.hideInMenu" :index>
    <template #title>
      <MenuItem :meta />
    </template>
    <template v-for="item in children" :key="item.path">
      <SubMenu :menu="item" :prefix="index" />
    </template>
  </el-sub-menu>
  <el-menu-item v-else-if="!meta?.hideInMenu" :index>
    <MenuItem :meta />
  </el-menu-item>
</template>

<script setup lang="ts" name="SubMenu">
import { computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import MenuItem from './MenuItem.vue'

type Props = {
  prefix?: string
  menu: RouteRecordRaw
}

const { prefix, menu } = defineProps<Props>()
const { path, meta, children } = menu

const index = computed(() =>
  prefix ? prefix + (path ? '/' + path : '') : path
)
</script>
