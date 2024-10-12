<template>
  <el-card ref="dom" shadow="never" class="!border-0">
    <div>
      <tool-bar>
        <slot name="toolbar" />
      </tool-bar>
      <div v-loading="service.loading.value" :element-loading-background>
        <Table>
          <template v-for="slot in slots" #[slot]>
            <slot :name="slot" />
          </template>
        </Table>
        <Pagination />
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts" generic="P extends Params, I extends Object">
import { isDark } from '@/components/common-dark/stores'
import { computed, useTemplateRef } from 'vue'
import { Params, Props } from './index'
import Pagination from './pagination/Index.vue'
import { useProvideApiStore } from './stores/api'
import { useProvideColumnStore } from './stores/column'
import { useProvideFullscreenStore } from './stores/fullscreen'
import { useProvidePropsStore } from './stores/props'
import { useProvideSizeStore } from './stores/size'
import { useProvideStripeStore } from './stores/stripe'
import Table from './table/Index.vue'
import ToolBar from './toolbar/Index.vue'

const props = defineProps<Props<P, I>>()
const service = props.service
const columns = props.columns

const params = defineModel<P>('params', { required: true })

const dom = useTemplateRef<HTMLDivElement>('dom')

const slots = computed(() => columns.filter(v => v.slot).map(v => v.slot))

const elementLoadingBackground = computed(() =>
  isDark.value ? 'rgba(38, 39, 39, .5)' : 'rgba(255, 255, 255, .5)'
)

useProvideApiStore(service, params)
useProvideColumnStore(columns)
useProvideFullscreenStore(dom)
useProvidePropsStore(props)
useProvideStripeStore()
useProvideSizeStore()
</script>
