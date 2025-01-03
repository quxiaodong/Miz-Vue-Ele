<template>
  <el-card shadow="never" class="!border-0 mb-4">
    <el-form
      ref="dom"
      :model
      :rules
      :inline="!isMobile"
      :label-width
      class="-mb-[18px]"
    >
      <slot />
      <template v-if="showExtra">
        <slot name="extra" />
      </template>
      <el-form-item>
        <el-button :disabled="loading" @click="reset">
          {{ $t('common.reset') }}
        </el-button>
        <el-button :loading type="primary" @click="search">
          {{ $t('common.search') }}
        </el-button>
        <el-button
          v-if="hasExtra"
          text
          type="primary"
          @click="showExtra = !showExtra"
        >
          {{ showExtra ? $t('common.fold') : $t('common.unfold') }}
          <el-icon>
            <component :is="showExtra ? 'ArrowUp' : 'ArrowDown'" />
          </el-icon>
        </el-button>
      </el-form-item>
      <slot name="toolbar" />
    </el-form>
  </el-card>
</template>

<script setup lang="ts" generic="P extends Params">
import { useScreenSize } from '@/hooks/useScreenSize'
import { Service } from '@/utils/service'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, getCurrentInstance, ref, useTemplateRef } from 'vue'

export type Params = { pageNo?: number; pageSize?: number }

type Props = {
  rules?: FormRules<P>
  initValue: () => P
  service: Service<P, unknown>
}

type Emits = {
  (e: 'reset'): void
  (e: 'search'): void
}

const { rules = {}, initValue, service } = defineProps<Props>()

const emits = defineEmits<Emits>()

const model = defineModel<P>('model', { required: true })
const params = defineModel<P>('params', { required: true })

const { slots } = getCurrentInstance()!

const { isMobile } = useScreenSize()

const showExtra = ref(false)
const dom = useTemplateRef<FormInstance>('dom')

const hasExtra = computed(() => !!slots.extra)
const loading = computed(() => service.loading.value)
const labelWidth = computed(() => (isMobile.value ? 'auto' : undefined))

const reset = () => {
  const value = initValue()
  model.value = { ...value }
  params.value = {
    ...value,
    pageSize: params.value.pageSize
  }

  verify().then(() => emits('reset'))
}

const search = () => {
  params.value = {
    ...params.value,
    ...model.value,
    pageSize: params.value.pageSize
  }

  verify().then(() => emits('search'))
}

const verify = () => {
  if (!dom.value) return Promise.reject()
  return dom.value.validate().then(submit)
}

const submit = () => service.execute(params.value)
</script>
