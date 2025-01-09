import { delay, http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/app/locale', async () => {
    await delay()

    return HttpResponse.json({
      data: [
        {
          icon: '🇨🇳',
          code: 'zhCn',
          name: '简体中文'
        },
        {
          icon: '🇺🇸',
          code: 'en',
          name: 'English'
        }
      ]
    })
  }),

  http.get('/api/app/translation', async () => {
    await delay()

    return HttpResponse.json()
  })
]
