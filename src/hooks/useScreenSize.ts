import { useMediaQuery } from '@vueuse/core'

export const useScreenSize = () => ({
  isMobile: useMediaQuery('(max-width: 767px)')
})
