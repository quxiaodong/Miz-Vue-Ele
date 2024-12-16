<template>
  <el-switch
    v-if="useAcl(permission)"
    :loading
    :model-value="status"
    :active-value="0"
    :inactive-value="1"
    :active-text="$t('common.enable')"
    :inactive-text="$t('common.disable')"
    inline-prompt
    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
    @change="change"
  />
  <el-tag
    v-else
    disable-transitions
    :type="status === 0 ? 'success' : 'danger'"
  >
    {{ status === 0 ? $t('common.enable') : $t('common.disable') }}
  </el-tag>
</template>

<script setup lang="ts">
import { useAcl } from '@/hooks/useAcl'
import { Service } from '@/utils/service'

type Props = {
  status: number
  permission: string[]
  service: Service<{ status: number }, unknown>
}

type Emits = {
  (e: 'refresh'): void
}

const { status, permission, service } = defineProps<Props>()
const { execute, loading } = service

const emits = defineEmits<Emits>()

const change = () =>
  execute({ status: status ^ 1 }).then(() => emits('refresh'))
</script>
