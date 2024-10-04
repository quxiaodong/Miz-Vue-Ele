import config from '@/config'
import { getSetting, getTabs, setSetting } from '@/utils/storage'
import { ref, Ref } from 'vue'

export type Tab = {
  fullPath: string
  path: string
  name: string
  stem?: string | null
  icon?: string | null
  affix?: boolean
}

const home: Tab = {
  fullPath: '/',
  path: '/',
  name: '首页',
  stem: 'common:menu.home',
  icon: 'House',
  affix: true
}

export const tabs: Ref<Tab[]> = ref(
  getTabs().length ? getTabs() : [{ ...home }]
)

export const initTabs = () => {
  tabs.value = [{ ...home }]
}

export const visible = ref(
  getSetting('tab') === undefined ? config.layout.tab : !!getSetting('tab')
)

export const toggleVisible = (payload: boolean) => {
  visible.value = payload
  setSetting('tab', payload)
}

export const setTabName = (path: string, name: string) => {
  const tab = tabs.value.find(v => v.path === path)
  if (tab) {
    tab.name = name
  }
}
