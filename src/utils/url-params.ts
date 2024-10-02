import router from '@/router'
import qs from 'qs'
import { LocationQueryValue } from 'vue-router'

type FormatBase<T> = {
  key: Extract<keyof T, string>
  type?: 'Number' | 'Boolean'
  transform?: (v: LocationQueryValue) => unknown
}

type FormatArray<T> = {
  key: Extract<keyof T, string>
  type: 'Array' | 'Array<number>'
  transform?: (v: LocationQueryValue[]) => unknown
}

type Format<T> = (FormatBase<T> | FormatArray<T>)[]

export const getUrlParams = <T>(data: Format<T>) => {
  const params: Record<string, unknown> = {}
  const query = router.currentRoute.value.query

  data.forEach(({ key, type, transform }) => {
    if (!query[key]) return

    switch (type) {
      case 'Array':
      case 'Array<number>':
        {
          const value = Array.isArray(query[key]) ? query[key] : [query[key]]
          if (type === 'Array<number>') {
            params[key] = value.map(v => Number(v))
          } else {
            params[key] = transform ? transform(value) : value
          }
        }
        break
      default: {
        const value = Array.isArray(query[key]) ? query[key][0] : query[key]
        if (type === 'Number') {
          params[key] = Number(value)
        } else if (type === 'Boolean') {
          params[key] = value === 'true'
        } else {
          params[key] = transform ? transform(value) : value
        }
      }
    }
  })

  return params
}

export const setUrlParams = (query: Record<string, unknown>) => {
  const params = qs.stringify(query, { arrayFormat: 'repeat' })
  const path = router.currentRoute.value.path + '?' + params
  router.replace(path)
}
