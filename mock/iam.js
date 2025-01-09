import { delay, http, HttpResponse } from 'msw'
import { menus } from './administrator/menu'

export const handlers = [
  http.post('/api/iam/sign-up', async () => {
    await delay()

    return HttpResponse.json()
  }),

  http.post('/api/iam/sign-in', async ({ request }) => {
    await delay()

    const { username } = await request.json()
    if (username === 'admin' || username === 'guest') {
      return HttpResponse.json({
        data: {
          accessToken: username + '-' + Date.now(),
          refreshToken: username + '-' + Date.now()
        }
      })
    }
    return HttpResponse.json({ message: '账号密码不正确' }, { status: 400 })
  }),

  http.get('/api/iam/sign-out', async () => {
    await delay()

    return HttpResponse.json()
  }),

  http.get('/api/iam/user-info', async ({ request }) => {
    await delay()

    const token = request.headers.get('Authorization')
    if (token?.includes('admin')) {
      return HttpResponse.json({
        data: {
          username: 'admin',
          nickname: '',
          avatar: null,
          role: {
            menus,
            buttons: [
              {
                name: '菜单新建',
                code: 'create_administrator_menu'
              },
              {
                name: '菜单编辑',
                code: 'update_administrator_menu'
              },
              {
                name: '菜单删除',
                code: 'remove_administrator_menu'
              },
              {
                name: '按钮新建',
                code: 'create_administrator_button'
              },
              {
                name: '按钮编辑',
                code: 'update_administrator_button'
              },
              {
                name: '按钮删除',
                code: 'remove_administrator_button'
              },
              {
                name: '角色新建',
                code: 'create_administrator_role'
              },
              {
                name: '角色编辑',
                code: 'update_administrator_role'
              },
              {
                name: '角色删除',
                code: 'remove_administrator_role'
              },
              {
                name: '用户新建',
                code: 'create_administrator_user'
              },
              {
                name: '用户编辑',
                code: 'update_administrator_user'
              },
              {
                name: '用户删除',
                code: 'remove_administrator_user'
              },
              {
                name: '用户密码',
                code: 'password_administrator_user'
              }
            ]
          }
        }
      })
    }
    return HttpResponse.json({
      data: {
        username: 'guest',
        nickname: null,
        avatar: null,
        role: {
          menus,
          buttons: []
        }
      }
    })
  }),

  http.post('/api/iam/user-password', async () => {
    await delay()

    return HttpResponse.json()
  })
]
