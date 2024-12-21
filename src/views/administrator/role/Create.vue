<template>
  <Form v-model="model" :loading @submit="submit" />
</template>

<script setup lang="ts">
import { createRole, CreateRoleInput } from '@/apis/administrator/role'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Form from './Form.vue'

const initValue = (): CreateRoleInput => ({
  name: '',
  code: '',
  status: 0
})

const router = useRouter()

const model = ref<CreateRoleInput>(initValue())

const { execute, loading } = createRole()

const submit = () => execute(model.value).then(() => router.back())
</script>
