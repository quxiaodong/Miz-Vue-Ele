import Mock from 'mockjs'
import { administratorMenu } from '../../mock/administrator/menu'
import { appLocale, appTranslation } from '../../mock/app'
import { refreshToken, signIn, signUp, singOut } from '../../mock/sign'
import { userInfo, userPassword } from '../../mock/user'

export const mock = () => {
  if (import.meta.env.MODE === 'mock') {
    Mock.setup({ timeout: 500 })

    Mock.mock(/\/app\/locale/, appLocale)
    Mock.mock(/\/app\/translation/, appTranslation)

    Mock.mock(/\/iam\/sign-in/, signIn)
    Mock.mock(/\/iam\/sign-out/, singOut)
    Mock.mock(/\/iam\/sign-up/, signUp)
    Mock.mock(/\/iam\/refresh-token/, refreshToken)
    Mock.mock(/\/iam\/user-info/, userInfo)
    Mock.mock(/\/iam\/user-password/, userPassword)

    Mock.mock(/\/administrator\/menu/, administratorMenu)
  }
}
