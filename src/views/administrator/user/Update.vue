<template>
  <Form v-model="model" :loading :form-rules="rules" @submit="submit" />
</template>

<script setup lang="ts">
import {
  detailUser,
  updateUser,
  UpdateUserInput
} from '@/apis/administrator/user'
import { setTabName } from '@/components/common-layout/stores/tab'
import { usernameRules } from '@/utils/validate'
import type { FormRules } from 'element-plus'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Form from './Form.vue'

const route = useRoute()
const router = useRouter()

const id = route.params.id as string

const model = ref<UpdateUserInput>({})
const rules = computed<FormRules<UpdateUserInput>>(() => ({
  username: usernameRules()
}))

const { execute, loading } = updateUser(id)

detailUser(id)
  .execute()
  .then(({ data }) => {
    model.value = data
    setTabName(route.path, data.username)
  })

const submit = () => execute(model.value).then(() => router.back())
</script>
