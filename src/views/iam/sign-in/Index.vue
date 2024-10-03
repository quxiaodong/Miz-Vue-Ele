<template>
  <common-form ref="dom" v-model="model" :rules :schemas>
    <el-button :loading type="primary" class="w-full" @click="verify">
      {{ translate('/sign-in.login') }}
    </el-button>
    <el-link href="#/sign-up" style="--el-link-font-size: 12px">
      {{ translate('/sign-in.to-register') }}
    </el-link>
  </common-form>
</template>

<script setup lang="ts">
import { signIn, SignInInput } from '@/apis/iam'
import { Schema } from '@/components/form-item'
import { translate } from '@/utils/i18n'
import { setToken } from '@/utils/storage'
import { inputRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
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
  username: inputRules(),
  password: inputRules()
}))

const useSchemas = (): { schemas: Schema[] } => {
  const schemas: Schema[] = [
    {
      tag: 'ElInput',
      tagProps: { prefixIcon: 'User' },
      formItemProps: { prop: 'username' }
    },
    {
      tag: 'ElInput',
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
    ElNotification.success(translate('/sign-in.login-success'))
    setToken(data)
    const redirect = route.query.redirect
    const path = Array.isArray(redirect) ? redirect[0] : redirect
    router.push(decodeURIComponent(path || '/'))
  })
}
</script>
