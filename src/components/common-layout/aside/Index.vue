<template>
  <component :is="component">
    <div class="flex flex-col h-screen relative z-20">
      <Logo />
      <ElDivider class="!my-0" />
      <div class="grow">
        <el-scrollbar>
          <Menu />
        </el-scrollbar>
      </div>
      <Collapse />
    </div>
  </component>
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import { computed, defineComponent, h } from 'vue'
import Collapse from './Collapse.vue'
import Drawer from './Drawer.vue'
import Logo from './Logo.vue'
import Menu from './Menu.vue'

const Slider = defineComponent({
  setup(_, { slots }) {
    return () => h('div', { class: 'page-container' }, slots)
  }
})

const { isMobile } = useScreenSize()

const component = computed(() => (isMobile.value ? Drawer : Slider))
</script>
