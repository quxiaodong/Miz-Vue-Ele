import {
  removeUser,
  SearchUserInput,
  SearchUserOutput,
  updateUser
} from '@/apis/administrator/user'
import { createDialog } from '@/components/common-dialog'
import { Column } from '@/components/common-table'
import Link from '@/components/common-widget/Link.vue'
import Remove from '@/components/common-widget/Remove.vue'
import Space from '@/components/common-widget/Space.vue'
import Status from '@/components/common-widget/Status.vue'
import StatusFilter from '@/components/common-widget/StatusFilter.vue'
import Update from '@/components/common-widget/Update.vue'
import { Schema } from '@/components/form-item'
import { useAcl } from '@/hooks/useAcl'
import { Service } from '@/utils/service'
import { ElAvatar, ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { h, Ref, VNode } from 'vue'
import Password from './Password.vue'
import { Permission } from './permission'

type Columns = Column<SearchUserOutput>[]

type UseTable = (
  searchService: Service<SearchUserInput, SearchUserOutput[]>,
  searchParams: Ref<SearchUserInput>
) => { columns: Columns; schemas: Schema[] }

export const useTable: UseTable = (searchService, searchParams) => {
  const canUpdate = useAcl([Permission.Update])
  const canRemove = useAcl([Permission.Remove])
  const canPassword = useAcl([Permission.Password])

  const columns: Columns = [
    {
      prop: 'expand',
      label: '用户详情',
      type: 'expand',
      headerComponent: () => [h('span')],
      defaultComponent: ({ row }) => {
        return [
          h(
            'div',
            { class: 'px-2' },
            h(
              ElDescriptions,
              {
                border: true,
                direction: 'vertical'
              },
              () => [
                h(
                  ElDescriptionsItem,
                  {
                    rowspan: 2,
                    align: 'center'
                  },
                  () =>
                    h(ElAvatar, {
                      src: row.avatar,
                      size: 'large',
                      icon: 'Avatar',
                      shape: 'square',
                      style: '--el-avatar-icon-size: 40px'
                    })
                ),
                h(
                  ElDescriptionsItem,
                  { label: '联系方式', width: '50%' },
                  () => row.phone
                ),
                h(
                  ElDescriptionsItem,
                  { label: '邮箱地址', width: '50%' },
                  () => row.email
                ),
                h(ElDescriptionsItem, { label: '备注信息' }, () => row.remark)
              ]
            )
          )
        ]
      }
    },
    {
      prop: 'id',
      label: '用户编号',
      defaultHide: true
    },
    {
      prop: 'username',
      label: '登录账号',
      alwaysShow: true
    },
    {
      prop: 'nickname',
      label: '用户昵称'
    },
    {
      prop: 'role',
      label: '所属角色',
      defaultComponent: ({ row }) => [h('div', row.role?.name)]
    },
    {
      prop: 'createAt',
      label: '创建时间'
    },
    {
      prop: 'status',
      label: '用户状态',
      headerComponent: ({ column }) => [
        h(StatusFilter, {
          column,
          status: searchParams.value.status,
          onChange(value) {
            searchParams.value.pageNo = 1
            searchParams.value.status = value
            searchService.execute(searchParams.value)
          }
        })
      ],
      defaultComponent: ({ row }) => {
        const service = updateUser(row.id)
        return [
          h(Status, {
            service,
            status: row.status,
            permission: [Permission.Update],
            onRefresh: searchService.refresh
          })
        ]
      }
    }
  ]

  const permissions = [canUpdate, canRemove, canPassword].filter(v => v)
  if (permissions.length) {
    columns.push({
      prop: '$',
      label: '管理操作',
      width: Math.max(120, permissions.length * 80),
      defaultComponent: ({ row }) => [
        h(Space, () => {
          const vnodes: VNode[] = []

          if (canUpdate) {
            vnodes.push(
              h(Update, { href: `#/administrator/user/update?id=${row.id}` })
            )
          }

          if (canRemove) {
            const service = removeUser(row.id)
            vnodes.push(
              h(Remove, { service, onRefresh: searchService.refresh })
            )
          }

          if (canPassword) {
            vnodes.push(
              h(
                Link,
                {
                  onClick: () => {
                    const dialog = createDialog(
                      h(Password, { row, onClose: () => dialog.close() }),
                      { title: '修改密码' }
                    )
                  }
                },
                () => '修改密码'
              )
            )
          }

          return vnodes
        })
      ]
    })
  }

  const schemas: Schema[] = [
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'username',
        label: '登录账号'
      }
    },
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'nickname',
        label: '用户昵称'
      }
    },
    {
      extra: true,
      tag: 'ElInput',
      formItemProps: {
        prop: 'phone',
        label: '联系方式'
      }
    },
    {
      extra: true,
      tag: 'ElInput',
      formItemProps: {
        prop: 'email',
        label: '邮箱地址'
      }
    }
  ]

  return { columns, schemas }
}
