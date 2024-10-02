<template>
  <el-dialog
    center
    append-to-body
    destroy-on-close
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="dialogTitle"
    :width="dialogWidth"
    style="--el-dialog-border-radius: 8px"
  >
    <slot />
  </el-dialog>
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import { translate } from '@/utils/i18n'
import { computed } from 'vue'

type Props = {
  type?: 'create' | 'update'
  title?: string
  width?: string
}

const { type, title, width = '50%' } = defineProps<Props>()

const { isMobile } = useScreenSize()

const dialogWidth = computed(() => (isMobile.value ? '90%' : width))

const dialogTitle = computed(() => (type ? translate('common.' + type) : title))
</script>
