import { i18n } from '@/utils/i18n'
import { FormItemRule } from 'element-plus'

export const usernameRules: FormItemRule[] = [
  { required: true, message: i18n.t('common.please-input'), trigger: 'blur' },
  {
    validator: (_, value: string, callback) => {
      if (value.length < 6 || value.length > 32) {
        callback(i18n.t('common:validate.username-length', { min: 6, max: 32 }))
      }
      if (!/^[a-z0-9]{6,32}$/.test(value)) {
        callback(i18n.t('common:validate.username-regex'))
      }
      callback()
    },
    trigger: 'blur'
  }
]

export const passwordRules: FormItemRule[] = [
  { required: true, message: i18n.t('common.please-input'), trigger: 'blur' },
  {
    validator: (_, value: string, callback) => {
      if (value.length < 6 || value.length > 32) {
        callback(i18n.t('common:validate.password-length', { min: 6, max: 32 }))
      }
      if (!/^[A-Za-z0-9!@#$%^&*]{6,32}$/.test(value)) {
        callback(
          i18n.t('common:validate.password-regex', { characters: '!@#$%^&*' })
        )
      }
      if (!/(?=.*[0-9])(?=.*[a-zA-Z])/.test(value)) {
        callback(i18n.t('common:validate.password-must-contain'))
      }
      callback()
    },
    trigger: 'blur'
  }
]
