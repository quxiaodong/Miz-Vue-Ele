<template>
  <Form v-model="model" :loading :form-rules="rules" @submit="submit" />
</template>

<script setup lang="ts">
import { createUser, CreateUserInput } from '@/apis/administrator/user'
import { i18n } from '@/utils/i18n'
import { passwordRules, usernameRules } from '@/utils/validate'
import type { FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Form from './Form.vue'

const initValue = (): CreateUserInput => ({
  username: '',
  password1: '',
  password2: '',
  status: 0
})

const router = useRouter()

const model = ref<CreateUserInput>(initValue())
const rules = reactive<FormRules<CreateUserInput>>({
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
})

const { execute, loading } = createUser()

const submit = () => execute(model.value).then(() => router.back())
</script>
