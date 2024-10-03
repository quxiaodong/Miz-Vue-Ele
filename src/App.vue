<template>
  <el-config-provider :locale="localeProvider">
    <el-watermark :content :font :z-index="9999" class="h-full">
      <router-view />
    </el-watermark>
  </el-config-provider>
</template>

<script setup lang="ts">
import { isDark } from '@/components/common-dark/stores'
import { locale } from '@/components/common-locale/stores'
import config from '@/utils/config'
import { WatermarkFontType } from 'element-plus'
import * as locales from 'element-plus/es/locale/index.mjs'
import { computed, ComputedRef } from 'vue'

const content = ['development', 'mock'].includes(import.meta.env.MODE)
  ? '内容仅供测试和展示'
  : ''

const localeProvider = computed(
  () => locales[(locale.value?.code ?? config.lang) as keyof typeof locales]
)

const font: ComputedRef<WatermarkFontType> = computed(() => ({
  fontSize: 16,
  color: isDark.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
}))
</script>
