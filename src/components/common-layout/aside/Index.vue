<template>
  <component :is="component">
    <div class="relative z-20 flex h-full flex-col">
      <ElDivider
        v-if="!isMobile"
        direction="vertical"
        class="!absolute right-0 top-0 z-10 !mx-0 !h-full opacity-50"
      />
      <Logo />
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
    return () => h('div', { class: 'h-full page-container' }, slots)
  }
})

const { isMobile } = useScreenSize()

const component = computed(() => (isMobile.value ? Drawer : Slider))
</script>
