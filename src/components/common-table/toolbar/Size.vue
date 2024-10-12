<template>
  <el-dropdown trigger="click" @command="change">
    <div class="text-[0px]">
      <el-tooltip placement="top" :content="translate('common:table.size')">
        <el-icon size="18" class="cursor-pointer">
          <Grid />
        </el-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="{ code, text } in sizes"
          :key="code"
          :command="code"
          :class="{ 'dropdown-item-active': code === size }"
        >
          {{ text }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { translate } from '@/utils/i18n'
import { useSizeStore } from '../stores/size'

const { size, sizes, change } = useSizeStore()!
</script>
