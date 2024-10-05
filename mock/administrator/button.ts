import Mock from 'mockjs'

Mock.mock(/\/administrator\/button/, function () {
  return {
    code: 200,
    total: 13,
    data: [
      {
        id: '6660234fd19a93e740a65c5a',
        status: 0,
        deleted: false,
        createAt: '2024-06-05T08:35:27.450Z',
        updateAt: '2024-06-05T08:35:27.450Z',
        name: '用户密码',
        code: 'administrator_user_password',
        menuId: '6660234fd19a93e740a65c56',
        menu: {
          id: '6660234fd19a93e740a65c56',
          status: 0,
          deleted: false,
          createAt: '2024-06-05T08:35:27.441Z',
          updateAt: '2024-06-11T02:14:15.346Z',
          name: '用户列表',
          path: '/administrator/user',
          icon: null,
          parentId: '6660234fd19a93e740a65c49'
        }
      },
      {
        id: '6660234fd19a93e740a65c59',
        status: 0,
        deleted: false,
        createAt: '2024-06-05T08:35:27.448Z',
        updateAt: '2024-06-05T08:35:27.448Z',
        name: '用户删除',
        code: 'administrator_user_remove',
        menuId: '6660234fd19a93e740a65c56',
        menu: {
          id: '6660234fd19a93e740a65c56',
          status: 0,
          deleted: false,
          createAt: '2024-06-05T08:35:27.441Z',
          updateAt: '2024-06-11T02:14:15.346Z',
          name: '用户列表',
          path: '/administrator/user',
          icon: null,
          parentId: '6660234fd19a93e740a65c49'
        }
      },
      {
        id: '6660234fd19a93e740a65c58',
        status: 0,
        deleted: false,
        createAt: '2024-06-05T08:35:27.446Z',
        updateAt: '2024-06-05T08:35:27.446Z',
        name: '用户编辑',
        code: 'administrator_user_update',
        menuId: '6660234fd19a93e740a65c56',
        menu: {
          id: '6660234fd19a93e740a65c56',
          status: 0,
          deleted: false,
          createAt: '2024-06-05T08:35:27.441Z',
          updateAt: '2024-06-11T02:14:15.346Z',
          name: '用户列表',
          path: '/administrator/user',
          icon: null,
          parentId: '6660234fd19a93e740a65c49'
        }
      },
      {
        id: '6660234fd19a93e740a65c57',
        status: 0,
        deleted: false,
        createAt: '2024-06-05T08:35:27.444Z',
        updateAt: '2024-06-05T08:35:27.444Z',
        name: '用户新建',
        code: 'administrator_user_create',
        menuId: '6660234fd19a93e740a65c56',
        menu: {
          id: '6660234fd19a93e740a65c56',
          status: 0,
          deleted: false,
          createAt: '2024-06-05T08:35:27.441Z',
          updateAt: '2024-06-11T02:14:15.346Z',
          name: '用户列表',
          path: '/administrator/user',
          icon: null,
          parentId: '6660234fd19a93e740a65c49'
        }
      },
      {
        id: '6660234fd19a93e740a65c55',
        status: 0,
        deleted: false,
        createAt: '2024-06-05T08:35:27.440Z',
        updateAt: '2024-06-05T08:35:27.440Z',
        name: '角色删除',
        code: 'administrator_role_remove',
        menuId: '6660234fd19a93e740a65c52',
        menu: {
          id: '6660234fd19a93e740a65c52',
          status: 0,
          deleted: false,
          createAt: '2024-06-05T08:35:27.433Z',
          updateAt: '2024-06-05T08:35:27.433Z',
          name: '角色列表',
          path: '/administrator/role',
          icon: null,
          parentId: '6660234fd19a93e740a65c49'
        }
      },
      {
        id: '6660234fd19a93e740a65c54',
        status: 0,
        deleted: false,
        createAt: '2024-06-05T08:35:27.438Z',
        updateAt: '2024-06-05T08:35:27.438Z',
        name: '角色编辑',
        code: 'administrator_role_update',
        menuId: '6660234fd19a93e740a65c52',
        menu: {
          id: '6660234fd19a93e740a65c52',
          status: 0,
          deleted: false,
          createAt: '2024-06-05T08:35:27.433Z',
          updateAt: '2024-06-05T08:35:27.433Z',
          name: '角色列表',
          path: '/administrator/role',
          icon: null,
          parentId: '6660234fd19a93e740a65c49'
        }
      },
      {
        id: '6660234fd19a93e740a65c53',
        status: 0,
        deleted: false,
        createAt: '2024-06-05T08:35:27.435Z',
        updateAt: '2024-06-05T08:35:27.435Z',
        name: '角色新建',
        code: 'administrator_role_create',
        menuId: '6660234fd19a93e740a65c52',
        menu: {
          id: '6660234fd19a93e740a65c52',
          status: 0,
          deleted: false,
          createAt: '2024-06-05T08:35:27.433Z',
          updateAt: '2024-06-05T08:35:27.433Z',
          name: '角色列表',
          path: '/administrator/role',
          icon: null,
          parentId: '6660234fd19a93e740a65c49'
        }
      },
      {
        id: '6660234fd19a93e740a65c51',
        status: 0,
        deleted: false,
        createAt: '2024-06-05T08:35:27.430Z',
        updateAt: '2024-06-05T08:35:27.430Z',
        name: '按钮删除',
        code: 'administrator_button_remove',
        menuId: '6660234fd19a93e740a65c4e',
        menu: {
          id: '6660234fd19a93e740a65c4e',
          status: 0,
          deleted: false,
          createAt: '2024-06-05T08:35:27.410Z',
          updateAt: '2024-06-05T08:35:27.410Z',
          name: '按钮列表',
          path: '/administrator/button',
          icon: null,
          parentId: '6660234fd19a93e740a65c49'
        }
      },
      {
        id: '6660234fd19a93e740a65c50',
        status: 0,
        deleted: false,
        createAt: '2024-06-05T08:35:27.424Z',
        updateAt: '2024-06-05T08:35:27.424Z',
        name: '按钮编辑',
        code: 'administrator_button_update',
        menuId: '6660234fd19a93e740a65c4e',
        menu: {
          id: '6660234fd19a93e740a65c4e',
          status: 0,
          deleted: false,
          createAt: '2024-06-05T08:35:27.410Z',
          updateAt: '2024-06-05T08:35:27.410Z',
          name: '按钮列表',
          path: '/administrator/button',
          icon: null,
          parentId: '6660234fd19a93e740a65c49'
        }
      },
      {
        id: '6660234fd19a93e740a65c4f',
        status: 0,
        deleted: false,
        createAt: '2024-06-05T08:35:27.416Z',
        updateAt: '2024-06-05T08:35:27.416Z',
        name: '按钮新建',
        code: 'administrator_button_create',
        menuId: '6660234fd19a93e740a65c4e',
        menu: {
          id: '6660234fd19a93e740a65c4e',
          status: 0,
          deleted: false,
          createAt: '2024-06-05T08:35:27.410Z',
          updateAt: '2024-06-05T08:35:27.410Z',
          name: '按钮列表',
          path: '/administrator/button',
          icon: null,
          parentId: '6660234fd19a93e740a65c49'
        }
      },
      {
        id: '6660234fd19a93e740a65c4d',
        status: 0,
        deleted: false,
        createAt: '2024-06-05T08:35:27.405Z',
        updateAt: '2024-06-05T08:35:27.405Z',
        name: '菜单删除',
        code: 'administrator_menu_remove',
        menuId: '6660234fd19a93e740a65c4a',
        menu: {
          id: '6660234fd19a93e740a65c4a',
          status: 0,
          deleted: false,
          createAt: '2024-06-05T08:35:27.383Z',
          updateAt: '2024-06-05T08:35:27.383Z',
          name: '菜单列表',
          path: '/administrator/menu',
          icon: null,
          parentId: '6660234fd19a93e740a65c49'
        }
      },
      {
        id: '6660234fd19a93e740a65c4c',
        status: 0,
        deleted: false,
        createAt: '2024-06-05T08:35:27.399Z',
        updateAt: '2024-06-05T08:35:27.399Z',
        name: '菜单编辑',
        code: 'administrator_menu_update',
        menuId: '6660234fd19a93e740a65c4a',
        menu: {
          id: '6660234fd19a93e740a65c4a',
          status: 0,
          deleted: false,
          createAt: '2024-06-05T08:35:27.383Z',
          updateAt: '2024-06-05T08:35:27.383Z',
          name: '菜单列表',
          path: '/administrator/menu',
          icon: null,
          parentId: '6660234fd19a93e740a65c49'
        }
      },
      {
        id: '6660234fd19a93e740a65c4b',
        status: 0,
        deleted: false,
        createAt: '2024-06-05T08:35:27.392Z',
        updateAt: '2024-06-05T08:35:27.392Z',
        name: '菜单新建',
        code: 'administrator_menu_create',
        menuId: '6660234fd19a93e740a65c4a',
        menu: {
          id: '6660234fd19a93e740a65c4a',
          status: 0,
          deleted: false,
          createAt: '2024-06-05T08:35:27.383Z',
          updateAt: '2024-06-05T08:35:27.383Z',
          name: '菜单列表',
          path: '/administrator/menu',
          icon: null,
          parentId: '6660234fd19a93e740a65c49'
        }
      }
    ]
  }
})
