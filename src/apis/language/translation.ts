import {
  CreateTranslationInput,
  DetailTranslationOutput,
  SearchTranslationInput,
  SearchTranslationOutput,
  UpdateTranslationInput
} from '@/openapi/__generated__'
import { service } from '@/utils/service'

export type {
  CreateTranslationInput,
  DetailTranslationOutput,
  SearchTranslationInput,
  SearchTranslationOutput,
  UpdateTranslationInput
}

export const searchTranslation = () => {
  return service<SearchTranslationInput, SearchTranslationOutput[]>(params => ({
    url: '/language/translation',
    method: 'get',
    params
  }))
}

export const detailTranslation = (id: string) => {
  return service<undefined, DetailTranslationOutput>(() => ({
    url: '/language/translation/' + id,
    method: 'get'
  }))
}

export const createTranslation = () => {
  return service<CreateTranslationInput>(data => ({
    url: '/language/translation',
    method: 'post',
    data
  }))
}

export const updateTranslation = (id: string) => {
  return service<UpdateTranslationInput>(data => ({
    url: '/language/translation/' + id,
    method: 'patch',
    data
  }))
}

export const removeTranslation = (id: string) => {
  return service(() => ({
    url: '/language/translation/' + id,
    method: 'delete'
  }))
}
