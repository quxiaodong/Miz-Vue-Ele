<template>
  <div class="flex h-14 items-center justify-between px-4">
    <el-button type="primary" round icon="CopyDocument" @click="copy">
      {{ translate('common:layout.setting.copy') }}
    </el-button>
    <el-button :loading text round @click="reset">
      {{ translate('common:layout.setting.clear') }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { signOut } from '@/apis/iam'
import { translate } from '@/utils/i18n'
import { removeSetting, removeToken } from '@/utils/storage'
import { useRouter } from 'vue-router'
import { toggleVisible } from '../../stores/setting'

const router = useRouter()

const { execute, loading } = signOut()

const copy = () => {}

const reset = () => {
  execute().then(() => {
    removeToken()
    removeSetting()
    toggleVisible(false)
    router.push('/sign-in').finally(() => window.location.reload())
  })
}
</script>
