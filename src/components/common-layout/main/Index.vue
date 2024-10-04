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
          <div :key="route.path">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { animate } from '../stores/animate'

const route = useRoute()
</script>
