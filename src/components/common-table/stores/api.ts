import { createInjectionState } from '@vueuse/shared'
import { ModelRef } from 'vue'
import { Params, Props } from '../index'

const [useProvideApiStore, useApiStore] = createInjectionState(
  (service: Props['service'], params: ModelRef<Params>) => {
    const changePageNo = (value: number) => {
      params.value.pageNo = value
      service.execute(params.value)
    }

    const changePageSize = (value: number) => {
      params.value.pageNo = 1
      params.value.pageSize = value
      service.execute(params.value)
    }

    return { service, params, changePageNo, changePageSize }
  }
)

export { useProvideApiStore }

export { useApiStore }
