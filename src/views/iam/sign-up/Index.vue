<template>
  <el-form ref="dom" :model :rules>
    <el-form-item prop="username">
      <el-input
        v-model="model.username"
        prefix-icon="User"
        :placeholder="$t('common.please-input')"
      />
    </el-form-item>
    <el-form-item prop="password1">
      <el-input
        v-model="model.password1"
        show-password
        prefix-icon="Lock"
        :placeholder="$t('common.please-input')"
      />
    </el-form-item>
    <el-form-item prop="password2">
      <el-input
        v-model="model.password2"
        show-password
        prefix-icon="Lock"
        :placeholder="$t('common.please-input')"
      />
    </el-form-item>
    <el-button :loading type="primary" class="w-full" @click="verify">
      {{ $t('/sign-up.register') }}
    </el-button>
    <el-link href="#/sign-in" style="--el-link-font-size: 12px">
      {{ $t('/sign-up.to-login') }}
    </el-link>
  </el-form>
</template>

<script setup lang="ts">
import { signUp, SignUpInput } from '@/apis/iam'
import { i18n } from '@/utils/i18n'
import { passwordRules, usernameRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { computed, reactive, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const dom = useTemplateRef<FormInstance>('dom')
const model = reactive<SignUpInput>({
  username: '',
  password1: '',
  password2: ''
})
const rules = computed<FormRules<SignUpInput>>(() => ({
  username: usernameRules,
  password1: passwordRules,
  password2: [
    { required: true, message: i18n.t('common.please-input'), trigger: 'blur' },
    {
      validator: (_, value: string, callback) => {
        if (model.password1 !== value) {
          callback(i18n.t('common:validate.password2-not-equal'))
        }
        callback()
      },
      trigger: 'blur'
    }
  ]
}))

const { execute, loading } = signUp()

const verify = () => {
  if (!dom.value) return
  dom.value.validate().then(submit)
}

const submit = () => {
  execute(model).then(() => {
    ElMessage.success(i18n.t('/sign-up.register-success'))
    router.push('/sign-in')
  })
}
</script>
