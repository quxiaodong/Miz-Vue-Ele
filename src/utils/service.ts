import router from '@/router'
import { i18n } from '@/utils/i18n'
import { getToken, removeToken, setToken } from '@/utils/storage'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

type ApiResponse<T = null> = {
  data: T
  total: number
  message: string
}

interface RefreshTokenOutput {
  accessToken: string
  refreshToken: string
}

let refreshTokenPromise: Promise<
  AxiosResponse<ApiResponse<RefreshTokenOutput>>
> | null = null

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

instance.interceptors.request.use(
  config => {
    const accessToken = getToken().accessToken
    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken
    }
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => response,
  (error: AxiosError<{ message: string | string[] }>) => {
    const { config: originalConfig, status, response } = error

    // 400、404、500...
    if (status !== 401 || !originalConfig) {
      const message = response?.data.message || error.message
      if (typeof message === 'string') {
        ElMessage.error(message)
      } else {
        message.forEach((v: string) => ElMessage.error(v))
      }
      return Promise.reject()
    }

    // 401
    const refreshToken = getToken().refreshToken
    if (originalConfig.url?.endsWith('refresh-token') || !refreshToken) {
      ElMessage.error(i18n.t('common:api.unauthorized'))
      removeToken()
      router.push({
        path: '/sign-in',
        query: { redirect: router.currentRoute.value.fullPath }
      })
      return Promise.reject()
    }

    if (!refreshTokenPromise) {
      refreshTokenPromise = instance.request({
        url: '/iam/refresh-token',
        method: 'post',
        data: { refreshToken }
      })
      refreshTokenPromise
        .then(({ data }) => setToken(data.data))
        .finally(() => (refreshTokenPromise = null))
    }

    return refreshTokenPromise.then(() => {
      originalConfig.headers.Authorization = 'Bearer ' + getToken().accessToken
      return instance.request(originalConfig)
    })
  }
)

export const service = <Input = undefined, Output = null>(
  initConfig: Input extends undefined
    ? () => AxiosRequestConfig
    : (input: Input) => AxiosRequestConfig
) => {
  const result = ref<ApiResponse<Output>>()
  const error = ref<Error>()
  const loading = ref(false)
  const cancel = ref<() => void>(() => {})

  let _input: Input

  type Execute = Input extends undefined
    ? () => Promise<ApiResponse<Output>>
    : (input: Input) => Promise<ApiResponse<Output>>

  const execute: Execute = ((input: Input) => {
    const controller = new AbortController()

    _input = input
    loading.value = true
    cancel.value = controller.abort

    return instance
      .request<ApiResponse<Output>>({
        ...initConfig(input),
        signal: controller.signal
      })
      .then(({ data }) => {
        result.value = data
        return data
      })
      .finally(() => {
        loading.value = false
        cancel.value = () => {}
      })
  }) as Execute

  const refresh = () => execute(_input)

  return { result, error, loading, cancel, execute, refresh }
}

export type Service<I, O> = ReturnType<typeof service<I, O>>
