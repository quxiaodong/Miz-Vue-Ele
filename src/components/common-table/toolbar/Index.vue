<template>
  <el-space size="default" class="mb-4 !flex justify-between">
    <el-space size="default">
      <slot name="toolbar-left" />
    </el-space>
    <el-space :spacer>
      <el-space size="default">
        <slot name="toolbar-right" />
        <Stripe />
      </el-space>
      <el-space size="default">
        <Refresh />
        <Size />
        <Setting />
        <Fullscreen />
      </el-space>
    </el-space>
  </el-space>
</template>

<script setup lang="ts">
import { ElDivider } from 'element-plus'
import { h } from 'vue'
import Fullscreen from './Fullscreen.vue'
import Refresh from './Refresh.vue'
import Setting from './Setting.vue'
import Size from './Size.vue'
import Stripe from './Stripe.vue'

const spacer = h(ElDivider, { direction: 'vertical' })
</script>
