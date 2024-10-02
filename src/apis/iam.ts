import {
  SignInInput,
  SignInOutput,
  SignUpInput,
  UserInfoOutput,
  UserPasswordInput
} from '@/openapi/__generated__'
import { service } from '@/utils/service'

export type {
  SignInInput,
  SignInOutput,
  SignUpInput,
  UserInfoOutput,
  UserPasswordInput
}

export const signUp = () => {
  return service<SignUpInput>(data => ({
    url: '/iam/sign-up',
    method: 'post',
    data
  }))
}

export const signIn = () => {
  return service<SignInInput, SignInOutput>(data => ({
    url: '/iam/sign-in',
    method: 'post',
    data
  }))
}

export const signOut = () => {
  return service(() => ({
    url: '/iam/sign-out',
    method: 'get'
  }))
}

export const searchUserInfo = () => {
  return service<undefined, UserInfoOutput>(() => ({
    url: '/iam/user-info',
    method: 'get'
  }))
}

export const updateUserPassword = () => {
  return service<UserPasswordInput>(data => ({
    url: '/iam/user-password',
    method: 'post',
    data
  }))
}
