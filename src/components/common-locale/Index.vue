<template>
  <el-dropdown v-if="locales && locales.length" @command="toggleLocale">
    <div class="placeholder">
      <el-icon :size="18">
        <IconLocale />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="{ code, icon, name } in locales"
          :key="code"
          :command="code"
          :class="{ 'dropdown-item-active': code === locale?.code }"
        >
          {{ icon }} {{ name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { locale, locales, toggleLocale } from './stores'
</script>
