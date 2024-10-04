<template>
  <span @click="click">{{ $t('common:layout.change-password') }}</span>
  <common-dialog v-model="show" :title="$t('common:layout.change-password')">
    <common-form ref="dom" :model :rules>
      <el-form-item
        prop="password"
        :label="$t('common:layout.current-password')"
      >
        <el-input
          v-model="model.password"
          show-password
          :placeholder="$t('common.please-input')"
        />
      </el-form-item>
      <el-form-item prop="password1" :label="$t('common:layout.new-password')">
        <el-input
          v-model="model.password1"
          show-password
          :placeholder="$t('common.please-input')"
        />
      </el-form-item>
      <el-form-item
        prop="password2"
        :label="$t('common:layout.confirm-password')"
      >
        <el-input
          v-model="model.password2"
          show-password
          :placeholder="$t('common.please-input')"
        />
      </el-form-item>
      <div class="text-right">
        <el-button :loading type="primary" @click="verify">
          {{ $t('common.submit') }}
        </el-button>
      </div>
    </common-form>
  </common-dialog>
</template>

<script setup lang="ts">
import { updateUserPassword, UserPasswordInput } from '@/apis/iam'
import { i18n } from '@/utils/i18n'
import { removeToken } from '@/utils/storage'
import { passwordRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { computed, ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'

const initValue = (): UserPasswordInput => ({
  password: '',
  password1: '',
  password2: ''
})

const router = useRouter()

const dom = useTemplateRef<{ formRef: FormInstance }>('dom')
const model = ref<UserPasswordInput>(initValue())
const rules = computed<FormRules<UserPasswordInput>>(() => ({
  password: [
    { required: true, message: i18n.t('common.please-input'), trigger: 'blur' }
  ],
  password1: passwordRules,
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

const show = ref(false)

const { execute, loading } = updateUserPassword()

const click = () => {
  show.value = true
  model.value = initValue()
}

const verify = () => {
  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(submit)
}

const submit = () => {
  execute(model.value).then(() => {
    ElMessage.success(i18n.t('common:layout.change-password.success'))
    show.value = false
    removeToken()
    router.push('/sign-in')
  })
}
</script>
