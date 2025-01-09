import { delay, http, HttpResponse } from 'msw'
import qs from 'qs'
import { menus } from './menu'

export const buttons = [
  {
    id: '6775e11ee10d703543f8c931',
    name: '用户密码',
    code: 'password_administrator_user',
    status: 0,
    createAt: '2025-01-02T00:43:10.224Z',
    menuId: '6775e11ee10d703543f8c92d',
    menu: {
      name: '用户列表',
      path: '/administrator/user'
    }
  },
  {
    id: '6775e11ee10d703543f8c930',
    name: '用户删除',
    code: 'remove_administrator_user',
    status: 0,
    createAt: '2025-01-02T00:43:10.223Z',
    menuId: '6775e11ee10d703543f8c92d',
    menu: {
      name: '用户列表',
      path: '/administrator/user'
    }
  },
  {
    id: '6775e11ee10d703543f8c92f',
    name: '用户编辑',
    code: 'update_administrator_user',
    status: 0,
    createAt: '2025-01-02T00:43:10.221Z',
    menuId: '6775e11ee10d703543f8c92d',
    menu: {
      name: '用户列表',
      path: '/administrator/user'
    }
  },
  {
    id: '6775e11ee10d703543f8c92e',
    name: '用户新建',
    code: 'create_administrator_user',
    status: 0,
    createAt: '2025-01-02T00:43:10.219Z',
    menuId: '6775e11ee10d703543f8c92d',
    menu: {
      name: '用户列表',
      path: '/administrator/user'
    }
  },
  {
    id: '6775e11ee10d703543f8c92c',
    name: '角色删除',
    code: 'remove_administrator_role',
    status: 0,
    createAt: '2025-01-02T00:43:10.215Z',
    menuId: '6775e11ee10d703543f8c929',
    menu: {
      name: '角色列表',
      path: '/administrator/role'
    }
  },
  {
    id: '6775e11ee10d703543f8c92b',
    name: '角色编辑',
    code: 'update_administrator_role',
    status: 0,
    createAt: '2025-01-02T00:43:10.213Z',
    menuId: '6775e11ee10d703543f8c929',
    menu: {
      name: '角色列表',
      path: '/administrator/role'
    }
  },
  {
    id: '6775e11ee10d703543f8c92a',
    name: '角色新建',
    code: 'create_administrator_role',
    status: 0,
    createAt: '2025-01-02T00:43:10.210Z',
    menuId: '6775e11ee10d703543f8c929',
    menu: {
      name: '角色列表',
      path: '/administrator/role'
    }
  },
  {
    id: '6775e11ee10d703543f8c928',
    name: '按钮删除',
    code: 'remove_administrator_button',
    status: 0,
    createAt: '2025-01-02T00:43:10.206Z',
    menuId: '6775e11ee10d703543f8c925',
    menu: {
      name: '按钮列表',
      path: '/administrator/button'
    }
  },
  {
    id: '6775e11ee10d703543f8c927',
    name: '按钮编辑',
    code: 'update_administrator_button',
    status: 0,
    createAt: '2025-01-02T00:43:10.204Z',
    menuId: '6775e11ee10d703543f8c925',
    menu: {
      name: '按钮列表',
      path: '/administrator/button'
    }
  },
  {
    id: '6775e11ee10d703543f8c926',
    name: '按钮新建',
    code: 'create_administrator_button',
    status: 0,
    createAt: '2025-01-02T00:43:10.202Z',
    menuId: '6775e11ee10d703543f8c925',
    menu: {
      name: '按钮列表',
      path: '/administrator/button'
    }
  },
  {
    id: '6775e11ee10d703543f8c924',
    name: '菜单删除',
    code: 'remove_administrator_menu',
    status: 0,
    createAt: '2025-01-02T00:43:10.197Z',
    menuId: '6775e11ee10d703543f8c921',
    menu: {
      name: '菜单列表',
      path: '/administrator/menu'
    }
  },
  {
    id: '6775e11ee10d703543f8c923',
    name: '菜单编辑',
    code: 'update_administrator_menu',
    status: 0,
    createAt: '2025-01-02T00:43:10.195Z',
    menuId: '6775e11ee10d703543f8c921',
    menu: {
      name: '菜单列表',
      path: '/administrator/menu'
    }
  },
  {
    id: '6775e11ee10d703543f8c922',
    name: '菜单新建',
    code: 'create_administrator_menu',
    status: 0,
    createAt: '2025-01-02T00:43:10.187Z',
    menuId: '6775e11ee10d703543f8c921',
    menu: {
      name: '菜单列表',
      path: '/administrator/menu'
    }
  }
]

export const handlers = [
  http.get('/api/administrator/button', async ({ request: { url } }) => {
    await delay()

    const params = qs.parse(url.split('?')[1])
    let result = [
      ...buttons.sort(
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
    if (params.menuId) {
      result = result.filter(v => v.menuId === params.menuId)
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

  http.get('/api/administrator/button/:id', async ({ params: { id } }) => {
    await delay()

    return HttpResponse.json({
      data: buttons.find(v => v.id === id)
    })
  }),

  http.post('/api/administrator/button', async ({ request }) => {
    await delay()

    const input = await request.json()
    const index = buttons.findIndex(v => v.code === input.code)
    if (index !== -1) {
      return HttpResponse.json(
        { message: input.code + ' 已存在' },
        { status: 400 }
      )
    }
    buttons.push({
      id: Date.now().toString(),
      name: input.name,
      code: input.code,
      status: input.status,
      createAt: new Date(),
      menuId: input.menuId,
      menu: menus.find(v => v.id === input.menuId)
    })
    return HttpResponse.json()
  }),

  http.patch(
    '/api/administrator/button/:id',
    async ({ request, params: { id } }) => {
      await delay()

      const input = await request.json()
      const index = buttons.findIndex(v => v.id === id)
      if (index !== -1) {
        buttons[index] = {
          ...buttons[index],
          ...input
        }
        if (input.menuId) {
          buttons[index].menu = menus.find(v => v.id === input.menuId)
        }
        return HttpResponse.json()
      }
    }
  ),

  http.delete('/api/administrator/button/:id', async ({ params: { id } }) => {
    await delay()

    const index = buttons.findIndex(v => v.id === id)
    if (index !== -1) {
      buttons.splice(index, 1)
      return HttpResponse.json()
    }
  })
]
