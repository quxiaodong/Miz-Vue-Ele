<template>
  <el-form-item
    v-bind="schema.formItemProps"
    :label="translate({ stem: schema.stem, text: schema.formItemProps?.label })"
  >
    <template v-if="'slot' in schema">
      <slot :name="schema.slot" />
    </template>
    <template v-else-if="'component' in schema">
      <component :is="schema.component()" />
    </template>
    <template v-else-if="isSelect(schema)">
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
    <template v-else-if="isTag(schema)">
      <component
        :is="schema.tag"
        v-bind="Object.assign(vModel(), schema.tagProps)"
      >
        <FormItem
          v-for="(child, index) in schema.children"
          :key="index"
          v-model="model"
          :schema="child"
        />
      </component>
    </template>
    <template v-if="isPureChildren(schema)">
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
import { Options, Schema, Tag, TagProps } from './index'

defineOptions({ name: 'FormItem' })

type Props = {
  schema: Schema
}

const { schema } = defineProps<Props>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model = defineModel<{ [key: string]: any }>({ required: true })

const isTag = (
  schema: Schema
): schema is Schema & {
  tag: Tag
  tagProps?: TagProps<Tag>
} => 'tag' in schema

const isSelect = (
  schema: Schema
): schema is Schema & {
  tag: 'ElSelect'
  tagProps?: TagProps<'ElSelect'>
  options?: Options<'ElSelect'>
} => 'tag' in schema && schema.tag === 'ElSelect'

const isPureChildren = (
  schema: Schema
): schema is Schema & { children: Schema[] } =>
  'children' in schema && !('tag' in schema)

const vModel = () => {
  const props: Record<string, unknown> = {}
  const prop = schema.formItemProps?.prop
  const key =
    typeof prop === 'string' ? prop : Array.isArray(prop) ? prop.join('.') : ''
  if (key) {
    props.modelValue = model.value[key]
    props['onUpdate:modelValue'] = (value: unknown) =>
      (model.value[key] = value)
  }
  if (isTag(schema)) {
    const tagProps =
      (schema.tagProps as TagProps<typeof schema.tag> & {
        placeholder?: string
      }) || {}
    const placeholder = tagProps.placeholder

    const inputs: Tag[] = [
      'ElInput',
      'ElAutocomplete',
      'ElInputTag',
      'ElMention'
    ]
    if (inputs.includes(schema.tag)) {
      props.placeholder = placeholder ?? translate('common.please-input')
    }

    const selects: Tag[] = [
      'ElSelectV2',
      'ElTreeSelect',
      'ElCascader',
      'ElDatePicker',
      'ElTimePicker',
      'ElTimeSelect'
    ]
    if (selects.includes(schema.tag)) {
      props.placeholder = placeholder ?? translate('common.please-select')
    }
  }
  return props
}

const options = computed(() => {
  if (isSelect(schema)) {
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
