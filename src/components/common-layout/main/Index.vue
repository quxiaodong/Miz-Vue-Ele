<template>
  <div class="h-full flex flex-col">
    <Breadcrumb class="p-4" />
    <div class="grow overflow-hidden">
      <el-scrollbar>
        <div class="p-4 pt-0">
          <router-view v-slot="{ Component }">
            <transition
              appear
              mode="out-in"
              :name="animate"
              enter-active-class="transition-all duration-200"
              leave-active-class="transition-all duration-200"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { animate } from '../stores/animate'
import Breadcrumb from './Breadcrumb.vue'
</script>
