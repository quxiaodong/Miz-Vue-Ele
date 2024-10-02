import {
  CreateMenuInput,
  DetailMenuOutput,
  SearchMenuInput,
  SearchMenuOutput,
  UpdateMenuInput
} from '@/openapi/__generated__'
import { service } from '@/utils/service'

export type {
  CreateMenuInput,
  DetailMenuOutput,
  SearchMenuInput,
  SearchMenuOutput,
  UpdateMenuInput
}

export const searchMenu = () => {
  return service<SearchMenuInput, SearchMenuOutput[]>(params => ({
    url: '/administrator/menu',
    method: 'get',
    params
  }))
}

export const detailMenu = (id: string) => {
  return service<undefined, DetailMenuOutput>(() => ({
    url: '/administrator/menu/' + id,
    method: 'get'
  }))
}

export const createMenu = () => {
  return service<CreateMenuInput>(data => ({
    url: '/administrator/menu',
    method: 'post',
    data
  }))
}

export const updateMenu = (id: string) => {
  return service<UpdateMenuInput>(data => ({
    url: '/administrator/menu/' + id,
    method: 'patch',
    data
  }))
}

export const removeMenu = (id: string) => {
  return service(() => ({
    url: '/administrator/menu/' + id,
    method: 'delete'
  }))
}
