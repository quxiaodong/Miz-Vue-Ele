<template>
  <el-dropdown @command="toggleMode">
    <div class="placeholder">
      <el-icon :size="18">
        <component :is="mode?.icon" />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="{ code, icon, text } in modes"
          :key="code"
          :command="code"
          :class="{ 'dropdown-item-active': code === mode?.code }"
          @click="clickItem"
        >
          <el-icon>
            <component :is="icon" />
          </el-icon>
          {{ text }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { clickItem, mode, modes, toggleMode } from './stores'
</script>
