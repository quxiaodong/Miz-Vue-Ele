<template>
  <el-scrollbar view-class="h-full">
    <router-view v-slot="{ Component }">
      <div class="box-border h-full p-4">
        <transition
          appear
          mode="out-in"
          :name="animate"
          enter-active-class="transition-all duration-200"
          leave-active-class="transition-all duration-200"
        >
          <keep-alive :include="caches">
            <component :is="Component" />
          </keep-alive>
        </transition>
        <!-- when main content very long, the bottom padding will be hidden -->
        <div class="pb-4" />
      </div>
    </router-view>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { animate } from '../stores/animate'
import { caches } from '../stores/views'
</script>
