import {
  removeRole,
  SearchRoleInput,
  SearchRoleOutput,
  updateRole
} from '@/apis/administrator/role'
import { Column, DefaultScope } from '@/components/common-table'
import Remove from '@/components/common-widget/Remove.vue'
import Space from '@/components/common-widget/Space.vue'
import Status from '@/components/common-widget/Status.vue'
import StatusFilter from '@/components/common-widget/StatusFilter.vue'
import Update from '@/components/common-widget/Update.vue'
import { Schema } from '@/components/form-item'
import { useAcl } from '@/hooks/useAcl'
import { buildTree } from '@/utils/array-to-tree'
import { Service } from '@/utils/service'
import { ElCheckbox, ElTable, ElTableColumn } from 'element-plus'
import { h, Ref, VNode } from 'vue'
import { Permission } from './permission'

type Auth = SearchRoleOutput['menus'][number] & {
  children: SearchRoleOutput['menus']
  buttons: SearchRoleOutput['buttons']
}

type Columns = Column<SearchRoleOutput>[]

type UseTable = (
  searchService: Service<SearchRoleInput, SearchRoleOutput[]>,
  searchParams: Ref<SearchRoleInput>
) => { columns: Columns; schemas: Schema[] }

export const useTable: UseTable = (searchService, searchParams) => {
  const canUpdate = useAcl([Permission.Update])
  const canRemove = useAcl([Permission.Remove])

  const columns: Columns = [
    {
      prop: 'expand',
      label: '角色详情',
      type: 'expand',
      headerComponent: () => [h('span')],
      defaultComponent: ({ row }) => {
        const nodes = row.menus
          .filter(v => !v.acls)
          .map(v => ({
            ...v,
            buttons: row.buttons.filter(button => button.menuId === v.id)
          }))

        const auths = buildTree(nodes)

        return [
          h(
            'div',
            { class: 'px-2' },
            h(
              ElTable,
              {
                data: auths,
                rowKey: 'id',
                size: 'small',
                border: true,
                showHeader: false,
                maxHeight: 500
              },
              () => [
                h(ElTableColumn, (scope: DefaultScope<Auth>) => [
                  h(ElCheckbox, {
                    modelValue: true,
                    disabled: true,
                    label: scope.row.name
                  })
                ]),
                h(ElTableColumn, (scope: DefaultScope<Auth>) =>
                  scope.row.buttons.map(v => [
                    h(ElCheckbox, {
                      modelValue: true,
                      disabled: true,
                      label: v.name
                    })
                  ])
                )
              ]
            )
          )
        ]
      }
    },
    {
      prop: 'id',
      label: '角色编号',
      defaultHide: true
    },
    {
      prop: 'name',
      label: '角色名称',
      alwaysShow: true
    },
    {
      prop: 'code',
      label: '角色代码'
    },
    {
      prop: 'createAt',
      label: '创建时间'
    },
    {
      prop: 'status',
      label: '角色状态',
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
        const service = updateRole(row.id)
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

  const permissions = [canUpdate, canRemove].filter(v => v)
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
              h(Update, { href: `#/administrator/role/update?id=${row.id}` })
            )
          }

          if (canRemove) {
            const service = removeRole(row.id)
            vnodes.push(
              h(Remove, { service, onRefresh: searchService.refresh })
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
        prop: 'name',
        label: '角色名称'
      }
    },
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'code',
        label: '角色代码'
      }
    }
  ]

  return { columns, schemas }
}
