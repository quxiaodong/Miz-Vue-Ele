<template>
  <common-form ref="dom" v-model="model" :rules :schemas>
    <div class="text-right">
      <widget-submit :loading @click="verify" />
    </div>
  </common-form>
</template>

<script setup lang="tsx">
import {
  CreateButtonInput,
  UpdateButtonInput
} from '@/apis/administrator/button'
import { searchMenu, SearchMenuOutput } from '@/apis/administrator/menu'
import { Schema } from '@/components/form-item'
import { buildTree } from '@/utils/array-to-tree'
import { inputRules, selectRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, ComputedRef, ref, useTemplateRef } from 'vue'

type Model = CreateButtonInput | UpdateButtonInput

type Props = {
  loading: boolean
}

type Emits = {
  (e: 'submit'): void
}

const { loading } = defineProps<Props>()

const emits = defineEmits<Emits>()

const dom = useTemplateRef<{ formRef: FormInstance }>('dom')
const model = defineModel<Model>({ required: true })
const rules = computed<FormRules<Model>>(() => ({
  name: inputRules(),
  code: inputRules(),
  menuId: selectRules()
}))

const useSchemas = (): { schemas: ComputedRef<Schema[]> } => {
  const menus = ref<SearchMenuOutput[]>([])

  searchMenu()
    .execute({})
    .then(({ data }) => (menus.value = data))

  const schemas: ComputedRef<Schema[]> = computed(() => [
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'name',
        label: '按钮名称'
      }
    },
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'code',
        label: '按钮代码'
      }
    },
    {
      tag: 'ElTreeSelect',
      tagProps: {
        value: model.value.menuId,
        data: buildTree(
          menus.value.map(({ id, name, parentId, sort }) => ({
            id,
            parentId,
            sort,
            value: id,
            label: name
          }))
        ),
        checkStrictly: true,
        filterable: true
      },
      formItemProps: {
        prop: 'menuId',
        label: '所属菜单'
      }
    },
    {
      tag: 'ElSelect',
      formItemProps: {
        prop: 'status',
        label: '按钮状态'
      }
    }
  ])

  return { schemas }
}

const { schemas } = useSchemas()

const verify = () => {
  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(() => emits('submit'))
}
</script>
