import { delay, http, HttpResponse } from 'msw'
import qs from 'qs'
import { roles } from './role'

export const users = [
  {
    id: '6775ee8e9202fd7a6e6a7bc3',
    username: 'guest',
    nickname: null,
    phone: null,
    email: null,
    remark: null,
    status: 0,
    createAt: '2025-01-02T01:40:30.349Z',
    role: {
      name: '访客'
    }
  },
  {
    id: '6775e7885d3926d9a544fd57',
    username: 'admin',
    nickname: '',
    phone: '138888888',
    email: 'hello@miz-vue-ele.com',
    remark: '这是管理员',
    status: 0,
    createAt: '2025-01-02T01:10:32.689Z',
    roleId: '6775e5c72147004c70b5e656',
    role: {
      name: '管理员'
    }
  }
]

export const handlers = [
  http.get('/api/administrator/user', async ({ request: { url } }) => {
    await delay()

    const params = qs.parse(url.split('?')[1])
    let result = [
      ...users.sort(
        (a, b) =>
          new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
      )
    ]
    if (params.username) {
      result = result.filter(v => v.username.includes(params.username))
    }
    if (params.nickname) {
      result = result.filter(v => v.nickname?.includes(params.nickname))
    }
    if (params.phone) {
      result = result.filter(v => v.phone?.includes(params.phone))
    }
    if (params.email) {
      result = result.filter(v => v.email?.includes(params.email))
    }
    if (params.status && Array.isArray(params.status)) {
      const status = params.status.map(Number)
      result = result.filter(v => status.includes(v.status))
    }
    let data = result
    if (params.pageNo && params.pageSize) {
      const pageNo = parseInt(params.pageNo)
      const pageSize = parseInt(params.pageSize)
      data = result.slice((pageNo - 1) * pageSize, pageNo * pageSize)
    }
    return HttpResponse.json({
      data,
      total: result.length
    })
  }),

  http.get('/api/administrator/user/:id', async ({ params: { id } }) => {
    await delay()

    return HttpResponse.json({
      data: users.find(v => v.id === id)
    })
  }),

  http.post('/api/administrator/user', async ({ request }) => {
    await delay()

    const input = await request.json()
    const index = users.findIndex(v => v.username === input.username)
    if (index !== -1) {
      return HttpResponse.json(
        { message: input.username + ' 已存在' },
        { status: 400 }
      )
    }
    roles.push({
      id: Date.now().toString(),
      username: input.username,
      nickname: input.nickname,
      phone: input.phone,
      email: input.email,
      remark: input.remark,
      status: input.status,
      createAt: new Date(),
      role: roles.filter(v => v.id === input.roleId)
    })
    return HttpResponse.json()
  }),

  http.patch(
    '/api/administrator/user/:id',
    async ({ request, params: { id } }) => {
      await delay()

      const input = await request.json()
      const index = users.findIndex(v => v.id === id)
      if (index !== -1) {
        users[index] = {
          ...users[index],
          ...input
        }
        if (input.roleId) {
          users[index].role = roles.find(v => v.id === input.roleId)
        }
        return HttpResponse.json()
      }
    }
  ),

  http.delete('/api/administrator/user/:id', async ({ params: { id } }) => {
    await delay()

    const index = users.findIndex(v => v.id === id)
    if (index !== -1) {
      users.splice(index, 1)
      return HttpResponse.json()
    }
  }),

  http.post('/api/administrator/user/password', async () => {
    await delay()

    return HttpResponse.json()
  })
]
