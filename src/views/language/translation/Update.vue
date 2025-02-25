<template>
  <Form v-model="model" :loading @submit="submit" />
</template>

<script setup lang="ts">
import {
  detailTranslation,
  SearchTranslationOutput,
  updateTranslation,
  UpdateTranslationInput
} from '@/apis/language/translation'
import { ref } from 'vue'
import Form from './Form.vue'

type Props = {
  row: SearchTranslationOutput
}

type Emits = {
  (e: 'refresh'): void
}

const { row } = defineProps<Props>()

const emits = defineEmits<Emits>()

const model = ref<UpdateTranslationInput>({})

const { execute, loading } = updateTranslation(row.id)

detailTranslation(row.id)
  .execute()
  .then(({ data }) => (model.value = data))

const submit = () => execute(model.value).then(() => emits('refresh'))
</script>
