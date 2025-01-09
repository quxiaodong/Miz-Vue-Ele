import { delay, http, HttpResponse } from 'msw'
import qs from 'qs'
import { buttons } from './button'
import { menus } from './menu'

export const roles = [
  {
    id: '6775ee7e9202fd7a6e6a7bc2',
    name: '访客',
    code: 'guest',
    status: 0,
    createAt: '2025-01-02T01:40:14.366Z',
    menus,
    buttons: []
  },
  {
    id: '6775e5c72147004c70b5e656',
    name: '管理员',
    code: 'admin',
    status: 0,
    createAt: '2025-01-02T01:03:03.759Z',
    menus,
    buttons: [
      {
        id: '6775e11ee10d703543f8c922',
        name: '菜单新建',
        menuId: '6775e11ee10d703543f8c921'
      },
      {
        id: '6775e11ee10d703543f8c923',
        name: '菜单编辑',
        menuId: '6775e11ee10d703543f8c921'
      },
      {
        id: '6775e11ee10d703543f8c924',
        name: '菜单删除',
        menuId: '6775e11ee10d703543f8c921'
      },
      {
        id: '6775e11ee10d703543f8c926',
        name: '按钮新建',
        menuId: '6775e11ee10d703543f8c925'
      },
      {
        id: '6775e11ee10d703543f8c927',
        name: '按钮编辑',
        menuId: '6775e11ee10d703543f8c925'
      },
      {
        id: '6775e11ee10d703543f8c928',
        name: '按钮删除',
        menuId: '6775e11ee10d703543f8c925'
      },
      {
        id: '6775e11ee10d703543f8c92a',
        name: '角色新建',
        menuId: '6775e11ee10d703543f8c929'
      },
      {
        id: '6775e11ee10d703543f8c92b',
        name: '角色编辑',
        menuId: '6775e11ee10d703543f8c929'
      },
      {
        id: '6775e11ee10d703543f8c92c',
        name: '角色删除',
        menuId: '6775e11ee10d703543f8c929'
      },
      {
        id: '6775e11ee10d703543f8c92e',
        name: '用户新建',
        menuId: '6775e11ee10d703543f8c92d'
      },
      {
        id: '6775e11ee10d703543f8c92f',
        name: '用户编辑',
        menuId: '6775e11ee10d703543f8c92d'
      },
      {
        id: '6775e11ee10d703543f8c930',
        name: '用户删除',
        menuId: '6775e11ee10d703543f8c92d'
      },
      {
        id: '6775e11ee10d703543f8c931',
        name: '用户密码',
        menuId: '6775e11ee10d703543f8c92d'
      }
    ]
  }
]

export const handlers = [
  http.get('/api/administrator/role', async ({ request: { url } }) => {
    await delay()

    const params = qs.parse(url.split('?')[1])
    let result = [
      ...roles.sort(
        (a, b) =>
          new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
      )
    ]
    if (params.name) {
      result = result.filter(v => v.name.includes(params.name))
    }
    if (params.code) {
      result = result.filter(v => v.code.includes(params.code))
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

  http.get('/api/administrator/role/:id', async ({ params: { id } }) => {
    await delay()

    const role = { ...roles.find(v => v.id === id) }
    role.menuIDs = role.menus.map(v => v.id)
    role.buttonIDs = role.buttons.map(v => v.id)

    return HttpResponse.json({
      data: role
    })
  }),

  http.post('/api/administrator/role', async ({ request }) => {
    await delay()

    const input = await request.json()
    const index = roles.findIndex(v => v.code === input.code)
    if (index !== -1) {
      return HttpResponse.json(
        { message: input.code + ' 已存在' },
        { status: 400 }
      )
    }
    roles.push({
      id: Date.now().toString(),
      name: input.name,
      code: input.code,
      status: input.status,
      createAt: new Date(),
      menus: menus.filter(v => input.menuIDs?.includes(v.id)),
      buttons: buttons.filter(v => input.buttonIDs?.includes(v.id))
    })
    return HttpResponse.json()
  }),

  http.patch(
    '/api/administrator/role/:id',
    async ({ request, params: { id } }) => {
      await delay()

      const input = await request.json()
      const index = roles.findIndex(v => v.id === id)
      if (index !== -1) {
        roles[index] = {
          ...roles[index],
          ...input
        }
        if (input.menuIDs) {
          roles[index].menus = menus.filter(v => input.menuIDs?.includes(v.id))
        }
        if (input.buttonIDs) {
          roles[index].buttons = buttons.filter(v =>
            input.buttonIDs?.includes(v.id)
          )
        }
        return HttpResponse.json()
      }
    }
  ),

  http.delete('/api/administrator/role/:id', async ({ params: { id } }) => {
    await delay()

    const index = roles.findIndex(v => v.id === id)
    if (index !== -1) {
      roles.splice(index, 1)
      return HttpResponse.json()
    }
  })
]
