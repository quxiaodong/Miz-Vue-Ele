<template>
  <el-scrollbar>
    <div class="p-4">
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
</template>

<script setup lang="ts">
import { animate } from '../stores/animate'
</script>
