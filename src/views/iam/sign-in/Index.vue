<template>
  <common-form ref="dom" v-model="model" :rules :schemas>
    <el-button :loading type="primary" class="w-full" @click="verify">
      {{ $t('/sign-in.login') }}
    </el-button>
    <el-link href="#/sign-up" style="--el-link-font-size: 12px">
      {{ $t('/sign-in.to-register') }}
    </el-link>
  </common-form>
</template>

<script setup lang="ts">
import { signIn, SignInInput } from '@/apis/iam'
import { Schema } from '@/components/form-item'
import { i18n } from '@/utils/i18n'
import { setToken } from '@/utils/storage'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { computed, ref, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const dom = useTemplateRef<{ formRef: FormInstance }>('dom')
const model = ref<SignInInput>({
  username: '',
  password: ''
})
const rules = computed<FormRules<SignInInput>>(() => ({
  username: [
    { required: true, message: i18n.t('common.please-input'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: i18n.t('common.please-input'), trigger: 'blur' }
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
      formItemProps: { prop: 'password' }
    }
  ]

  return { schemas }
}

const { schemas } = useSchemas()

const { execute, loading } = signIn()

const verify = () => {
  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(submit)
}

const submit = () => {
  execute(model.value).then(({ data }) => {
    ElMessage.success(i18n.t('/sign-in.login-success'))
    setToken(data)
    const redirect = route.query.redirect
    const path = Array.isArray(redirect) ? redirect[0] : redirect
    router.push(decodeURIComponent(path || '/'))
  })
}
</script>
