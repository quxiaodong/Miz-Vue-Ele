import { Locale, searchLocale, searchTranslation } from '@/apis/app'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { i18n } from '@/utils/i18n'
import { getSetting, setSetting } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const config: Record<string, Record<string, string>> = {}

const array: { code: string; stem: string }[] = []

export const locale = ref<Locale>()

export const locales = ref<Locale[]>()

export const toggleLocale = (code: string, isSave: boolean = true) => {
  if (!locales.value) return

  const item = locales.value.find(v => v.code === code)

  locale.value = item ?? locales.value[0]
  code = locale.value.code

  if (isSave) {
    setSetting('language', code)
  }

  fetchTranslations().then(() => (i18n.locale = locale.value!.code))
}

export const fetchTranslations = async (stem?: string) => {
  const message = ElMessage({
    duration: 0,
    message: i18n.t('common:locale.load-translation')
  })

  await fetchTranslation('common')
  await fetchTranslation(stem || router.currentRoute.value.path)

  message.close()
}

export const fetchTranslation = (stem: string) => {
  const code = locale.value?.code
  if (!code) return

  const exists = array.some(v => v.code === code && v.stem === stem)
  if (exists) return

  if (!config[code]) {
    config[code] = {}
  }

  const { execute } = searchTranslation()

  return execute({ code, stem }).then(({ data }) => {
    array.push({ code, stem })
    Object.assign(config[code], i18n.getLocaleMessage(code), data)
    i18n.setLocaleMessage(code, config[code])
  })
}

export const fetchLocale = () => {
  const userStore = useUserStore()
  const { execute } = searchLocale()

  return execute().then(({ data }) => {
    locales.value = data

    const language = getSetting('language') || userStore.user?.locale?.code
    const item = data.find(v => v.code === language)

    locale.value = item ?? data[0]
    i18n.locale = locale.value.code
  })
}
