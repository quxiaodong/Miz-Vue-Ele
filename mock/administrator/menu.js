import { delay, http, HttpResponse } from 'msw'
import qs from 'qs'

export const menus = [
  {
    id: '6775e11ee1adc0d703543f8c92011',
    name: '翻译配置',
    path: '/language',
    icon: 'IconLocale',
    component: 'Layout',
    status: 0,
    sort: 3,
    createAt: '2025-01-02T00:43:10.151Z',
    parentId: null,
    parent: null
  },
  {
    id: '6775e11ee10d111703543f8c920111',
    name: '语言列表',
    path: '/language/locale',
    icon: null,
    sort: 0,
    stem: '',
    acls: '',
    hideInMenu: false,
    component: 'language/locale/Index',
    status: 0,
    createAt: '2025-01-02T00:43:10.151Z',
    parentId: '6775e11ee1adc0d703543f8c92011',
    parent: {
      name: '翻译配置',
      path: '/language'
    }
  },
  {
    id: '6775e11ee10d703543f118c920112',
    name: '翻译列表',
    path: '/language/translation',
    icon: null,
    sort: 1,
    stem: '',
    acls: '',
    hideInMenu: false,
    component: 'language/translation/Index',
    status: 0,
    createAt: '2025-01-02T00:43:10.151Z',
    parentId: '6775e11ee1adc0d703543f8c92011',
    parent: {
      name: '翻译配置',
      path: '/language'
    }
  },
  {
    id: '6775e11ee10d703543f8c92012',
    name: 'Github外链',
    path: '/github',
    link: 'https://github.com/quxiaodong',
    icon: 'Link',
    sort: 1,
    status: 0,
    createAt: '2025-01-02T00:43:10.151Z',
    parentId: null,
    parent: null
  },
  {
    id: '6775e11ee10d703543f8c92013',
    name: 'Github内链',
    path: '/github-inner',
    link: 'https://github.com/quxiaodong',
    component: 'iframe/Index',
    embed: true,
    icon: 'Link',
    sort: 2,
    status: 0,
    createAt: '2025-01-02T00:43:10.151Z',
    parentId: null,
    parent: null
  },
  {
    id: '6775e11ee10d703543f8c92d-update',
    name: '编辑用户',
    path: '/administrator/user/update',
    icon: null,
    sort: null,
    stem: '',
    acls: 'update_administrator_user',
    hideInMenu: true,
    component: 'administrator/user/Update',
    status: 0,
    createAt: '2025-01-02T00:43:10.217Z',
    parentId: '6775e11ee10d703543f8c920',
    parent: {
      name: '权限管理',
      path: '/administrator'
    }
  },
  {
    id: '6775e11ee10d703543f8c92d-create',
    name: '新建用户',
    path: '/administrator/user/create',
    icon: null,
    sort: null,
    stem: '',
    acls: 'create_administrator_user',
    hideInMenu: true,
    component: 'administrator/user/Create',
    status: 0,
    createAt: '2025-01-02T00:43:10.217Z',
    parentId: '6775e11ee10d703543f8c920',
    parent: {
      name: '权限管理',
      path: '/administrator'
    }
  },
  {
    id: '6775e11ee10d703543f8c92d',
    name: '用户列表',
    path: '/administrator/user',
    icon: null,
    sort: 1,
    stem: '',
    acls: '',
    hideInMenu: false,
    component: 'administrator/user/Index',
    status: 0,
    createAt: '2025-01-02T00:43:10.217Z',
    parentId: '6775e11ee10d703543f8c920',
    parent: {
      name: '权限管理',
      path: '/administrator'
    }
  },
  {
    id: '6775e11ee10d703543f8c929-update',
    name: '编辑角色',
    path: '/administrator/role/update',
    icon: null,
    sort: null,
    stem: '',
    acls: 'update_administrator_role',
    hideInMenu: true,
    component: 'administrator/role/Update',
    status: 0,
    createAt: '2025-01-02T00:43:10.208Z',
    parentId: '6775e11ee10d703543f8c920',
    parent: {
      name: '权限管理',
      path: '/administrator'
    }
  },
  {
    id: '6775e11ee10d703543f8c929-create',
    name: '新建角色',
    path: '/administrator/role/create',
    icon: null,
    sort: null,
    stem: '',
    acls: 'create_administrator_role',
    hideInMenu: true,
    component: 'administrator/role/Create',
    status: 0,
    createAt: '2025-01-02T00:43:10.208Z',
    parentId: '6775e11ee10d703543f8c920',
    parent: {
      name: '权限管理',
      path: '/administrator'
    }
  },
  {
    id: '6775e11ee10d703543f8c929',
    name: '角色列表',
    path: '/administrator/role',
    icon: null,
    sort: 2,
    stem: '',
    acls: '',
    hideInMenu: false,
    component: 'administrator/role/Index',
    status: 0,
    createAt: '2025-01-02T00:43:10.208Z',
    parentId: '6775e11ee10d703543f8c920',
    parent: {
      name: '权限管理',
      path: '/administrator'
    }
  },
  {
    id: '6775e11ee10d703543f8c925',
    name: '按钮列表',
    path: '/administrator/button',
    icon: null,
    sort: 3,
    stem: '',
    acls: '',
    hideInMenu: false,
    component: 'administrator/button/Index',
    status: 0,
    createAt: '2025-01-02T00:43:10.199Z',
    parentId: '6775e11ee10d703543f8c920',
    parent: {
      name: '权限管理',
      path: '/administrator'
    }
  },
  {
    id: '6775e11ee10d703543f8c921',
    name: '菜单列表',
    path: '/administrator/menu',
    icon: null,
    sort: 4,
    stem: '',
    acls: '',
    hideInMenu: false,
    component: 'administrator/menu/Index',
    status: 0,
    createAt: '2025-01-02T00:43:10.185Z',
    parentId: '6775e11ee10d703543f8c920',
    parent: {
      name: '权限管理',
      path: '/administrator'
    }
  },
  {
    id: '6775e11ee10d703543f8c920',
    name: '权限管理',
    path: '/administrator',
    icon: 'User',
    sort: 0,
    stem: '',
    acls: '',
    hideInMenu: false,
    component: 'Layout',
    status: 0,
    createAt: '2025-01-02T00:43:10.151Z',
    parentId: null,
    parent: null
  }
]

export const handlers = [
  http.get('/api/administrator/menu', async ({ request: { url } }) => {
    await delay()

    const params = qs.parse(url.split('?')[1])
    let result = [
      ...menus.sort(
        (a, b) =>
          new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
      )
    ]
    if (params.name) {
      result = result.filter(v => v.name.includes(params.name))
    }
    if (params.path) {
      result = result.filter(v => v.path.includes(params.path))
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

  http.get('/api/administrator/menu/:id', async ({ params: { id } }) => {
    await delay()

    return HttpResponse.json({
      data: menus.find(v => v.id === id)
    })
  }),

  http.post('/api/administrator/menu', async ({ request }) => {
    await delay()

    const input = await request.json()
    const index = menus.findIndex(v => v.path === input.path)
    if (index !== -1) {
      return HttpResponse.json(
        { message: input.path + ' 已存在' },
        { status: 400 }
      )
    }
    menus.push({
      id: Date.now().toString(),
      name: input.name,
      path: input.path,
      icon: input.icon,
      status: input.status,
      createAt: new Date(),
      parentId: input.parentId,
      parent: menus.find(v => v.id === input.parentId)
    })
    return HttpResponse.json()
  }),

  http.patch(
    '/api/administrator/menu/:id',
    async ({ request, params: { id } }) => {
      await delay()

      const input = await request.json()
      const index = menus.findIndex(v => v.id === id)
      if (index !== -1) {
        menus[index] = {
          ...menus[index],
          ...input
        }
        if (input.parentId) {
          menus[index].parent = menus.find(v => v.id === input.parentId)
        }
        return HttpResponse.json()
      }
    }
  ),

  http.delete('/api/administrator/menu/:id', async ({ params: { id } }) => {
    await delay()

    const index = menus.findIndex(v => v.id === id)
    if (index !== -1) {
      menus.splice(index, 1)
      return HttpResponse.json()
    }
  })
]
