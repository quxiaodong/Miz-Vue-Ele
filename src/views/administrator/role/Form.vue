<template>
  <el-card shadow="never" class="!border-0">
    <common-form ref="dom" :model :rules class="max-w-3xl mx-auto">
      <el-row :gutter="20">
        <el-col :span="12" :xs="24">
          <el-form-item prop="name" label="角色名称">
            <el-input v-model="model.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item prop="code" label="角色代码">
            <el-input v-model="model.code" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="角色权限">
        <el-table
          :data="auths"
          row-key="id"
          size="small"
          border
          default-expand-all
          :show-header="false"
          style="--el-table-tr-bg-color: unset"
        >
          <el-table-column>
            <template #default="{ row: { id, name } }">
              <el-checkbox
                :value="id"
                :label="name"
                :model-value="model.menuIDs?.includes(id)"
                @change="toggleMenu(id)"
              />
            </template>
          </el-table-column>
          <el-table-column>
            <template #default="{ row: { buttons } }">
              <el-checkbox
                v-for="{ id, name } in buttons"
                :key="id"
                :value="id"
                :label="name"
                :model-value="model.buttonIDs?.includes(id)"
                @change="toggleButton(id)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item prop="status" label="角色状态">
        <el-select v-model="model.status" placeholder="请选择">
          <el-option :value="0" label="启用" />
          <el-option :value="1" label="禁用" />
        </el-select>
      </el-form-item>
      <div class="text-right">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" :loading @click="verify">提交</el-button>
      </div>
    </common-form>
  </el-card>
</template>

<script setup lang="ts">
import { searchButton, SearchButtonOutput } from '@/apis/administrator/button'
import { searchMenu, SearchMenuOutput } from '@/apis/administrator/menu'
import { CreateRoleInput, UpdateRoleInput } from '@/apis/administrator/role'
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

const cancel = () => router.back()

const verify = () => {
  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(() => emits('submit'))
}
</script>
