<template>
  <Form v-model="model" :loading :parent-list @submit="submit" />
</template>

<script setup lang="ts">
import {
  detailMenu,
  searchMenu,
  SearchMenuOutput,
  updateMenu,
  UpdateMenuInput
} from '@/apis/administrator/menu'
import { ref } from 'vue'
import Form from './Form.vue'

type Props = {
  row: SearchMenuOutput
}

type Emits = {
  (e: 'refresh'): void
}

const { row } = defineProps<Props>()

const emits = defineEmits<Emits>()

const model = ref<UpdateMenuInput>({})
const parentList = ref<SearchMenuOutput[]>([])

const { execute, loading } = updateMenu(row.id)

detailMenu(row.id)
  .execute()
  .then(({ data }) => (model.value = data))

searchMenu()
  .execute({})
  .then(
    ({ data }) =>
      (parentList.value = data.filter(
        v => v.id !== row.id && v.parentId !== row.id
      ))
  )

const submit = () => execute(model.value).then(() => emits('refresh'))
</script>
