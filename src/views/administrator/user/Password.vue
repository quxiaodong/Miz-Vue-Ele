<template>
  <div>
    <el-link type="primary" :underline="false" @click="click">修改密码</el-link>
    <common-dialog v-model="show" title="修改密码">
      <common-form ref="dom" :model :rules>
        <el-form-item prop="password1" label="新的密码">
          <el-input
            v-model="model.password1"
            show-password
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item prop="password2" label="确认密码">
          <el-input
            v-model="model.password2"
            show-password
            placeholder="请输入"
          />
        </el-form-item>
        <div class="text-right">
          <el-button type="primary" :loading @click="verify">提交</el-button>
        </div>
      </common-form>
    </common-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  passwordUser,
  PasswordUserInput,
  SearchUserOutput
} from '@/apis/administrator/user'
import { i18n } from '@/utils/i18n'
import { passwordRules } from '@/utils/validate'
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref, useTemplateRef } from 'vue'

type Props = {
  row: SearchUserOutput
}

const { row } = defineProps<Props>()

const initValue = (): PasswordUserInput => ({
  id: row.id,
  password1: '',
  password2: ''
})

const show = ref(false)

const dom = useTemplateRef<{ formRef: FormInstance }>('dom')
const model = ref<PasswordUserInput>(initValue())
const rules = reactive<FormRules<PasswordUserInput>>({
  password1: passwordRules,
  password2: [
    { required: true, message: i18n.t('common.please-input'), trigger: 'blur' },
    {
      validator: (_, value: string, callback) => {
        if (model.value.password1 !== value) {
          callback(i18n.t('common:validate.password2-not-equal'))
        }
        callback()
      },
      trigger: 'blur'
    }
  ]
})

const { execute, loading } = passwordUser()

const click = () => {
  show.value = true
  model.value = initValue()
}

const verify = () => {
  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(submit)
}

const submit = () => execute(model.value).then(() => (show.value = false))
</script>
