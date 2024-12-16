<template>
  <Form v-model="model" :loading @submit="submit" />
</template>

<script setup lang="ts">
import {
  detailButton,
  SearchButtonOutput,
  updateButton,
  UpdateButtonInput
} from '@/apis/administrator/button'
import { ref } from 'vue'
import Form from './Form.vue'

type Props = {
  row: SearchButtonOutput
}

type Emits = {
  (e: 'refresh'): void
}

const { row } = defineProps<Props>()

const emits = defineEmits<Emits>()

const model = ref<UpdateButtonInput>({})

const { execute, loading } = updateButton(row.id)

detailButton(row.id)
  .execute()
  .then(({ data }) => (model.value = data))

const submit = () => execute(model.value).then(() => emits('refresh'))
</script>
