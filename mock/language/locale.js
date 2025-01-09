import { delay, http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/language/locale', async () => {
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
  })
]
