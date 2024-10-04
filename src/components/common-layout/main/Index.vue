<template>
  <el-scrollbar view-class="h-full">
    <router-view v-slot="{ Component }">
      <transition
        appear
        mode="out-in"
        :name="animate"
        enter-active-class="transition-all duration-200"
        leave-active-class="transition-all duration-200"
      >
        <div v-if="show" class="box-border h-full p-4">
          <!-- use defineOptions to manually declare the name -->
          <keep-alive :include="userStore.caches">
            <component :is="Component" />
          </keep-alive>
          <!-- view-class="h-full" -->
          <!-- when main content very long, the bottom padding will be hidden -->
          <div class="pb-4" />
        </div>
      </transition>
    </router-view>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { animate } from '../stores/animate'
import { show } from '../stores/views'

const userStore = useUserStore()
</script>
