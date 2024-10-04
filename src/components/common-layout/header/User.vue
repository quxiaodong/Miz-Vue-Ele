<template>
  <el-dropdown v-if="!loading" @command="command">
    <div>
      <div v-if="userStore.user" class="placeholder">
        <el-avatar
          icon="Avatar"
          :src="userStore.user.avatar ?? ''"
          style="--el-avatar-size: 30px"
          class="mr-2"
        />
        {{ userStore.user.nickname || userStore.user.username }}
      </div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="password" icon="Lock">
          <Password />
        </el-dropdown-item>
        <el-dropdown-item command="sign-out" icon="SwitchButton" divided>
          {{ $t('common:layout.sign-out') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <div v-else class="placeholder">
    <el-icon size="20" class="is-loading">
      <Loading />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { signOut } from '@/apis/iam'
import { useUserStore } from '@/stores/user'
import { i18n } from '@/utils/i18n'
import { removeToken } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import Password from './Password.vue'

const router = useRouter()
const userStore = useUserStore()

const { execute, loading } = signOut()

const command = (type: string) => {
  switch (type) {
    case 'sign-out': {
      execute().then(() => {
        ElMessage.success(i18n.t('common:layout.sign-out-success'))
        removeToken()
        router.push('/sign-in')
      })
      break
    }
  }
}
</script>
