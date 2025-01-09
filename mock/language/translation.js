import { delay, http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/language/translation', async () => {
    await delay()

    return HttpResponse.json({
      data: []
    })
  })
]
