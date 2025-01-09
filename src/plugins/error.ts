import { translate } from '@/utils/i18n'
import { ElMessageBox } from 'element-plus'

export const error = () => {
  window.addEventListener('vite:preloadError', () => {
    ElMessageBox.alert(
      translate({ stem: 'common.new-version-update' }),
      translate({ stem: 'common.tip' }),
      {
        confirmButtonText: translate({ stem: 'common.confirm' }),
        callback: () => window.location.reload()
      }
    )
  })
}
