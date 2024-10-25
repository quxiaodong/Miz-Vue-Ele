import { SearchLocaleOutput, searchLocale } from '@/apis/language/locale'
import { searchTranslation } from '@/apis/language/translation'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { i18n, translate } from '@/utils/i18n'
import { getSetting, setSetting } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const config: Record<string, Record<string, string>> = {}

const array: { code: string; stem: string }[] = []

export const locale = ref<SearchLocaleOutput>()

export const locales = ref<SearchLocaleOutput[]>()

export const toggleLocale = (code: string, isSave: boolean = true) => {
  if (!locales.value) return

  const item = locales.value.find(v => v.code === code)

  locale.value = item ?? locales.value[0]
  code = locale.value.code

  if (isSave) {
    setSetting('language', code)
  }

  fetchTranslations().then(() => updateLocale(code))
}

export const fetchTranslations = async (stem?: string) => {
  const now = Date.now()
  const message = ElMessage({
    duration: 0,
    message: translate('common:locale.load-translation')
  })

  try {
    await fetchTranslation('common')
    await fetchTranslation(stem || router.currentRoute.value.path)
  } finally {
    const diff = Date.now() - now
    setTimeout(() => message.close(), Math.max(1500 - diff, 0))
  }
}

export const fetchTranslation = (stem: string) => {
  const code = locale.value?.code
  if (!code) return

  const localeId = locale.value?.id
  if (!localeId) return

  const exists = array.some(v => v.code === code && v.stem === stem)
  if (exists) return

  if (!config[code]) {
    config[code] = {}
  }

  const { execute } = searchTranslation()

  return execute({ stem, localeId, status: [0] }).then(({ data }) => {
    array.push({ code, stem })
    Object.assign(
      config[code],
      i18n.getLocaleMessage(code),
      Object.fromEntries(data.map(({ stem, text }) => [stem, text]))
    )
    i18n.setLocaleMessage(code, config[code])
  })
}

export const fetchLocale = () => {
  const userStore = useUserStore()
  const { execute } = searchLocale()

  return execute({ status: [0] }).then(({ data }) => {
    locales.value = data

    if (!data.length) return

    const language = getSetting('language') || userStore.user?.locale?.code
    const item = data.find(v => v.code === language)

    locale.value = item ?? data[0]
    updateLocale(locale.value.code)
  })
}

export const updateLocale = (code: string) => {
  i18n.locale = code
  document.documentElement.setAttribute('lang', code)
}
