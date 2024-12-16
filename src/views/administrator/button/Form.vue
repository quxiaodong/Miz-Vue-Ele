<template>
  <common-form ref="dom" v-model="model" :rules :schemas>
    <div class="text-right">
      <widget-submit :loading @click="verify" />
    </div>
  </common-form>
</template>

<script setup lang="tsx">
import {
  CreateButtonInput,
  UpdateButtonInput
} from '@/apis/administrator/button'
import { searchMenu } from '@/apis/administrator/menu'
import { Schema } from '@/components/form-item'
import { inputRules, selectRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, useTemplateRef } from 'vue'

type Model = CreateButtonInput | UpdateButtonInput

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
  code: inputRules(),
  menuId: selectRules()
}))

const useSchemas = (): { schemas: Schema[] } => {
  const schemas: Schema[] = [
    {
      tag: 'el-input',
      formItemProps: {
        prop: 'name',
        label: '按钮名称'
      }
    },
    {
      tag: 'el-input',
      formItemProps: {
        prop: 'code',
        label: '按钮代码'
      }
    },
    {
      tag: 'el-select',
      formItemProps: {
        prop: 'menuId',
        label: '所属菜单'
      },
      fetchOptions: () =>
        searchMenu()
          .execute({})
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
