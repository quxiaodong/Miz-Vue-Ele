import {
  removeLocale,
  SearchLocaleInput,
  SearchLocaleOutput,
  updateLocale
} from '@/apis/language/locale'
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
import { h, Ref, VNode } from 'vue'
import { Permission } from './permission'
import UpdateForm from './Update.vue'

type Columns = Column<SearchLocaleOutput>[]

type UseTable = (
  searchService: Service<SearchLocaleInput, SearchLocaleOutput[]>,
  searchParams: Ref<SearchLocaleInput>
) => { columns: Columns; schemas: Schema[] }

export const useTable: UseTable = (searchService, searchParams) => {
  const canUpdate = useAcl([Permission.Update])
  const canRemove = useAcl([Permission.Remove])

  const columns: Columns = [
    {
      prop: 'id',
      label: '语言编号',
      defaultHide: true
    },
    {
      prop: 'name',
      label: '语言名称',
      alwaysShow: true
    },
    {
      prop: 'code',
      label: '语言代码'
    },
    {
      prop: 'icon',
      label: '语言图标',
      defaultComponent: ({ row }) => [
        h('div', { class: 'text-2xl' }, row.icon ?? '')
      ]
    },
    {
      prop: 'sort',
      label: '语言排序'
    },
    {
      prop: 'createAt',
      label: '创建时间'
    },
    {
      prop: 'status',
      label: '语言状态',
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
        const service = updateLocale(row.id)
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
            const service = removeLocale(row.id)
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
        label: '语言名称'
      }
    },
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'code',
        label: '语言代码'
      }
    }
  ]

  return { columns, schemas }
}
