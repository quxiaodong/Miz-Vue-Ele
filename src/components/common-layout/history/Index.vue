<template>
  <el-scrollbar>
    <el-space :size="0" :spacer>
      <div v-for="item in histories" :key="item.path" class="p-1">
        <el-dropdown trigger="contextmenu">
          <span
            :class="['item', { active: item.path === route.path }]"
            @click="tabClick(item)"
          >
            <el-icon v-if="item.icon">
              <component :is="item.icon" />
            </el-icon>
            <span>
              {{ translate({ stem: item.stem, text: item.name }) }}
            </span>
            <el-icon class="unset">
              <Close v-if="!item.affix" @click.stop="remove(item)" />
              <IconAffix v-else />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                icon="Close"
                :disabled="item.affix"
                @click="remove(item)"
              >
                关闭标签
              </el-dropdown-item>
              <el-dropdown-item icon="IconAffix" @click="tabAffix(item)">
                {{ item.affix ? '取消固定' : '设置固定' }}
              </el-dropdown-item>
              <el-dropdown-item
                icon="Refresh"
                @click="refreshPage(item.path, item.fullPath)"
              >
                刷新页面
              </el-dropdown-item>
              <el-dropdown-item icon="Sort" divided @click="removeOther(item)">
                关闭其他标签
              </el-dropdown-item>
              <el-dropdown-item icon="Switch" @click="removeAll">
                关闭所有标签
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-space>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { translate } from '@/utils/i18n'
import { ElDivider } from 'element-plus'
import { h, Ref, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { refreshPage, setCaches } from '../stores/views'

const spacer = h(ElDivider, { direction: 'vertical', class: '!mx-0' })

type History = {
  fullPath: string
  path: string
  name: string
  stem?: string | null
  icon?: string | null
  affix?: boolean
}

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const home: History = {
  fullPath: '/',
  path: '/',
  name: '首页',
  stem: 'common:menu.home',
  icon: 'House',
  affix: true
}

const histories: Ref<History[]> = ref([{ ...home }])

const tabClick = (item: History) => router.push(item.fullPath)

const tabAffix = (item: History) => (item.affix = !item.affix)

const remove = (item: History) => {
  histories.value = histories.value.filter(v => v.path !== item.path)
  const currentPage = item.path === route.path
  if (currentPage) {
    router.push(histories.value[histories.value.length - 1].path || '/')
  }
}

const removeOther = (item: History) => {
  histories.value = histories.value.filter(
    v => v.path === item.path || v.path === '/' || v.affix
  )
  router.push(item.path)
}

const removeAll = () => {
  histories.value = [{ ...home }]
  router.push('/')
}

watch(
  () => userStore.caches,
  value => setCaches(value ?? [])
)

watch(
  () => route.path,
  () => {
    if (route.meta.hideInMenu) return
    const history = histories.value.find(v => v.path === route.path)
    if (history) {
      history.fullPath = route.fullPath
    } else {
      histories.value.push({
        fullPath: route.fullPath,
        path: route.path,
        name: route.meta.name,
        stem: route.meta.stem,
        icon: route.meta.icon
      })
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.item {
  @apply flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md px-2 py-1 text-sm hover:bg-[#f4f4f5] dark:hover:bg-[#2e3033];
}

.item.active {
  @apply bg-[#f4f4f5] dark:bg-[#2e3033];
}

.item.active > :not(.unset) {
  color: var(--el-color-primary);
}
</style>
