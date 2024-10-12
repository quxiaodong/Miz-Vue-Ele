<template>
  <el-card shadow="never" class="mb-4 !border-0">
    <el-form
      ref="dom"
      :model
      :rules
      :inline="!isMobile"
      :label-width
      class="-mb-[18px]"
    >
      <template v-for="schema in schemas" :key="schema">
        <FormItem
          v-show="!schema.extra || (schema.extra && showExtra)"
          v-model="model"
          :schema
        >
          <template v-if="'slot' in schema" #[schema.slot]>
            <slot :name="schema.slot" />
          </template>
        </FormItem>
      </template>
      <slot />
      <template v-if="showExtra">
        <slot name="extra" />
      </template>
      <el-form-item>
        <el-button :disabled="loading" @click="reset">
          {{ translate('common.reset') }}
        </el-button>
        <el-button :loading type="primary" @click="search">
          {{ translate('common.search') }}
        </el-button>
        <el-button
          v-if="hasExtra"
          text
          type="primary"
          @click="showExtra = !showExtra"
        >
          {{ translate(showExtra ? 'common.fold' : 'common.unfold') }}
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
import { Schema } from '@/components/form-item'
import FormItem from '@/components/form-item/Index.vue'
import { useScreenSize } from '@/hooks/useScreenSize'
import { translate } from '@/utils/i18n'
import { Service } from '@/utils/service'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, getCurrentInstance, ref, useTemplateRef } from 'vue'

export type Params = { pageNo?: number; pageSize?: number }

type Props = {
  schemas?: Schema[]
  rules?: FormRules<P>
  initValue: () => P
  service: Service<P, unknown>
}

type Emits = {
  (e: 'reset'): void
  (e: 'search'): void
}

const { schemas, rules = {}, initValue, service } = defineProps<Props>()

const emits = defineEmits<Emits>()

const model = defineModel<P>('model', { required: true })
const params = defineModel<P>('params', { required: true })

const { slots } = getCurrentInstance()!

const { isMobile } = useScreenSize()

const showExtra = ref(false)
const dom = useTemplateRef<FormInstance>('dom')

const hasExtra = computed(
  () => !!slots.extra || !!schemas?.filter(v => v.extra).length
)
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
