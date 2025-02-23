<template>
  <Form v-model="model" :loading @submit="submit" />
</template>

<script setup lang="ts">
import {
  detailLocale,
  SearchLocaleOutput,
  updateLocale,
  UpdateLocaleInput
} from '@/apis/language/locale'
import { ref } from 'vue'
import Form from './Form.vue'

type Props = {
  row: SearchLocaleOutput
}

type Emits = {
  (e: 'refresh'): void
}

const { row } = defineProps<Props>()

const emits = defineEmits<Emits>()

const model = ref<UpdateLocaleInput>({})

const { execute, loading } = updateLocale(row.id)

detailLocale(row.id)
  .execute()
  .then(({ data }) => (model.value = data))

const submit = () => execute(model.value).then(() => emits('refresh'))
</script>
