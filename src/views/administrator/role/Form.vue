<template>
  <el-card shadow="never" class="!border-0">
    <div class="mx-auto max-w-3xl">
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
import { buildTree } from '@/utils/array-to-tree'
import { navigate } from '@/utils/navigate'
import { inputRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, ref, useTemplateRef } from 'vue'

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

const dom = useTemplateRef<{ formRef: FormInstance }>('dom')
const model = defineModel<Model>({ required: true })
const rules = computed<FormRules<Model>>(() => ({
  name: inputRules(),
  code: inputRules()
}))

const menus = ref<SearchMenuOutput[]>([])
const buttons = ref<SearchButtonOutput[]>([])

const useSchemas = (): { schemas: Schema[] } => {
  searchMenu()
    .execute({ status: [0] })
    .then(({ data }) => (menus.value = data))

  searchButton()
    .execute({ status: [0] })
    .then(({ data }) => (buttons.value = data))

  const auths = computed(() => {
    const nodes = menus.value
      .filter(v => !v.acls)
      .map(v => ({
        ...v,
        buttons: buttons.value.filter(button => button.menuId === v.id)
      }))
    return buildTree(nodes)
  })

  const schemas: Schema[] = [
    {
      colProps: { span: 12, xs: 24 },
      tag: 'ElInput',
      formItemProps: {
        prop: 'name',
        label: '角色名称'
      }
    },
    {
      colProps: { span: 12, xs: 24 },
      tag: 'ElInput',
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
      tag: 'ElSelect',
      formItemProps: {
        prop: 'status',
        label: '角色状态'
      }
    }
  ]

  return { schemas }
}

const { schemas } = useSchemas()

const cancel = () => navigate.back({ link: '/administrator/role' })

const verify = () => {
  model.value.menuIDs = model.value.menuIDs?.filter(id =>
    menus.value.find(v => v.id === id)
  )
  model.value.buttonIDs = model.value.buttonIDs?.filter(id => {
    const button = buttons.value.find(v => v.id === id)
    if (!button) return false
    return model.value.menuIDs?.includes(button.menuId)
  })

  const menuSet = new Set(model.value.menuIDs)
  const buttonSet = new Set(model.value.buttonIDs)

  const menuList = menus.value.filter(v => menuSet.has(v.id))
  const buttonList = buttons.value.filter(v => buttonSet.has(v.id))

  menuList.forEach(menu => {
    if (!menu.acls) return
    const button = buttonList.find(v => menu.acls?.includes(v.code))
    if (button) {
      menuSet.add(menu.id)
    } else {
      menuSet.delete(menu.id)
    }
  })

  model.value.menuIDs = Array.from(menuSet)
  model.value.buttonIDs = Array.from(buttonSet)

  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(() => emits('submit'))
}
</script>
