import { delay, http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/language/locale', async () => {
    await delay()

    return HttpResponse.json({
      data: [
        {
          id: '6775e11ee10d703543f118c920111',
          icon: '🇨🇳',
          code: 'zhCn',
          status: 0,
          name: '简体中文'
        },
        {
          id: '6775e11ee10d703543f118c920112',
          icon: '🇺🇸',
          code: 'en',
          status: 0,
          name: 'English'
        }
      ]
    })
  })
]
