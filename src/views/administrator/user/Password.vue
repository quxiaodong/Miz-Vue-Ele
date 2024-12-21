<template>
  <common-form ref="dom" v-model="model" :rules :schemas>
    <div class="text-right">
      <widget-submit :loading @click="verify" />
    </div>
  </common-form>
</template>

<script setup lang="ts">
import {
  passwordUser,
  PasswordUserInput,
  SearchUserOutput
} from '@/apis/administrator/user'
import { Schema } from '@/components/form-item'
import { i18n } from '@/utils/i18n'
import { passwordRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref, useTemplateRef } from 'vue'

type Props = {
  row: SearchUserOutput
}

type Emits = {
  (e: 'close'): void
}

const { row } = defineProps<Props>()

const emits = defineEmits<Emits>()

const dom = useTemplateRef<{ formRef: FormInstance }>('dom')
const model = ref<PasswordUserInput>({
  id: row.id,
  password1: '',
  password2: ''
})
const rules = reactive<FormRules<PasswordUserInput>>({
  password1: passwordRules(),
  password2: [
    { required: true, message: i18n.t('common.please-input'), trigger: 'blur' },
    {
      validator: (_, value: string, callback) => {
        if (model.value.password1 !== value) {
          callback(i18n.t('common:validate.password2-not-equal'))
        }
        callback()
      },
      trigger: 'blur'
    }
  ]
})

const useSchemas = (): { schemas: Schema[] } => {
  const schemas: Schema[] = [
    {
      tag: 'el-input',
      tagProps: { showPassword: true },
      formItemProps: {
        prop: 'password1',
        label: '新的密码'
      }
    },
    {
      tag: 'el-input',
      tagProps: { showPassword: true },
      formItemProps: {
        prop: 'password2',
        label: '确认密码'
      }
    }
  ]

  return { schemas }
}

const { schemas } = useSchemas()

const { execute, loading } = passwordUser()

const verify = () => {
  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(submit)
}

const submit = () => execute(model.value).then(() => emits('close'))
</script>
