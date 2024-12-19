<template>
  <el-form ref="formRef" :model :rules :label-position label-width="auto">
    <el-row :gutter="20">
      <el-col
        v-for="(schema, index) in schemas"
        :key="index"
        v-bind="schema.colProps"
      >
        <FormItem v-model="model" :schema>
          <template v-if="'slot' in schema" #[schema.slot]>
            <slot :name="schema.slot" />
          </template>
        </FormItem>
      </el-col>
    </el-row>
    <slot />
  </el-form>
</template>

<script setup lang="ts">
import { Schema } from '@/components/form-item'
import FormItem from '@/components/form-item/Index.vue'
import { useScreenSize } from '@/hooks/useScreenSize'
import type { FormInstance, FormRules } from 'element-plus'
import { computed, useTemplateRef } from 'vue'

type Props = {
  schemas?: Schema[]
  rules?: FormRules<Record<string, unknown>>
}

const { schemas, rules } = defineProps<Props>()

const model = defineModel<object>({ required: true })

const { isMobile } = useScreenSize()

const formRef = useTemplateRef<FormInstance>('formRef')

const labelPosition = computed(() => (isMobile.value ? 'top' : undefined))

defineExpose({ formRef })
</script>
