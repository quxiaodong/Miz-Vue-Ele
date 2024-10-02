import {
  fetchLocale,
  fetchTranslation,
  fetchTranslations,
  locales
} from '@/components/common-locale/stores'
import router from '@/router'
import config from '@/utils/config'
import i18nInstance, { i18n } from '@/utils/i18n.ts'
import { ElMessage } from 'element-plus'
import { App } from 'vue'

let prev: string | undefined

export const locale = (app: App<Element>) => {
  app.use(i18nInstance)

  i18n.locale = config.lang

  router.beforeResolve(async to => {
    if (prev === to.path) return
    prev = to.path
    try {
      if (!locales.value) {
        await fetchLocale()
        await fetchTranslations(to.path)
      } else {
        await fetchTranslation(to.path)
      }
    } catch {
      ElMessage.error(i18n.t('common:locale.load-failed'))
    }
  })
}
