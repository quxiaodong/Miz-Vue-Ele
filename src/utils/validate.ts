import { translate } from '@/utils/i18n'
import { FormItemRule } from 'element-plus'

export const inputRules = (): FormItemRule[] => [
  {
    required: true,
    trigger: 'blur',
    message: translate('common.please-input')
  }
]

export const selectRules = (): FormItemRule[] => [
  {
    required: true,
    trigger: 'change',
    message: translate('common.please-select')
  }
]

export const emailRules = (): FormItemRule[] => [
  {
    type: 'email',
    trigger: 'blur',
    message: translate('common.validate.email')
  }
]

export const usernameRules = (): FormItemRule[] => [
  ...inputRules(),
  {
    validator: (_, value: string, callback) => {
      if (value.length < 6 || value.length > 64) {
        callback(
          translate('common:validate.username-length', { min: 6, max: 64 })
        )
      }
      if (!/^[a-z0-9]{6,64}$/.test(value)) {
        callback(translate('common:validate.username-regex'))
      }
      callback()
    },
    trigger: 'blur'
  }
]

export const passwordRules = (): FormItemRule[] => [
  ...inputRules(),
  {
    validator: (_, value: string, callback) => {
      if (value.length < 6 || value.length > 64) {
        callback(
          translate('common:validate.password-length', { min: 6, max: 64 })
        )
      }
      if (!/^[A-Za-z0-9!@#$%^&*]{6,64}$/.test(value)) {
        callback(
          translate('common:validate.password-regex', {
            characters: '!@#$%^&*'
          })
        )
      }
      if (!/(?=.*[0-9])(?=.*[a-zA-Z])/.test(value)) {
        callback(translate('common:validate.password-must-contain'))
      }
      callback()
    },
    trigger: 'blur'
  }
]
