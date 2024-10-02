import {
  CreateLocaleInput,
  DetailLocaleOutput,
  SearchLocaleInput,
  SearchLocaleOutput,
  UpdateLocaleInput
} from '@/openapi/__generated__'
import { service } from '@/utils/service'

export type {
  CreateLocaleInput,
  DetailLocaleOutput,
  SearchLocaleInput,
  SearchLocaleOutput,
  UpdateLocaleInput
}

export const searchLocale = () => {
  return service<SearchLocaleInput, SearchLocaleOutput[]>(params => ({
    url: '/language/locale',
    method: 'get',
    params
  }))
}

export const detailLocale = (id: string) => {
  return service<undefined, DetailLocaleOutput>(() => ({
    url: '/language/locale/' + id,
    method: 'get'
  }))
}

export const createLocale = () => {
  return service<CreateLocaleInput>(data => ({
    url: '/language/locale',
    method: 'post',
    data
  }))
}

export const updateLocale = (id: string) => {
  return service<UpdateLocaleInput>(data => ({
    url: '/language/locale/' + id,
    method: 'patch',
    data
  }))
}

export const removeLocale = (id: string) => {
  return service(() => ({
    url: '/language/locale/' + id,
    method: 'delete'
  }))
}
