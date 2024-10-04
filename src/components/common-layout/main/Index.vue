<template>
  <div class="flex h-full flex-col">
    <div v-if="history" class="page-container z-10">
      <History />
      <el-divider class="!my-0" />
    </div>
    <div class="flex-1 overflow-auto">
      <el-scrollbar view-class="h-full">
        <router-view v-slot="{ Component }">
          <transition
            appear
            mode="out-in"
            :name="animate"
            enter-active-class="transition-all duration-200"
            leave-active-class="transition-all duration-200"
          >
            <div class="box-border h-full p-4">
              <!-- use defineOptions to manually declare the name -->
              <keep-alive :include="userStore.caches">
                <component :is="Component" />
              </keep-alive>
              <!-- view-class="h-full" -->
              <!-- when main very long, the bottom will be hidden -->
              <div class="pb-4" />
            </div>
          </transition>
        </router-view>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { animate } from '../stores/animate'
import { history } from '../stores/history'
import History from './History.vue'

const userStore = useUserStore()
</script>
