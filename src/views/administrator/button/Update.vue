<template>
  <div>
    <widget-update @click="click" />
    <common-dialog v-model="show" title="编辑">
      <Form v-model="model" :loading @submit="submit" />
    </common-dialog>
  </div>
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

const show = ref(false)
const model = ref<UpdateButtonInput>({})

const { execute, loading } = updateButton(row.id)

const click = () => {
  show.value = true

  detailButton(row.id)
    .execute()
    .then(({ data }) => (model.value = data))
}

const submit = () =>
  execute(model.value).then(() => {
    show.value = false
    emits('refresh')
  })
</script>
