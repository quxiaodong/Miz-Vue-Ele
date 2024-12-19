<template>
  <el-form ref="formRef" :label-position label-width="auto">
    <slot />
  </el-form>
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import type { FormInstance } from 'element-plus'
import { computed, useTemplateRef } from 'vue'

const { isMobile } = useScreenSize()

const formRef = useTemplateRef<FormInstance>('formRef')

const labelPosition = computed(() => (isMobile.value ? 'top' : undefined))

defineExpose({ formRef })
</script>
