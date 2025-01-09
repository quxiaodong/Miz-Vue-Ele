import { i18n } from '@/utils/i18n'
import { ElMessageBox } from 'element-plus'

export const error = () => {
  window.addEventListener('vite:preloadError', () => {
    ElMessageBox.alert(
      i18n.t('common.new-version-update'),
      i18n.t('common.tip'),
      {
        confirmButtonText: i18n.t('common.confirm'),
        callback: () => window.location.reload()
      }
    )
  })
}
