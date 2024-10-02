import config from '@/config'
import { useUserStore } from '@/stores/user'

export const useAcl = (acls: string[], type: 'some' | 'every' = 'some') => {
  const userStore = useUserStore()
  const username = userStore.user?.username
  if (username === config.superadmin) return true
  const buttons = userStore.buttons.map(v => v.code)
  return acls[type](v => buttons.includes(v))
}
