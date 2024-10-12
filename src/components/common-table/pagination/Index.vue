<template>
  <el-pagination
    background
    :size
    :layout
    :pager-count="5"
    :page-sizes="[10, 20, 30, 40, 50, 100]"
    :page-size="params.pageSize"
    :current-page="params.pageNo"
    :total="service.result.value?.total || 0"
    class="mt-4 justify-end sm:justify-center sm:flex-wrap"
    @size-change="changePageSize"
    @current-change="changePageNo"
  />
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import { computed } from 'vue'
import { useApiStore } from '../stores/api'
import { useSizeStore } from '../stores/size'

const { isMobile } = useScreenSize()

const { size } = useSizeStore()!
const { service, params, changePageNo, changePageSize } = useApiStore()!

const layout = computed(() =>
  isMobile.value
    ? 'prev, pager, next, total'
    : 'total, prev, pager, next, sizes'
)
</script>
