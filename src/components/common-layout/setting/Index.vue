<template>
  <el-drawer
    :model-value="visible"
    :with-header="false"
    direction="rtl"
    :size
    destroy-on-close
    style="--el-drawer-padding-primary: 0"
    @open="toggleVisible(true)"
    @close="toggleVisible(false)"
  >
    <div class="flex h-full flex-col">
      <Header />
      <ElDivider class="!mt-0" />
      <div class="grow">
        <el-scrollbar>
          <Main class="px-4" />
        </el-scrollbar>
      </div>
      <ElDivider class="!mb-0" />
      <Footer />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import { computed } from 'vue'
import { toggleVisible, visible } from '../stores/setting'
import Footer from './footer/Index.vue'
import Header from './header/Index.vue'
import Main from './main/Index.vue'

const { isMobile } = useScreenSize()

const size = computed(() => (isMobile.value ? '90%' : '358px'))
</script>
