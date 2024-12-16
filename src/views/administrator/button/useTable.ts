import {
  removeButton,
  SearchButtonInput,
  SearchButtonOutput,
  updateButton
} from '@/apis/administrator/button'
import type { Column } from '@/components/common-table'
import Remove from '@/components/common-widget/Remove.vue'
import Space from '@/components/common-widget/Space.vue'
import Status from '@/components/common-widget/Status.vue'
import StatusFilter from '@/components/common-widget/StatusFilter.vue'
import { useAcl } from '@/hooks/useAcl'
import { Service } from '@/utils/service'
import { h, Ref, VNode } from 'vue'
import { Permission } from './permission'
import Update from './Update.vue'

type Columns = Column<SearchButtonOutput>[]

type UseTable = (
  searchService: Service<SearchButtonInput, SearchButtonOutput[]>,
  searchParams: Ref<SearchButtonInput>
) => { columns: Columns }

export const useTable: UseTable = (searchService, searchParams) => {
  const canUpdate = useAcl([Permission.Update])
  const canRemove = useAcl([Permission.Remove])

  const columns: Columns = [
    {
      prop: 'id',
      label: '按钮编号',
      defaultHide: true
    },
    {
      prop: 'name',
      label: '按钮名称',
      alwaysShow: true
    },
    {
      prop: 'code',
      label: '按钮代码'
    },
    {
      prop: 'menu',
      label: '所属菜单',
      defaultSlot: ({ row }) => [h('div', row.menu.path)]
    },
    {
      prop: 'createAt',
      label: '创建时间'
    },
    {
      prop: 'status',
      label: '按钮状态',
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
        const service = updateButton(row.id)
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
      defaultSlot: ({ row }) => [
        h(Space, () => {
          const vnodes: VNode[] = []

          if (canUpdate) {
            vnodes.push(h(Update, { row, onRefresh: searchService.refresh }))
          }

          if (canRemove) {
            const service = removeButton(row.id)
            vnodes.push(
              h(Remove, { service, onRefresh: searchService.refresh })
            )
          }

          return vnodes
        })
      ]
    })
  }

  return { columns }
}
