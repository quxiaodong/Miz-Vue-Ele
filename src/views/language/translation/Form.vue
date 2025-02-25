<template>
  <common-form ref="dom" v-model="model" :rules :schemas>
    <div class="text-right">
      <widget-submit :loading @click="verify" />
    </div>
  </common-form>
</template>

<script setup lang="tsx">
import { searchLocale, SearchLocaleOutput } from '@/apis/language/locale'
import {
  CreateTranslationInput,
  UpdateTranslationInput
} from '@/apis/language/translation'
import { Schema } from '@/components/form-item'
import { inputRules, selectRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, ref, useTemplateRef } from 'vue'

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
  const locales = ref<SearchLocaleOutput[]>([])

  searchLocale()
    .execute({})
    .then(({ data }) => (locales.value = data))

  const schemas: Schema[] = [
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'stem',
        label: '翻译标识'
      }
    },
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'text',
        label: '翻译内容'
      }
    },
    {
      tag: 'ElSelect',
      formItemProps: {
        prop: 'localeId',
        label: '所属语言'
      },
      options: computed(() =>
        locales.value.map(({ id, name }) => ({ value: id, label: name }))
      )
    },
    {
      tag: 'ElSelect',
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
