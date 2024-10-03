<template>
  <common-form ref="dom" v-model="model" :rules :schemas>
    <el-button :loading type="primary" class="w-full" @click="verify">
      {{ $t('/sign-up.register') }}
    </el-button>
    <el-link href="#/sign-in" style="--el-link-font-size: 12px">
      {{ $t('/sign-up.to-login') }}
    </el-link>
  </common-form>
</template>

<script setup lang="ts">
import { signUp, SignUpInput } from '@/apis/iam'
import { Schema } from '@/components/form-item'
import { i18n } from '@/utils/i18n'
import { passwordRules, usernameRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { computed, ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const dom = useTemplateRef<{ formRef: FormInstance }>('dom')
const model = ref<SignUpInput>({
  username: '',
  password1: '',
  password2: ''
})
const rules = computed<FormRules<SignUpInput>>(() => ({
  username: usernameRules(),
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
}))

const useSchemas = (): { schemas: Schema[] } => {
  const schemas: Schema[] = [
    {
      tag: 'el-input',
      tagProps: { prefixIcon: 'User' },
      formItemProps: { prop: 'username' }
    },
    {
      tag: 'el-input',
      tagProps: { showPassword: true, prefixIcon: 'Lock' },
      formItemProps: { prop: 'password1' }
    },
    {
      tag: 'el-input',
      tagProps: { showPassword: true, prefixIcon: 'Lock' },
      formItemProps: { prop: 'password2' }
    }
  ]

  return { schemas }
}

const { schemas } = useSchemas()

const { execute, loading } = signUp()

const verify = () => {
  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(submit)
}

const submit = () => {
  execute(model.value).then(() => {
    ElMessage.success(i18n.t('/sign-up.register-success'))
    router.push('/sign-in')
  })
}
</script>
