<template>
  <el-card shadow="never" class="!border-0">
    <div class="max-w-3xl mx-auto">
      <common-form ref="dom" v-model="model" :rules :schemas>
        <div class="text-right">
          <widget-cancel @click="cancel" />
          <widget-submit :loading @click="verify" />
        </div>
      </common-form>
    </div>
  </el-card>
</template>

<script setup lang="tsx">
import { searchButton, SearchButtonOutput } from '@/apis/administrator/button'
import { searchMenu, SearchMenuOutput } from '@/apis/administrator/menu'
import { CreateRoleInput, UpdateRoleInput } from '@/apis/administrator/role'
import { Schema } from '@/components/form-item'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, reactive, ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'

type Auth = SearchMenuOutput & {
  children: SearchMenuOutput[]
  buttons: SearchButtonOutput[]
}

type Model = CreateRoleInput | UpdateRoleInput

type Props = {
  loading: boolean
}

type Emits = {
  (e: 'submit'): void
}

const { loading } = defineProps<Props>()

const emits = defineEmits<Emits>()

const router = useRouter()

const dom = useTemplateRef<{ formRef: FormInstance }>('dom')
const model = defineModel<Model>({ required: true })
const rules = reactive<FormRules<Model>>({
  name: [{ required: true, message: '请输入', trigger: 'blur' }],
  code: [{ required: true, message: '请输入', trigger: 'blur' }]
})

const useSchemas = (): { schemas: Schema[] } => {
  const menus = ref<SearchMenuOutput[]>([])

  searchMenu()
    .execute({})
    .then(({ data }) => (menus.value = data))

  const buttons = ref<SearchButtonOutput[]>([])

  searchButton()
    .execute({})
    .then(({ data }) => (buttons.value = data))

  const auths = computed(() =>
    menus.value
      .map(v => ({
        ...v,
        buttons: buttons.value.filter(button => button.menuId === v.id)
      }))
      .map((v, _, array) => {
        ;(v as Auth).children = array.filter(menu => menu.parentId === v.id)
        return v
      })
      .filter(v => !v.parentId)
  )

  const schemas: Schema[] = [
    {
      colProps: { span: 12, xs: 24 },
      tag: 'el-input',
      formItemProps: {
        prop: 'name',
        label: '角色名称'
      }
    },
    {
      colProps: { span: 12, xs: 24 },
      tag: 'el-input',
      formItemProps: {
        prop: 'code',
        label: '角色代码'
      }
    },
    {
      formItemProps: {
        prop: 'roleIds',
        label: '角色权限'
      },
      component: () => {
        const toggleMenu = (id: string) => {
          if (model.value.menuIDs?.includes(id)) {
            model.value.menuIDs = model.value.menuIDs.filter(v => v !== id)
          } else {
            model.value.menuIDs = [...(model.value.menuIDs ?? []), id]
          }
        }

        const toggleButton = (id: string) => {
          if (model.value.buttonIDs?.includes(id)) {
            model.value.buttonIDs = model.value.buttonIDs.filter(v => v !== id)
          } else {
            model.value.buttonIDs = [...(model.value.buttonIDs ?? []), id]
          }
        }

        return (
          <el-table
            data={auths.value}
            border
            default-expand-all
            show-header={false}
            row-key="id"
            size="small"
            style="--el-table-tr-bg-color: unset"
          >
            <el-table-column>
              {{
                default: ({ row: { id, name } }: { row: Auth }) => (
                  <el-checkbox
                    value={id}
                    label={name}
                    model-value={model.value.menuIDs?.includes(id)}
                    onChange={() => toggleMenu(id)}
                  />
                )
              }}
            </el-table-column>
            <el-table-column>
              {{
                default: ({ row: { buttons } }: { row: Auth }) =>
                  buttons.map(({ id, name }) => (
                    <el-checkbox
                      key={id}
                      value={id}
                      label={name}
                      model-value={model.value.buttonIDs?.includes(id)}
                      onChange={() => toggleButton(id)}
                    />
                  ))
              }}
            </el-table-column>
          </el-table>
        )
      }
    },
    {
      tag: 'el-select',
      formItemProps: {
        prop: 'status',
        label: '角色状态'
      }
    }
  ]

  return { schemas }
}

const { schemas } = useSchemas()

const cancel = () => router.back()

const verify = () => {
  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(() => emits('submit'))
}
</script>
