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
import { useRoute, useRouter } from 'vue-router'
import Form from './Form.vue'

const route = useRoute()
const router = useRouter()

const id = route.query.id as string

const model = ref<UpdateRoleInput>({})

const { execute, loading } = updateRole(id)

detailRole(id)
  .execute()
  .then(({ data }) => (model.value = data))

const submit = () => execute(model.value).then(() => router.back())
</script>
