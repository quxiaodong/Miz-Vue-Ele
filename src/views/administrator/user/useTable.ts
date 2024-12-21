import {
  removeUser,
  SearchUserInput,
  SearchUserOutput,
  updateUser
} from '@/apis/administrator/user'
import type { Column } from '@/components/common-table'
import Remove from '@/components/common-widget/Remove.vue'
import Space from '@/components/common-widget/Space.vue'
import Status from '@/components/common-widget/Status.vue'
import StatusFilter from '@/components/common-widget/StatusFilter.vue'
import Update from '@/components/common-widget/Update.vue'
import { useAcl } from '@/hooks/useAcl'
import { Service } from '@/utils/service'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { h, Ref, VNode } from 'vue'
import Password from './Password.vue'
import { Permission } from './permission'

type Columns = Column<SearchUserOutput>[]

type UseTable = (
  searchService: Service<SearchUserInput, SearchUserOutput[]>,
  searchParams: Ref<SearchUserInput>
) => { columns: Columns }

export const useTable: UseTable = (searchService, searchParams) => {
  const canUpdate = useAcl([Permission.Update])
  const canRemove = useAcl([Permission.Remove])
  const canPassword = useAcl([Permission.Password])

  const columns: Columns = [
    {
      prop: 'expand',
      label: '用户详情',
      type: 'expand',
      headerSlot: () => [h('span')],
      defaultSlot: ({ row }) => {
        return [
          h(
            'div',
            { class: 'px-2' },
            h(
              ElDescriptions,
              { column: 2, border: true, labelWidth: 120 },
              () => [
                h(ElDescriptionsItem, { label: '联系方式' }, () => row.phone),
                h(ElDescriptionsItem, { label: '邮箱地址' }, () => row.email),
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
      defaultSlot: ({ row }) => [h('div', row.role?.name)]
    },
    {
      prop: 'createAt',
      label: '创建时间'
    },
    {
      prop: 'status',
      label: '用户状态',
      headerSlot: ({ column }) => [
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
      defaultSlot: ({ row }) => {
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
      defaultSlot: ({ row }) => [
        h(Space, () => {
          const vnodes: VNode[] = []

          if (canUpdate) {
            vnodes.push(
              h(Update, { href: `/#/administrator/user/update?id=${row.id}` })
            )
          }

          if (canRemove) {
            const service = removeUser(row.id)
            vnodes.push(
              h(Remove, { service, onRefresh: searchService.refresh })
            )
          }

          if (canPassword) {
            vnodes.push(h(Password, { row }))
          }

          return vnodes
        })
      ]
    })
  }

  return { columns }
}
