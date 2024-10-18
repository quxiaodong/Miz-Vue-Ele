import {
  removeMenu,
  SearchMenuInput,
  SearchMenuOutput,
  updateMenu
} from '@/apis/administrator/menu'
import { createDialog } from '@/components/common-dialog'
import { Column } from '@/components/common-table'
import Remove from '@/components/common-widget/Remove.vue'
import Space from '@/components/common-widget/Space.vue'
import Status from '@/components/common-widget/Status.vue'
import StatusFilter from '@/components/common-widget/StatusFilter.vue'
import Update from '@/components/common-widget/Update.vue'
import { Schema } from '@/components/form-item'
import { useAcl } from '@/hooks/useAcl'
import { Service } from '@/utils/service'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { h, Ref, VNode } from 'vue'
import { Permission } from './permission'
import UpdateForm from './Update.vue'

type Columns = Column<SearchMenuOutput>[]

type UseTable = (
  searchService: Service<SearchMenuInput, SearchMenuOutput[]>,
  searchParams: Ref<SearchMenuInput>
) => { columns: Columns; schemas: Schema[] }

export const useTable: UseTable = (searchService, searchParams) => {
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
      alwaysShow: true
    },
    {
      prop: 'path',
      label: '菜单路径'
    },
    {
      prop: 'icon',
      label: '菜单图标',
      defaultComponent: ({ row: { icon } }) => {
        return icon
          ? [
              h(ElIcon, { size: 20 }, () => [
                h(ElementPlusIconsVue[icon as keyof typeof ElementPlusIconsVue])
              ])
            ]
          : []
      }
    },
    {
      prop: 'parent',
      label: '父级菜单',
      defaultComponent: ({ row }) => [h('div', row.parent?.path)]
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
      tag: 'el-input',
      formItemProps: {
        prop: 'name',
        label: '菜单名称'
      }
    },
    {
      tag: 'el-input',
      formItemProps: {
        prop: 'path',
        label: '菜单路径'
      }
    }
  ]

  return { columns, schemas }
}
