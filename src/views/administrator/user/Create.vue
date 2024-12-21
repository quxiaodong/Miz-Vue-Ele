<template>
  <Form v-model="model" :loading :form-rules="rules" @submit="submit" />
</template>

<script setup lang="ts">
import { createUser, CreateUserInput } from '@/apis/administrator/user'
import { translate } from '@/utils/i18n'
import { inputRules, passwordRules, usernameRules } from '@/utils/validate'
import type { FormRules } from 'element-plus'
import { computed, ref } from 'vue'
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
const rules = computed<FormRules<CreateUserInput>>(() => ({
  username: usernameRules(),
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

const { execute, loading } = createUser()

const submit = () => execute(model.value).then(() => router.back())
</script>
