import { translate } from '@/utils/i18n'
import { ElMessageBox } from 'element-plus'

export const error = () => {
  window.addEventListener('vite:preloadError', () => {
    ElMessageBox.alert(
      translate('common.new-version-update'),
      translate('common.tip'),
      {
        confirmButtonText: translate('common.confirm'),
        callback: () => window.location.reload()
      }
    )
  })
}
