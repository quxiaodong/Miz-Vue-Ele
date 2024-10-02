import { service } from '@/utils/service'

// 国际化
export type Locale = {
  icon: string
  code: string
  name: string
}

export const searchLocale = () => {
  return service<undefined, Locale[]>(() => ({
    url: '/app/locale',
    method: 'get'
  }))
}

// 配置项
export type TranslationInput = {
  code: string
  stem: string
}

export const searchTranslation = () => {
  return service<TranslationInput, Record<string, string>>(params => ({
    url: '/app/translation',
    method: 'get',
    params
  }))
}
