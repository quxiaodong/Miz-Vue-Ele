<template>
  <el-form ref="dom" :model :rules>
    <el-form-item prop="username">
      <el-input
        v-model="model.username"
        prefix-icon="User"
        :placeholder="$t('common.please-input')"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="model.password"
        show-password
        prefix-icon="Lock"
        :placeholder="$t('common.please-input')"
      />
    </el-form-item>
    <el-button :loading type="primary" class="w-full" @click="verify">
      {{ $t('/sign-in.login') }}
    </el-button>
    <el-link href="#/sign-up" style="--el-link-font-size: 12px">
      {{ $t('/sign-in.to-register') }}
    </el-link>
  </el-form>
</template>

<script setup lang="ts">
import { signIn, SignInInput } from '@/apis/iam'
import { i18n } from '@/utils/i18n'
import { setToken } from '@/utils/storage'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { computed, reactive, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const dom = useTemplateRef<FormInstance>('dom')
const model = reactive<SignInInput>({
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

const { execute, loading } = signIn()

const verify = () => {
  if (!dom.value) return
  dom.value.validate().then(submit)
}

const submit = () => {
  execute(model).then(({ data }) => {
    ElMessage.success(i18n.t('/sign-in.login-success'))
    setToken(data)
    const redirect = route.query.redirect
    const path = Array.isArray(redirect) ? redirect[0] : redirect
    router.push(decodeURIComponent(path || '/'))
  })
}
</script>
