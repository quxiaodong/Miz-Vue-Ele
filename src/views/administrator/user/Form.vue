<template>
  <el-card shadow="never" class="!border-0">
    <common-form ref="dom" :model :rules class="max-w-3xl mx-auto">
      <el-row :gutter="20">
        <el-col :span="12" :xs="24">
          <el-form-item prop="username" label="登录账号">
            <el-input v-model="model.username" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item prop="nickname" label="用户昵称">
            <el-input v-model="model.nickname" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-if="rules.password1" :span="12" :xs="24">
          <el-form-item prop="password1" label="登录密码">
            <el-input
              v-model="(model as CreateUserInput).password1"
              show-password
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="rules.password2" :span="12" :xs="24">
          <el-form-item prop="password2" label="确认密码">
            <el-input
              v-model="(model as CreateUserInput).password2"
              show-password
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item prop="phone" label="联系方式">
            <el-input v-model="model.phone" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item prop="email" label="邮箱地址">
            <el-input v-model="model.email" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item prop="roleId" label="所属角色">
            <el-select v-model="model.roleId" placeholder="请选择">
              <el-option
                v-for="item in roles"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item prop="status" label="用户状态">
            <el-select v-model="model.status" placeholder="请选择">
              <el-option :value="0" label="启用" />
              <el-option :value="1" label="禁用" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="remark" label="备注信息">
        <el-input v-model="model.remark" type="textarea" placeholder="请输入" />
      </el-form-item>
      <div class="text-right">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" :loading @click="verify">提交</el-button>
      </div>
    </common-form>
  </el-card>
</template>

<script setup lang="ts">
import { searchRole, SearchRoleOutput } from '@/apis/administrator/role'
import { CreateUserInput, UpdateUserInput } from '@/apis/administrator/user'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'

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

const router = useRouter()

const dom = useTemplateRef<{ formRef: FormInstance }>('dom')
const model = defineModel<Model>({ required: true })
const rules = computed<FormRules<Model>>(() =>
  Object.assign(
    {
      email: [{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }]
    },
    formRules
  )
)

const roles = ref<SearchRoleOutput[]>([])

searchRole()
  .execute({})
  .then(({ data }) => (roles.value = data))

const cancel = () => router.back()

const verify = () => {
  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(() => emits('submit'))
}
</script>
