<template>
  <common-form ref="dom" v-model="model" :rules :schemas>
    <div class="text-right">
      <widget-submit :loading @click="verify" />
    </div>
  </common-form>
</template>

<script setup lang="tsx">
import { searchLocale } from '@/apis/language/locale'
import {
  CreateTranslationInput,
  UpdateTranslationInput
} from '@/apis/language/translation'
import { Schema } from '@/components/form-item'
import { inputRules, selectRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, useTemplateRef } from 'vue'

type Model = CreateTranslationInput | UpdateTranslationInput

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
  stem: inputRules(),
  text: inputRules(),
  localeId: selectRules()
}))

const useSchemas = (): { schemas: Schema[] } => {
  const schemas: Schema[] = [
    {
      tag: 'el-input',
      formItemProps: {
        prop: 'stem',
        label: '翻译标识'
      }
    },
    {
      tag: 'el-input',
      formItemProps: {
        prop: 'text',
        label: '翻译内容'
      }
    },
    {
      tag: 'el-select',
      formItemProps: {
        prop: 'localeId',
        label: '所属语言'
      },
      fetchOptions: () =>
        searchLocale()
          .execute({ status: [0] })
          .then(({ data }) =>
            data.map(({ id, name }) => ({ value: id, label: name }))
          )
    },
    {
      tag: 'el-select',
      formItemProps: {
        prop: 'status',
        label: '按钮状态'
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
