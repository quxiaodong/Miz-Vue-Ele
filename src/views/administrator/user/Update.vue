<template>
  <Form v-model="model" :loading :form-rules="rules" @submit="submit" />
</template>

<script setup lang="ts">
import {
  detailUser,
  updateUser,
  UpdateUserInput
} from '@/apis/administrator/user'
import { usernameRules } from '@/utils/validate'
import type { FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Form from './Form.vue'

type Props = {
  id: string
}

const { id } = defineProps<Props>()

const router = useRouter()

const model = ref<UpdateUserInput>({})
const rules = reactive<FormRules<UpdateUserInput>>({
  username: usernameRules
})

const { execute, loading } = updateUser(id)

detailUser(id)
  .execute()
  .then(({ data }) => (model.value = data))

const submit = () => execute(model.value).then(() => router.back())
</script>
