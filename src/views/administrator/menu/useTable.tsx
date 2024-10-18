import {
  removeMenu,
  SearchMenuInput,
  SearchMenuOutput,
  updateMenu
} from '@/apis/administrator/menu'
import { createDialog } from '@/components/common-dialog'
import { CommonIcons } from '@/components/common-icon'
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
import { ElIcon, ElSpace } from 'element-plus'
import { h, Ref, VNode } from 'vue'
import CreateForm from './Create.vue'
import { Permission } from './permission'
import UpdateForm from './Update.vue'

type Columns = Column<SearchMenuOutput>[]

type UseTable = (
  searchService: Service<SearchMenuInput, SearchMenuOutput[]>,
  searchParams: Ref<SearchMenuInput>
) => { columns: Columns; schemas: Schema[] }

export const useTable: UseTable = (searchService, searchParams) => {
  const canCreate = useAcl([Permission.Create])
  const canUpdate = useAcl([Permission.Update])
  const canRemove = useAcl([Permission.Remove])

  const columns: Columns = [
    {
      prop: 'id',
      label: '菜单编号',
      defaultHide: true
    },
    {
      prop: 'name',
      label: '菜单名称',
      alwaysShow: true,
      defaultComponent: ({ row: { icon, name } }) => [
        h(ElSpace, () => [
          icon &&
            h(ElIcon, { size: 20 }, () => [
              h(CommonIcons[icon as keyof typeof CommonIcons])
            ]),
          h('span', name)
        ])
      ]
    },
    {
      prop: 'path',
      label: '菜单路径',
      showOverflowTooltip: true
    },
    {
      prop: 'parent',
      label: '父级菜单',
      defaultHide: true,
      showOverflowTooltip: true,
      defaultComponent: ({ row }) => [h('div', row.parent?.path)]
    },
    {
      prop: 'acls',
      label: '权限标识',
      showOverflowTooltip: true
    },
    {
      prop: 'stem',
      label: '翻译标识',
      defaultHide: true
    },
    {
      prop: 'sort',
      label: '菜单顺序',
      defaultHide: true
    },
    {
      prop: 'createAt',
      label: '创建时间'
    },
    {
      prop: 'status',
      label: '菜单状态',
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
        const service = updateMenu(row.id)
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

  const permissions = [canCreate, canUpdate, canRemove].filter(v => v)
  if (permissions.length) {
    columns.push({
      prop: '$',
      label: '管理操作',
      width: Math.max(120, permissions.length * 80),
      defaultComponent: ({ row }) => [
        h(Space, () => {
          const vnodes: VNode[] = []

          if (canCreate) {
            vnodes.push(
              h(
                Link,
                {
                  onClick: () => {
                    const dialog = createDialog(
                      h(CreateForm, {
                        parentId: row.id,
                        onRefresh: () => {
                          dialog.close()
                          searchService.refresh()
                        }
                      }),
                      { type: 'create' }
                    )
                  }
                },
                () => '新增下级'
              )
            )
          }

          if (canUpdate) {
            vnodes.push(
              h(Update, {
                onClick: () => {
                  const dialog = createDialog(
                    h(UpdateForm, {
                      row,
                      onRefresh: () => {
                        dialog.close()
                        searchService.refresh()
                      }
                    }),
                    { type: 'update' }
                  )
                }
              })
            )
          }

          if (canRemove) {
            const service = removeMenu(row.id)
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
        label: '菜单名称'
      }
    },
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'path',
        label: '菜单路径'
      }
    }
  ]

  return { columns, schemas }
}
