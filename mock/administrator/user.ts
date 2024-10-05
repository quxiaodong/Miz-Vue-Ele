import Mock from 'mockjs'

Mock.mock(/\/administrator\/user/, function () {
  return {
    code: 200,
    total: 1,
    data: [
      {
        id: '6660234fd19a93e740a65c5d',
        status: 0,
        deleted: false,
        createAt: '2024-06-05T08:35:27.516Z',
        updateAt: '2024-06-05T08:35:27.516Z',
        username: 'guest'
      },
      {
        id: '6660234fd19a93e740a65c5c',
        status: 0,
        deleted: false,
        createAt: '2024-06-05T08:35:27.516Z',
        updateAt: '2024-06-05T08:35:27.516Z',
        username: 'admin',
        nickname: null,
        phone: null,
        email: null,
        avatar: null,
        remark: null,
        roleId: '6660234fd19a93e740a65c5b',
        role: {
          id: '6660234fd19a93e740a65c5b',
          status: 0,
          deleted: false,
          createAt: '2024-06-05T08:35:27.455Z',
          updateAt: '2024-06-05T08:35:27.455Z',
          name: '管理员',
          code: 'admin',
          menuIDs: [
            '6660234fd19a93e740a65c49',
            '6660234fd19a93e740a65c4a',
            '6660234fd19a93e740a65c4e',
            '6660234fd19a93e740a65c52',
            '6660234fd19a93e740a65c56'
          ],
          buttonIDs: [
            '6660234fd19a93e740a65c4b',
            '6660234fd19a93e740a65c4c',
            '6660234fd19a93e740a65c4d',
            '6660234fd19a93e740a65c4f',
            '6660234fd19a93e740a65c50',
            '6660234fd19a93e740a65c51',
            '6660234fd19a93e740a65c53',
            '6660234fd19a93e740a65c54',
            '6660234fd19a93e740a65c55',
            '6660234fd19a93e740a65c57',
            '6660234fd19a93e740a65c58',
            '6660234fd19a93e740a65c59',
            '6660234fd19a93e740a65c5a'
          ]
        }
      }
    ]
  }
})
