<template>
  <div>
    <widget-update @click="click" />
    <common-dialog v-model="show" title="编辑">
      <Form v-model="model" :loading :parent-list @submit="submit" />
    </common-dialog>
  </div>
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

const show = ref(false)
const model = ref<UpdateMenuInput>({})
const parentList = ref<SearchMenuOutput[]>([])

const { execute, loading } = updateMenu(row.id)

const click = () => {
  show.value = true

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
}

const submit = () =>
  execute(model.value).then(() => {
    show.value = false
    emits('refresh')
  })
</script>
