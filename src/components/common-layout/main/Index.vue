<template>
  <el-scrollbar view-class="h-full">
    <router-view v-slot="{ route, Component }">
      <div class="box-border h-full p-4">
        <transition
          appear
          mode="out-in"
          :name="animate"
          enter-active-class="transition-all duration-200"
          leave-active-class="transition-all duration-200"
        >
          <keep-alive :include="caches">
            <component :is="renameComponent(route.fullPath, Component)" />
          </keep-alive>
        </transition>
        <!-- when main content very long, the bottom padding will be hidden -->
        <div class="pb-4" />
      </div>
    </router-view>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { defineComponent, h, VNode } from 'vue'
import { animate } from '../stores/animate'
import { caches } from '../stores/cache'

const Empty = defineComponent({
  render() {
    return h('div')
  }
})

const componentMap = new Map()
function renameComponent(name: string, component: VNode) {
  if (!component) return Empty
  if (componentMap.has(name)) {
    return componentMap.get(name)
  }
  const newComponentObj = {
    name,
    render() {
      return h(component)
    }
  }
  const newComponent = h(newComponentObj)
  componentMap.set(name, newComponent)
  return newComponent
}
</script>
