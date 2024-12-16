<template>
  <el-space>
    <el-text :type style="font-size: inherit">{{ column.label }}</el-text>
    <el-popover
      :visible
      popper-style="--el-popover-padding: 0"
      @before-enter="updateModel"
      @after-leave="updateModel"
    >
      <template #reference>
        <el-icon size="16" class="cursor-pointer" @click="visible = !visible">
          <Filter />
        </el-icon>
      </template>
      <el-checkbox-group v-model="model" class="p-2">
        <el-checkbox
          v-for="{ value, label } in options"
          :key="value"
          :value
          :label
          class="!flex !m-0 !h-6"
        />
      </el-checkbox-group>
      <el-divider class="!m-0" />
      <div class="p-2">
        <el-button size="small" @click="reset">
          {{ $t('common.reset') }}
        </el-button>
        <el-button type="primary" size="small" @click="confirm">
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-popover>
  </el-space>
</template>

<script setup lang="ts">
import type { HeaderScope } from '@/components/common-table'
import { i18n } from '@/utils/i18n'
import { computed, ref } from 'vue'

type Props = {
  column: HeaderScope['column']
  status?: number[]
  options?: { value: number; label: string }[]
}

type Emits = {
  (e: 'change', value?: number[]): void
}

const {
  column,
  status,
  options = [
    { value: 0, label: i18n.t('common.enable') },
    { value: 1, label: i18n.t('common.disable') }
  ]
} = defineProps<Props>()

const emits = defineEmits<Emits>()

const visible = ref(false)
const model = ref<number[]>([])

const type = computed(() =>
  status && status.length && status.length !== options.length
    ? 'primary'
    : 'info'
)

const updateModel = () => {
  model.value = status ?? []
}

const reset = () => {
  visible.value = false
  emits('change')
}

const confirm = () => {
  visible.value = false
  emits('change', model.value)
}
</script>
