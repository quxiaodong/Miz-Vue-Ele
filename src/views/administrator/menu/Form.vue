<template>
  <common-form ref="dom" :model :rules>
    <el-form-item prop="name" label="菜单名称">
      <el-input v-model="model.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item prop="path" label="菜单路径">
      <el-input v-model="model.path" placeholder="请输入" />
    </el-form-item>
    <el-form-item prop="icon" label="菜单图标">
      <el-popover :width="popoverWidth" trigger="click">
        <template #reference>
          <div ref="iconInput" class="w-full">
            <el-input
              v-model="model.icon"
              clearable
              placeholder="请选择"
              @clear="model.icon = null"
            >
              <template #prefix>
                <el-icon v-if="model.icon" size="20">
                  <component :is="model.icon" />
                </el-icon>
              </template>
            </el-input>
          </div>
        </template>
        <el-space wrap class="h-28 overflow-auto">
          <el-icon
            v-for="item in ElementPlusIconsVue"
            :key="item.name"
            size="20"
            :color="model.icon === item.name ? '#409EFF' : '#909399'"
            class="cursor-pointer"
            @click="selectIcon(item.name)"
          >
            <component :is="item" />
          </el-icon>
        </el-space>
      </el-popover>
    </el-form-item>
    <el-form-item prop="parentId" label="父级菜单">
      <el-select
        v-model="model.parentId!"
        placeholder="请选择"
        clearable
        @clear="model.parentId = null"
      >
        <el-option
          v-for="item in parentList"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        />
      </el-select>
    </el-form-item>
    <el-form-item prop="status" label="菜单状态">
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
  CreateMenuInput,
  SearchMenuOutput,
  UpdateMenuInput
} from '@/apis/administrator/menu'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, reactive, useTemplateRef } from 'vue'

type Model = CreateMenuInput | UpdateMenuInput

type Props = {
  loading: boolean
  parentList: SearchMenuOutput[]
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
  path: [{ required: true, message: '请输入', trigger: 'blur' }]
})

const iconInput = useTemplateRef<HTMLElement>('iconInput')

const popoverWidth = computed(() => {
  if (iconInput.value) {
    return iconInput.value.offsetWidth + 'px'
  }
  return '200px'
})

const selectIcon = (icon?: string) => {
  model.value.icon = icon
}

const verify = () => {
  if (!dom.value?.formRef) return
  dom.value.formRef.validate().then(() => emits('submit'))
}
</script>
