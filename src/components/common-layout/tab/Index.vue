<template>
  <el-scrollbar>
    <div ref="dom" class="flex">
      <div v-for="item in tabs" :key="item.path" class="spacer relative p-1">
        <el-dropdown trigger="contextmenu">
          <span
            :class="['item', { active: item.path === route.path }]"
            @click="tabClick(item)"
          >
            <el-icon v-if="item.icon">
              <component :is="item.icon" />
            </el-icon>
            <span class="cursor-move">
              {{ translate({ stem: item.stem, text: item.name }) }}
            </span>
            <el-icon class="unset">
              <IconAffix v-if="item.affix" />
              <Close v-else @click.stop="remove(item)" />
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
              <el-dropdown-item
                icon="IconAffix"
                :disabled="item.path === '/'"
                @click="tabAffix(item)"
              >
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
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { translate } from '@/utils/i18n'
import { setTabs } from '@/utils/storage'
import Sortable from 'sortablejs'
import { nextTick, onMounted, useTemplateRef, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { caches, createCache, refreshPage, removeCache } from '../stores/cache'
import { initTabs, Tab, tabs } from '../stores/tab'

const route = useRoute()
const router = useRouter()

const tabClick = (item: Tab) => router.push(item.fullPath)

const tabAffix = (item: Tab) => (item.affix = !item.affix)

const filterPaths = (paths: string[]) =>
  caches.value.filter(v => paths.includes(v))

const removeCaches = (paths: string[]) => paths.forEach(removeCache)

const createCaches = (paths: string[]) => paths.forEach(createCache)

const remove = (item: Tab) => {
  const paths = [item.path]
  removeCaches(filterPaths(paths))

  tabs.value = tabs.value.filter(v => v.path !== item.path)
  const currentPage = item.path === route.path
  let promise: Promise<unknown>
  if (currentPage) {
    const path = tabs.value[tabs.value.length - 1]?.fullPath || '/'
    promise = router.push(path)
  } else {
    promise = nextTick()
  }
  promise.then(() => createCaches(paths))
}

const removeOther = (item: Tab) => {
  const paths = tabs.value
    .filter(v => v.path !== item.path && v.path !== '/' && !v.affix)
    .map(v => v.path)
  removeCaches(filterPaths(paths))

  tabs.value = tabs.value.filter(
    v => v.path === item.path || v.path === '/' || v.affix
  )
  router.push(item.fullPath).then(() => createCaches(paths))
}

const removeAll = () => {
  const paths = [...caches.value]
  removeCaches(paths)

  initTabs()
  router.push('/').then(() => createCaches(paths))
}

const dom = useTemplateRef<HTMLDivElement>('dom')

onMounted(() => {
  watchEffect(() => {
    setTabs(tabs.value)
  })

  new Sortable(dom.value!, {
    animation: 150,
    handle: '.cursor-move',
    onEnd({ oldIndex, newIndex }) {
      if (oldIndex !== undefined && newIndex !== undefined) {
        let tab = tabs.value.splice(oldIndex, 1)[0]
        tabs.value.splice(newIndex, 0, tab)
      }
    }
  })
})
</script>

<style scoped>
.item {
  @apply flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-md px-2 py-1 text-sm hover:bg-[#f4f4f5] dark:hover:bg-[#2e3033];
}

.item.active {
  @apply bg-[#f4f4f5] dark:bg-[#2e3033];
}

.spacer::after {
  content: '';
  @apply absolute right-0 top-1/2 h-[1em] w-[1px] -translate-y-1/2;
  border-left: 1px var(--el-border-color) var(--el-border-style);
}

.spacer:last-child::after {
  display: none;
}

.item.active > :not(.unset) {
  color: var(--el-color-primary);
}
</style>
