<template>
  <div v-acl="[Permission.Create]">
    <widget-create @click="click" />
    <common-dialog v-model="show" type="create">
      <Form v-model="model" :loading :parent-list @submit="submit" />
    </common-dialog>
  </div>
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
import { Permission } from './permission'

type Emits = {
  (e: 'refresh'): void
}

const emits = defineEmits<Emits>()

const initValue = (): CreateMenuInput => ({
  name: '',
  path: '',
  status: 0
})

const show = ref(false)
const model = ref<CreateMenuInput>(initValue())
const parentList = ref<SearchMenuOutput[]>([])

const { execute, loading } = createMenu()

const click = () => {
  show.value = true
  model.value = initValue()

  searchMenu()
    .execute({})
    .then(({ data }) => (parentList.value = data))
}

const submit = () =>
  execute(model.value).then(() => {
    show.value = false
    emits('refresh')
  })
</script>
