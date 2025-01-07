<template>
  <el-form-item
    v-bind="schema.formItemProps"
    :label="translate({ stem: schema.stem, text: schema.formItemProps?.label })"
  >
    <template v-if="'slot' in schema">
      <slot :name="schema.slot" />
    </template>
    <template v-if="'component' in schema">
      <component :is="schema.component()" />
    </template>
    <template v-if="isTag(schema) && schema.tag === 'el-input'">
      <el-input
        :placeholder="translate('common.please-input')"
        v-bind="Object.assign(vModel(), schema.tagProps)"
      />
    </template>
    <template v-if="isTag(schema) && schema.tag === 'el-select'">
      <el-select
        :placeholder="translate('common.please-select')"
        v-bind="Object.assign(vModel(), schema.tagProps)"
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
import { translate } from '@/utils/i18n'
import { computed } from 'vue'
import { Schema } from './index'

defineOptions({ name: 'FormItem' })

type Props = {
  schema: Schema
}

const { schema } = defineProps<Props>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model = defineModel<{ [key: string]: any }>({ required: true })

const isTag = (schema: Schema) => 'tag' in schema

const vModel = () => {
  const prop = schema.formItemProps?.prop
  const key =
    typeof prop === 'string' ? prop : Array.isArray(prop) ? prop.join('.') : ''
  if (key) {
    return {
      modelValue: model.value[key],
      'onUpdate:modelValue': (value: unknown) => (model.value[key] = value)
    }
  }
  return {}
}

const options = computed(() => {
  if (isTag(schema) && schema.tag === 'el-select') {
    return (
      schema.options?.value || [
        { value: 0, label: translate('common.enable') },
        { value: 1, label: translate('common.disable') }
      ]
    )
  }
  return []
})
</script>
