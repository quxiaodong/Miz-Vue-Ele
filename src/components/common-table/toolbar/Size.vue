<template>
  <el-dropdown trigger="click" @command="change">
    <div class="text-[0px]">
      <el-tooltip :content="$t('common:table.size')" placement="top">
        <el-icon size="18" class="cursor-pointer">
          <Grid />
        </el-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="{ code, stem } in sizes"
          :key="code"
          :command="code"
          :class="{ 'dropdown-item-active': code === size }"
        >
          {{ $t(stem) }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useSizeStore } from '../stores/size'

const { size, sizes, change } = useSizeStore()!
</script>
