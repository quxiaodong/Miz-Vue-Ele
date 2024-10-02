import {
  CreateRoleInput,
  DetailRoleOutput,
  SearchRoleInput,
  SearchRoleOutput,
  UpdateRoleInput
} from '@/openapi/__generated__'
import { service } from '@/utils/service'

export type {
  CreateRoleInput,
  DetailRoleOutput,
  SearchRoleInput,
  SearchRoleOutput,
  UpdateRoleInput
}

export const searchRole = () => {
  return service<SearchRoleInput, SearchRoleOutput[]>(params => ({
    url: '/administrator/role',
    method: 'get',
    params
  }))
}

export const detailRole = (id: string) => {
  return service<undefined, DetailRoleOutput>(() => ({
    url: '/administrator/role/' + id,
    method: 'get'
  }))
}

export const createRole = () => {
  return service<CreateRoleInput>(data => ({
    url: '/administrator/role',
    method: 'post',
    data
  }))
}

export const updateRole = (id: string) => {
  return service<UpdateRoleInput>(data => ({
    url: '/administrator/role/' + id,
    method: 'patch',
    data
  }))
}

export const removeRole = (id: string) => {
  return service(() => ({
    url: '/administrator/role/' + id,
    method: 'delete'
  }))
}
