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
import { CommonIcons } from '@/components/common-icon'
import { Schema } from '@/components/form-item'
import { buildTree } from '@/utils/array-to-tree'
import { translate } from '@/utils/i18n'
import { inputRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, ComputedRef, h, useTemplateRef } from 'vue'

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

const useSchemas = (): { schemas: ComputedRef<Schema[]> } => {
  const schemas: ComputedRef<Schema[]> = computed(() => [
    {
      colProps: { span: 12, xs: 24 },
      tag: 'ElInput',
      formItemProps: {
        prop: 'name',
        label: '菜单名称'
      }
    },
    {
      colProps: { span: 12, xs: 24 },
      tag: 'ElInput',
      formItemProps: {
        prop: 'path',
        label: '路由地址'
      }
    },
    {
      colProps: { span: 12, xs: 24 },
      tag: 'ElInput',
      formItemProps: {
        prop: 'component',
        label: '页面文件'
      }
    },
    {
      colProps: { span: 12, xs: 24 },
      tag: 'ElInput',
      formItemProps: {
        prop: 'link',
        label: '外部链接'
      }
    },
    {
      colProps: { span: 12, xs: 24 },
      tag: 'ElTreeSelect',
      tagProps: {
        value: model.value.parentId,
        data: buildTree(
          parentList.map(({ id, name, parentId, sort }) => ({
            id,
            parentId,
            sort,
            value: id,
            label: name
          }))
        ),
        checkStrictly: true,
        filterable: true,
        clearable: true,
        onClear: () => (model.value.parentId = null)
      },
      formItemProps: {
        prop: 'parentId',
        label: '父级菜单'
      }
    },
    {
      colProps: { span: 12, xs: 24 },
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
                  placeholder={translate('common.please-select')}
                  onClear={() => (model.value.icon = null)}
                >
                  {{
                    prefix: () =>
                      model.value.icon && (
                        <el-icon size="20">
                          {h(
                            CommonIcons[
                              model.value.icon as keyof typeof CommonIcons
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
                {Object.values(CommonIcons).map(({ name }) => (
                  <el-icon
                    size="20"
                    color={
                      model.value.icon === name
                        ? 'var(--el-color-primary)'
                        : '#909399'
                    }
                    class="cursor-pointer"
                    onClick={() => (model.value.icon = name)}
                  >
                    {h(CommonIcons[name as keyof typeof CommonIcons])}
                  </el-icon>
                ))}
              </el-space>
            )
          }}
        </el-popover>
      )
    },
    {
      colProps: { span: 12, xs: 24 },
      tag: 'ElInput',
      formItemProps: {
        prop: 'acls',
        label: '权限标识'
      }
    },
    {
      colProps: { span: 12, xs: 24 },
      tag: 'ElInput',
      formItemProps: {
        prop: 'stem',
        label: '翻译标识'
      }
    },
    {
      colProps: { span: 12, xs: 24 },
      tag: 'ElInput',
      tagProps: {
        formatter: (value: string) => value.replace(/[^0-9]/g, ''),
        parser: (value: string) => value.replace(/[^0-9]/g, '')
      },
      formItemProps: {
        prop: 'sort',
        label: '菜单排序'
      }
    },
    {
      colProps: { span: 12, xs: 24 },
      tag: 'ElSelect',
      formItemProps: {
        prop: 'status',
        label: '菜单状态'
      }
    },
    {
      component: () => <el-divider>其他设置</el-divider>
    },
    {
      colProps: { span: 8, xs: 12 },
      tag: 'ElSwitch',
      formItemProps: {
        prop: 'hideInMenu',
        label: '隐藏菜单',
        labelPosition: 'left'
      }
    },
    {
      colProps: { span: 8, xs: 12 },
      tag: 'ElSwitch',
      formItemProps: {
        prop: 'cache',
        label: '缓存页面',
        labelPosition: 'left'
      }
    },
    {
      colProps: { span: 8, xs: 12 },
      tag: 'ElSwitch',
      formItemProps: {
        prop: 'embed',
        label: '是否内嵌',
        labelPosition: 'left'
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
