<template>
  <el-dialog
    center
    append-to-body
    destroy-on-close
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :width="dialogWidth"
    style="--el-dialog-border-radius: 8px"
  >
    <slot />
  </el-dialog>
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import { computed } from 'vue'

type Props = {
  width?: string
}

const { width = '50%' } = defineProps<Props>()

const { isMobile } = useScreenSize()

const dialogWidth = computed(() => (isMobile.value ? '90%' : width))
</script>
