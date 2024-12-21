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
import { searchRole } from '@/apis/administrator/role'
import { CreateUserInput, UpdateUserInput } from '@/apis/administrator/user'
import { Schema } from '@/components/form-item'
import { navigate } from '@/utils/navigate'
import { emailRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, useTemplateRef } from 'vue'

type Model = CreateUserInput | UpdateUserInput

type Props = {
  loading: boolean
  formRules: FormRules<Model>
}

type Emits = {
  (e: 'submit'): void
}

const { loading, formRules } = defineProps<Props>()

const emits = defineEmits<Emits>()

const dom = useTemplateRef<{ formRef: FormInstance }>('dom')
const model = defineModel<Model>({ required: true })
const rules = computed<FormRules<Model>>(() =>
  Object.assign(
    {
      email: emailRules()
    },
    formRules
  )
)

const useSchemas = (): { schemas: Schema[] } => {
  const schemas: Schema[] = [
    {
      colProps: { span: 12, xs: 24 },
      tag: 'el-input',
      formItemProps: {
        prop: 'username',
        label: '登录账号'
      }
    },
    {
      colProps: { span: 12, xs: 24 },
      tag: 'el-input',
      formItemProps: {
        prop: 'nickname',
        label: '用户昵称'
      }
    }
  ]

  if (rules.value.password1) {
    schemas.push({
      colProps: { span: 12, xs: 24 },
      tag: 'el-input',
      tagProps: { showPassword: true },
      formItemProps: {
        prop: 'password1',
        label: '登录密码'
      }
    })
  }

  if (rules.value.password2) {
    schemas.push({
      colProps: { span: 12, xs: 24 },
      tag: 'el-input',
      tagProps: { showPassword: true },
      formItemProps: {
        prop: 'password2',
        label: '确认密码'
      }
    })
  }

  schemas.push(
    {
      colProps: { span: 12, xs: 24 },
      tag: 'el-input',
      formItemProps: {
        prop: 'phone',
        label: '联系方式'
      }
    },
    {
      colProps: { span: 12, xs: 24 },
      tag: 'el-input',
      formItemProps: {
        prop: 'email',
        label: '邮箱地址'
      }
    },
    {
      colProps: { span: 12, xs: 24 },
      tag: 'el-select',
      tagProps: {
        clearable: true,
        onClear: () => (model.value.roleId = null)
      },
      formItemProps: {
        prop: 'roleId',
        label: '所属角色'
      },
      fetchOptions: () =>
        searchRole()
          .execute({})
          .then(({ data }) =>
            data.map(({ id, name }) => ({ value: id, label: name }))
          )
    },
    {
      colProps: { span: 12, xs: 24 },
      tag: 'el-select',
      formItemProps: {
        prop: 'status',
        label: '用户状态'
      }
    },
    {
      tag: 'el-input',
      tagProps: { type: 'textarea' },
      formItemProps: {
        prop: 'remark',
        label: '备注信息'
      }
    }
  )

  return { schemas }
}

const { schemas } = useSchemas()

const cancel = () => navigate.back({ link: '/administrator/user' })

const verify = () => {
  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(() => emits('submit'))
}
</script>
