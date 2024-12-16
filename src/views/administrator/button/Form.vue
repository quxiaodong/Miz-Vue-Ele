<template>
  <common-form ref="dom" :model :rules>
    <el-form-item prop="name" label="按钮名称">
      <el-input v-model="model.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item prop="code" label="按钮代码">
      <el-input v-model="model.code" placeholder="请输入" />
    </el-form-item>
    <el-form-item prop="menuId" label="所属菜单">
      <el-select v-model="model.menuId" placeholder="请选择">
        <el-option
          v-for="item in menuList"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        />
      </el-select>
    </el-form-item>
    <el-form-item prop="status" label="按钮状态">
      <el-select v-model="model.status" placeholder="请选择">
        <el-option :value="0" label="启用" />
        <el-option :value="1" label="禁用" />
      </el-select>
    </el-form-item>
    <div class="text-right">
      <el-button type="primary" :loading @click="verify">提交</el-button>
    </div>
  </common-form>
</template>

<script setup lang="ts">
import {
  CreateButtonInput,
  UpdateButtonInput
} from '@/apis/administrator/button'
import { searchMenu, SearchMenuOutput } from '@/apis/administrator/menu'
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref, useTemplateRef } from 'vue'

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
const rules = reactive<FormRules<Model>>({
  name: [{ required: true, message: '请输入', trigger: 'blur' }],
  code: [{ required: true, message: '请输入', trigger: 'blur' }],
  menuId: [{ required: true, message: '请选择', trigger: 'change' }]
})

const menuList = ref<SearchMenuOutput[]>([])

searchMenu()
  .execute({})
  .then(({ data }) => (menuList.value = data))

const verify = () => {
  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(() => emits('submit'))
}
</script>
