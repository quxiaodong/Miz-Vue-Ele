import {
  CreateButtonInput,
  DetailButtonOutput,
  SearchButtonInput,
  SearchButtonOutput,
  UpdateButtonInput
} from '@/openapi/__generated__'
import { service } from '@/utils/service'

export type {
  CreateButtonInput,
  DetailButtonOutput,
  SearchButtonInput,
  SearchButtonOutput,
  UpdateButtonInput
}

export const searchButton = () => {
  return service<SearchButtonInput, SearchButtonOutput[]>(params => ({
    url: '/administrator/button',
    method: 'get',
    params
  }))
}

export const detailButton = (id: string) => {
  return service<undefined, DetailButtonOutput>(() => ({
    url: '/administrator/button/' + id,
    method: 'get'
  }))
}

export const createButton = () => {
  return service<CreateButtonInput>(data => ({
    url: '/administrator/button',
    method: 'post',
    data
  }))
}

export const updateButton = (id: string) => {
  return service<UpdateButtonInput>(data => ({
    url: '/administrator/button/' + id,
    method: 'patch',
    data
  }))
}

export const removeButton = (id: string) => {
  return service(() => ({
    url: '/administrator/button/' + id,
    method: 'delete'
  }))
}
