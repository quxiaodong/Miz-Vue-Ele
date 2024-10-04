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
          {{ translate('common:layout.change-password') }}
        </el-dropdown-item>
        <el-dropdown-item command="sign-out" icon="SwitchButton" divided>
          {{ translate('common:layout.sign-out') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <div v-else class="placeholder">
    <el-icon size="18" class="is-loading">
      <Loading />
    </el-icon>
  </div>
</template>

<script setup lang="tsx">
import { signOut } from '@/apis/iam'
import { createDialog } from '@/components/common-dialog'
import { useUserStore } from '@/stores/user'
import { translate } from '@/utils/i18n'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import Password from './Password.vue'

const router = useRouter()
const userStore = useUserStore()

const { execute, loading } = signOut()

const command = (type: string) => {
  switch (type) {
    case 'password': {
      const dialog = createDialog(<Password onClose={() => dialog.close()} />, {
        title: translate('common:layout.change-password')
      })
      break
    }
    case 'sign-out': {
      execute().then(() => {
        ElNotification.success(translate('common:layout.sign-out-success'))
        userStore.logout()
        router.push('/sign-in')
      })
      break
    }
  }
}
</script>
