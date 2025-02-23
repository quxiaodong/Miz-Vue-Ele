<template>
  <common-form ref="dom" v-model="model" :rules :schemas>
    <div class="text-right">
      <widget-submit :loading @click="verify" />
    </div>
  </common-form>
</template>

<script setup lang="tsx">
import { CreateLocaleInput, UpdateLocaleInput } from '@/apis/language/locale'
import { Schema } from '@/components/form-item'
import { inputRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, useTemplateRef } from 'vue'

type Model = CreateLocaleInput | UpdateLocaleInput

type Props = {
  loading: boolean
}

type Emits = {
  (e: 'submit'): void
}

const { loading } = defineProps<Props>()

const emits = defineEmits<Emits>()

const dom = useTemplateRef<{ formRef: FormInstance }>('dom')
const model = defineModel<Model>({ required: true })
const rules = computed<FormRules<Model>>(() => ({
  name: inputRules(),
  code: inputRules()
}))

const useSchemas = (): { schemas: Schema[] } => {
  const schemas: Schema[] = [
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'name',
        label: '语言名称'
      }
    },
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'code',
        label: '语言代码'
      }
    },
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'icon',
        label: '语言图标'
      }
    },
    {
      tag: 'ElInput',
      tagProps: {
        formatter: (value: string) => value.replace(/[^0-9]/g, ''),
        parser: (value: string) => value.replace(/[^0-9]/g, '')
      },
      formItemProps: {
        prop: 'sort',
        label: '语言排序'
      }
    },
    {
      tag: 'ElSelect',
      formItemProps: {
        prop: 'status',
        label: '语言状态'
      }
    }
  ]

  return { schemas }
}

const { schemas } = useSchemas()

const verify = () => {
  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(() => emits('submit'))
}
</script>
