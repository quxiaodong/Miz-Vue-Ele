<template>
  <el-form-item
    v-bind="schema.formItemProps"
    :label="schema.stem ? $t(schema.stem) : schema.formItemProps.label"
  >
    <template v-if="'slot' in schema">
      <slot :name="schema.slot" />
    </template>
    <template v-if="'component' in schema">
      <component :is="schema.component()" />
    </template>
    <template v-if="isTag(schema) && schema.tag === 'el-input'">
      <el-input
        v-model="model[schema.formItemProps.prop]"
        :placeholder="$t('common.please-input')"
        v-bind="schema.tagProps"
      />
    </template>
    <template v-if="isTag(schema) && schema.tag === 'el-select'">
      <el-select
        v-model="model[schema.formItemProps.prop]"
        :placeholder="$t('common.please-select')"
        v-bind="schema.tagProps"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </template>
    <template v-if="'children' in schema">
      <el-row :gutter="20">
        <el-col
          v-for="(child, index) in schema.children"
          :key="index"
          v-bind="child.colProps"
        >
          <FormItem v-model="model" :schema="child" />
        </el-col>
      </el-row>
    </template>
  </el-form-item>
</template>

<script setup lang="ts">
import { i18n } from '@/utils/i18n'
import { ref, watch, watchEffect } from 'vue'
import { Schema } from './index'

defineOptions({ name: 'FormItem' })

type Props = {
  schema: Schema
}

const { schema } = defineProps<Props>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model = defineModel<{ [key: string]: any }>({ required: true })

const options = ref<{ value: number | string; label: string }[]>([])

const isTag = (schema: Schema) => 'tag' in schema

watch(
  () => schema,
  () => {
    if (isTag(schema) && schema.tag === 'el-select') {
      if (schema.options) {
        watchEffect(() => {
          options.value = schema.options?.value || []
        })
      } else {
        if (schema.fetchOptions) {
          schema.fetchOptions().then(data => (options.value = data))
        } else {
          options.value = [
            { value: 0, label: i18n.t('common.enable') },
            { value: 1, label: i18n.t('common.disable') }
          ]
        }
      }
    }
  },
  { once: true, immediate: true }
)
</script>
