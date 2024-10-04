<template>
  <div class="px-4 h-14 flex items-center justify-between">
    <el-button type="primary" round :icon="CopyDocument" @click="copy">
      复制偏好设置
    </el-button>
    <el-button :loading text round @click="reset">
      清空缓存 & 退出登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { signOut } from '@/apis/iam'
import { CopyDocument } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { toggleVisible } from '../../stores/setting'

const router = useRouter()

const { execute, loading } = signOut()

const copy = () => {}

const reset = () => {
  execute().then(() => {
    localStorage.clear()
    toggleVisible(false)
    router.push('/sign-in').finally(() => window.location.reload())
  })
}
</script>
