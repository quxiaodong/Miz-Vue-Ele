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
import { translate } from '@/utils/i18n'
import { inputRules, passwordRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, ref, useTemplateRef } from 'vue'

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
const rules = computed<FormRules<PasswordUserInput>>(() => ({
  password1: passwordRules(),
  password2: [
    ...inputRules(),
    {
      validator: (_, value: string, callback) => {
        if (model.value.password1 !== value) {
          callback(translate('common:validate.password2-not-equal'))
        }
        callback()
      },
      trigger: 'blur'
    }
  ]
}))

const useSchemas = (): { schemas: Schema[] } => {
  const schemas: Schema[] = [
    {
      tag: 'ElInput',
      tagProps: { showPassword: true },
      formItemProps: {
        prop: 'password1',
        label: '新的密码'
      }
    },
    {
      tag: 'ElInput',
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
