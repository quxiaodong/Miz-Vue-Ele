import {
  fetchLocale,
  fetchTranslation,
  fetchTranslations,
  locales,
  updateLocale
} from '@/components/common-locale/stores'
import config from '@/config'
import router from '@/router'
import i18nInstance, { translate } from '@/utils/i18n.ts'
import { ElMessage } from 'element-plus'
import { App } from 'vue'

let prev: string | undefined

export const locale = (app: App<Element>) => {
  app.use(i18nInstance)

  updateLocale(config.lang)

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
      ElMessage.error(translate('common:locale.load-failed'))
    }
  })
}
