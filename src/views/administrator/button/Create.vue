<template>
  <div v-acl="[Permission.Create]">
    <widget-create @click="click" />
    <common-dialog v-model="show" type="create">
      <Form v-model="model" :loading @submit="submit" />
    </common-dialog>
  </div>
</template>

<script setup lang="ts">
import { createButton, CreateButtonInput } from '@/apis/administrator/button'
import { ref } from 'vue'
import Form from './Form.vue'
import { Permission } from './permission'

type Emits = {
  (e: 'refresh'): void
}

const emits = defineEmits<Emits>()

const initValue = (): CreateButtonInput => ({
  name: '',
  code: '',
  menuId: '',
  status: 0
})

const show = ref(false)
const model = ref<CreateButtonInput>(initValue())

const { execute, loading } = createButton()

const click = () => {
  show.value = true
  model.value = initValue()
}

const submit = () =>
  execute(model.value).then(() => {
    show.value = false
    emits('refresh')
  })
</script>
