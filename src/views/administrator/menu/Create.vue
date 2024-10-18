<template>
  <Form v-model="model" :loading :parent-list @submit="submit" />
</template>

<script setup lang="ts">
import {
  createMenu,
  CreateMenuInput,
  searchMenu,
  SearchMenuOutput
} from '@/apis/administrator/menu'
import { ref } from 'vue'
import Form from './Form.vue'

type Props = {
  parentId?: string
}

type Emits = {
  (e: 'refresh'): void
}

const { parentId } = defineProps<Props>()

const emits = defineEmits<Emits>()

const initValue = (): CreateMenuInput => ({
  parentId,
  name: '',
  path: '',
  status: 0
})

const model = ref<CreateMenuInput>(initValue())
const parentList = ref<SearchMenuOutput[]>([])

const { execute, loading } = createMenu()

searchMenu()
  .execute({})
  .then(({ data }) => (parentList.value = data))

const submit = () => execute(model.value).then(() => emits('refresh'))
</script>
