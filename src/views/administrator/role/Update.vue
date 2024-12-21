<template>
  <Form v-model="model" :loading @submit="submit" />
</template>

<script setup lang="ts">
import {
  detailRole,
  updateRole,
  UpdateRoleInput
} from '@/apis/administrator/role'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Form from './Form.vue'

type Props = {
  id: string
}

const { id } = defineProps<Props>()

const router = useRouter()

const model = ref<UpdateRoleInput>({})

const { execute, loading } = updateRole(id)

detailRole(id)
  .execute()
  .then(({ data }) => (model.value = data))

const submit = () => execute(model.value).then(() => router.back())
</script>
