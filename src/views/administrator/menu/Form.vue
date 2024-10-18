<template>
  <common-form ref="dom" v-model="model" :rules :schemas>
    <div class="text-right">
      <widget-submit :loading @click="verify" />
    </div>
  </common-form>
</template>

<script setup lang="tsx">
import {
  CreateMenuInput,
  SearchMenuOutput,
  UpdateMenuInput
} from '@/apis/administrator/menu'
import { Schema } from '@/components/form-item'
import { inputRules } from '@/utils/validate'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, h, useTemplateRef } from 'vue'

type Model = CreateMenuInput | UpdateMenuInput

type Props = {
  loading: boolean
  parentList: SearchMenuOutput[]
}

type Emits = {
  (e: 'submit'): void
}

const { loading, parentList } = defineProps<Props>()

const emits = defineEmits<Emits>()

const dom = useTemplateRef<{ formRef: FormInstance }>('dom')
const model = defineModel<Model>({ required: true })
const rules = computed<FormRules<Model>>(() => ({
  name: inputRules(),
  path: inputRules()
}))

const useSchemas = (): { schemas: Schema[] } => {
  const schemas: Schema[] = [
    {
      tag: 'el-input',
      formItemProps: {
        prop: 'name',
        label: '菜单名称'
      }
    },
    {
      tag: 'el-input',
      formItemProps: {
        prop: 'path',
        label: '菜单路径'
      }
    },
    {
      formItemProps: {
        prop: 'icon',
        label: '菜单图标'
      },
      component: () => (
        <el-popover teleported={false} trigger="click" popper-class="!w-full">
          {{
            reference: () => (
              <div class="w-full">
                <el-input
                  modelValue={model.value.icon}
                  clearable
                  placeholder="请选择"
                  onClear={() => (model.value.icon = null)}
                >
                  {{
                    prefix: () =>
                      model.value.icon && (
                        <el-icon size="20">
                          {h(
                            ElementPlusIconsVue[
                              model.value
                                .icon as keyof typeof ElementPlusIconsVue
                            ]
                          )}
                        </el-icon>
                      )
                  }}
                </el-input>
              </div>
            ),
            default: () => (
              <el-space wrap class="h-28 overflow-auto">
                {Object.values(ElementPlusIconsVue).map(({ name }) => (
                  <el-icon
                    size="20"
                    color={model.value.icon === name ? '#409EFF' : '#909399'}
                    class="cursor-pointer"
                    onClick={() => (model.value.icon = name)}
                  >
                    {h(
                      ElementPlusIconsVue[
                        name as keyof typeof ElementPlusIconsVue
                      ]
                    )}
                  </el-icon>
                ))}
              </el-space>
            )
          }}
        </el-popover>
      )
    },
    {
      tag: 'el-select',
      tagProps: {
        clearable: true,
        onClear: () => (model.value.parentId = null)
      },
      formItemProps: {
        prop: 'parentId',
        label: '父级菜单'
      },
      options: computed(() =>
        parentList.map(({ id, name }) => ({ value: id, label: name }))
      )
    },
    {
      tag: 'el-select',
      formItemProps: {
        prop: 'status',
        label: '菜单状态'
      }
    }
  ]

  return { schemas }
}

const { schemas } = useSchemas()

const verify = () => {
  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(() => emits('submit'))
}
</script>
