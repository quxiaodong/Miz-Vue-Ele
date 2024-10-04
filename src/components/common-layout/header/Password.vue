<template>
  <common-form ref="dom" v-model="model" :rules :schemas>
    <div class="text-right">
      <widget-submit :loading @click="verify" />
    </div>
  </common-form>
</template>

<script setup lang="ts">
import { UserPasswordInput, updateUserPassword } from '@/apis/iam'
import { Schema } from '@/components/form-item'
import { translate } from '@/utils/i18n'
import { removeToken } from '@/utils/storage'
import { inputRules, passwordRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { computed, ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'

type Emits = {
  (e: 'close'): void
}

const emits = defineEmits<Emits>()

const router = useRouter()

const dom = useTemplateRef<{ formRef: FormInstance }>('dom')
const model = ref<UserPasswordInput>({
  password: '',
  password1: '',
  password2: ''
})
const rules = computed<FormRules<UserPasswordInput>>(() => ({
  password: inputRules(),
  password1: passwordRules(),
  password2: [
    ...inputRules(),
    {
      validator: (_, value: string, callback) => {
        if (model.value.password1 !== value) {
          callback(translate({ stem: 'common:validate.password2-not-equal' }))
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
      tag: 'el-input',
      tagProps: { showPassword: true },
      stem: 'common:layout.current-password',
      formItemProps: { prop: 'password' }
    },
    {
      tag: 'el-input',
      tagProps: { showPassword: true },
      stem: 'common:layout.new-password',
      formItemProps: { prop: 'password1' }
    },
    {
      tag: 'el-input',
      tagProps: { showPassword: true },
      stem: 'common:layout.confirm-password',
      formItemProps: { prop: 'password2' }
    }
  ]

  return { schemas }
}

const { schemas } = useSchemas()

const { execute, loading } = updateUserPassword()

const verify = () => {
  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(submit)
}

const submit = () => {
  execute(model.value).then(() => {
    ElMessage.success(
      translate({ stem: 'common:layout.change-password.success' })
    )
    emits('close')
    removeToken()
    router.push('/sign-in')
  })
}
</script>
