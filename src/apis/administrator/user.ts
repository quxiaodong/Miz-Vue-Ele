import {
  CreateUserInput,
  DetailUserOutput,
  PasswordUserInput,
  SearchUserInput,
  SearchUserOutput,
  UpdateUserInput
} from '@/openapi/__generated__'
import { service } from '@/utils/service'

export type {
  CreateUserInput,
  DetailUserOutput,
  PasswordUserInput,
  SearchUserInput,
  SearchUserOutput,
  UpdateUserInput
}

export const searchUser = () => {
  return service<SearchUserInput, SearchUserOutput[]>(params => ({
    url: '/administrator/user',
    method: 'get',
    params
  }))
}

export const detailUser = (id: string) => {
  return service<undefined, DetailUserOutput>(() => ({
    url: '/administrator/user/' + id,
    method: 'get'
  }))
}

export const createUser = () => {
  return service<CreateUserInput>(data => ({
    url: '/administrator/user',
    method: 'post',
    data
  }))
}

export const updateUser = (id: string) => {
  return service<UpdateUserInput>(data => ({
    url: '/administrator/user/' + id,
    method: 'patch',
    data
  }))
}

export const removeUser = (id: string) => {
  return service(() => ({
    url: '/administrator/user/' + id,
    method: 'delete'
  }))
}

export const passwordUser = () => {
  return service<PasswordUserInput>(data => ({
    url: '/administrator/user/password',
    method: 'post',
    data
  }))
}
