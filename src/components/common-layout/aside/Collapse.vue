<template>
  <div class="px-3 py-2">
    <el-button
      :icon
      type="primary"
      class="w-full !border-0"
      @click="toggleCollapse()"
    />
  </div>
</template>

<script setup lang="ts">
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { collapse, toggleCollapse } from '../stores/aside'

const icon = computed(() => (collapse.value ? DArrowRight : DArrowLeft))
</script>
