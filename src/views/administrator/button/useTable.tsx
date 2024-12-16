import {
  removeButton,
  SearchButtonInput,
  SearchButtonOutput,
  updateButton
} from '@/apis/administrator/button'
import { searchMenu, SearchMenuOutput } from '@/apis/administrator/menu'
import { createDialog } from '@/components/common-dialog'
import { Column } from '@/components/common-table'
import Remove from '@/components/common-widget/Remove.vue'
import Space from '@/components/common-widget/Space.vue'
import Status from '@/components/common-widget/Status.vue'
import StatusFilter from '@/components/common-widget/StatusFilter.vue'
import Update from '@/components/common-widget/Update.vue'
import { Schema } from '@/components/form-item'
import { useAcl } from '@/hooks/useAcl'
import { buildTree } from '@/utils/array-to-tree'
import { Service } from '@/utils/service'
import { computed, ComputedRef, h, ref, Ref, VNode } from 'vue'
import { Permission } from './permission'
import UpdateForm from './Update.vue'

type Columns = Column<SearchButtonOutput>[]

type UseTable = (
  searchService: Service<SearchButtonInput, SearchButtonOutput[]>,
  searchParams: Ref<SearchButtonInput>
) => { columns: Columns; schemas: ComputedRef<Schema[]> }

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
      defaultComponent: ({ row }) => [h('div', row.menu.path)]
    },
    {
      prop: 'createAt',
      label: '创建时间'
    },
    {
      prop: 'status',
      label: '按钮状态',
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

  const menus = ref<SearchMenuOutput[]>([])
  searchMenu()
    .execute({})
    .then(({ data }) => (menus.value = data))

  const schemas: ComputedRef<Schema[]> = computed(() => [
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'name',
        label: '按钮名称'
      }
    },
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'code',
        label: '按钮代码'
      }
    },
    {
      tag: 'ElTreeSelect',
      tagProps: {
        class: '!w-[178px] sm:!w-full',
        value: searchParams.value.menuId,
        data: buildTree(
          menus.value.map(({ id, name, parentId, sort }) => ({
            id,
            parentId,
            sort,
            value: id,
            label: name
          }))
        ),
        checkStrictly: true,
        filterable: true,
        clearable: true,
        onClear: () => (searchParams.value.menuId = undefined)
      },
      formItemProps: {
        prop: 'menuId',
        label: '所属菜单'
      }
    }
  ])

  return { columns, schemas }
}
