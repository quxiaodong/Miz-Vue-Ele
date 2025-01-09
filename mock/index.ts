// @ts-nocheck
import { setupWorker } from 'msw/browser'
import { handlers as button } from './administrator/button'
import { handlers as menu } from './administrator/menu'
import { handlers as role } from './administrator/role'
import { handlers as user } from './administrator/user'
import { handlers as app } from './app'
import { handlers as iam } from './iam'

export async function enableMocking() {
  if (import.meta.env.MODE !== 'mock') return

  const worker = setupWorker(
    ...app,
    ...iam,
    ...menu,
    ...button,
    ...role,
    ...user
  )

  return worker.start({
    serviceWorker: {
      url: import.meta.env.DEV
        ? 'mockServiceWorker.js'
        : '/Miz-Vue-Ele/mockServiceWorker.js'
    },
    onUnhandledRequest: 'bypass'
  })
}
