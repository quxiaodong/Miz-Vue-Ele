<template>
  <el-popconfirm
    width="auto"
    placement="top"
    :disabled="loading"
    :title="translate({ stem: 'common.confirm-remove' })"
    :cancel-button-text="translate({ stem: 'common.cancel' })"
    :confirm-button-text="translate({ stem: 'common.confirm' })"
    @confirm="confirm"
  >
    <template #reference>
      <el-link type="primary" :underline="false" :disabled="loading">
        {{ translate({ stem: 'common.remove' }) }}
        <el-icon v-if="loading" class="is-loading">
          <Loading />
        </el-icon>
      </el-link>
    </template>
  </el-popconfirm>
</template>

<script setup lang="ts">
import { translate } from '@/utils/i18n'
import { Service } from '@/utils/service'

type Props = {
  service: Service<undefined, unknown>
}

type Emits = {
  (e: 'refresh'): void
}

const { service } = defineProps<Props>()
const { execute, loading } = service

const emits = defineEmits<Emits>()

const confirm = () => execute().then(() => emits('refresh'))
</script>
