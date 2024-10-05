const guestData = {
  id: '6660234fd19a93e740a65c5c',
  username: 'guest',
  region: {
    code: 'en'
  }
}

const adminData = {
  id: '6660234fd19a93e740a65c5c',
  username: 'admin',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  region: {
    code: 'zhCn'
  },
  role: {
    menus: [
      {
        id: '6660234fd19a93e740a65c49',
        path: '/administrator',
        name: '权限管理',
        icon: 'User',
        parentId: null
      },
      {
        id: '6660234fd19a93e740a65c4a',
        path: '/administrator/menu',
        name: '菜单列表',
        icon: null,
        parentId: '6660234fd19a93e740a65c49'
      },
      {
        id: '6660234fd19a93e740a65c4e',
        path: '/administrator/button',
        name: '按钮列表',
        icon: null,
        parentId: '6660234fd19a93e740a65c49'
      },
      {
        id: '6660234fd19a93e740a65c52',
        path: '/administrator/role',
        name: '角色列表',
        icon: null,
        parentId: '6660234fd19a93e740a65c49'
      },
      {
        id: '6660234fd19a93e740a65c56',
        path: '/administrator/user',
        name: '用户列表',
        icon: null,
        parentId: '6660234fd19a93e740a65c49'
      }
    ],
    buttons: [
      {
        id: '6660234fd19a93e740a65c4b',
        code: 'administrator_menu_create',
        name: '菜单新建'
      },
      {
        id: '6660234fd19a93e740a65c4c',
        code: 'administrator_menu_update',
        name: '菜单编辑'
      },
      {
        id: '6660234fd19a93e740a65c4d',
        code: 'administrator_menu_remove',
        name: '菜单删除'
      },
      {
        id: '6660234fd19a93e740a65c4f',
        code: 'administrator_button_create',
        name: '按钮新建'
      },
      {
        id: '6660234fd19a93e740a65c50',
        code: 'administrator_button_update',
        name: '按钮编辑'
      },
      {
        id: '6660234fd19a93e740a65c51',
        code: 'administrator_button_remove',
        name: '按钮删除'
      },
      {
        id: '6660234fd19a93e740a65c53',
        code: 'administrator_role_create',
        name: '角色新建'
      },
      {
        id: '6660234fd19a93e740a65c54',
        code: 'administrator_role_update',
        name: '角色编辑'
      },
      {
        id: '6660234fd19a93e740a65c55',
        code: 'administrator_role_remove',
        name: '角色删除'
      },
      {
        id: '6660234fd19a93e740a65c57',
        code: 'administrator_user_create',
        name: '用户新建'
      },
      {
        id: '6660234fd19a93e740a65c58',
        code: 'administrator_user_update',
        name: '用户编辑'
      },
      {
        id: '6660234fd19a93e740a65c59',
        code: 'administrator_user_remove',
        name: '用户删除'
      },
      {
        id: '6660234fd19a93e740a65c5a',
        code: 'administrator_user_password',
        name: '用户密码'
      }
    ]
  }
}

export const userInfo = function (options: any) {
  return {
    code: 200,
    data: adminData
  }
}

export const userPassword = function () {
  return { code: 200 }
}
