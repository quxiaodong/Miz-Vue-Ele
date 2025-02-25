import {
  searchLocale,
  SearchLocaleOutput,
  updateLocale
} from '@/apis/language/locale'
import {
  removeTranslation,
  SearchTranslationInput,
  SearchTranslationOutput
} from '@/apis/language/translation'
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
import { computed, h, ref, Ref, VNode } from 'vue'
import { Permission } from './permission'
import UpdateForm from './Update.vue'

type Columns = Column<SearchTranslationOutput>[]

type UseTable = (
  searchService: Service<SearchTranslationInput, SearchTranslationOutput[]>,
  searchParams: Ref<SearchTranslationInput>
) => { columns: Columns; schemas: Schema[] }

export const useTable: UseTable = (searchService, searchParams) => {
  const canUpdate = useAcl([Permission.Update])
  const canRemove = useAcl([Permission.Remove])

  const columns: Columns = [
    {
      prop: 'id',
      label: '翻译编号',
      defaultHide: true
    },
    {
      prop: 'stem',
      label: '翻译标识',
      alwaysShow: true
    },
    {
      prop: 'text',
      label: '翻译内容',
      showOverflowTooltip: true
    },
    {
      prop: 'locale',
      label: '所属语言',
      defaultComponent: ({ row: { locale } }) => [
        h('div', locale.icon + ' ' + locale.name)
      ]
    },
    {
      prop: 'createAt',
      label: '创建时间'
    },
    {
      prop: 'status',
      label: '翻译状态',
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
            const service = removeTranslation(row.id)
            vnodes.push(
              h(Remove, { service, onRefresh: searchService.refresh })
            )
          }

          return vnodes
        })
      ]
    })
  }

  const locales = ref<SearchLocaleOutput[]>([])
  searchLocale()
    .execute({})
    .then(({ data }) => (locales.value = data))

  const schemas: Schema[] = [
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'stem',
        label: '翻译标识'
      }
    },
    {
      tag: 'ElInput',
      formItemProps: {
        prop: 'text',
        label: '翻译内容'
      }
    },
    {
      tag: 'ElSelect',
      tagProps: {
        class: '!w-[178px] sm:!w-full',
        clearable: true,
        onClear: () => (searchParams.value.localeId = undefined)
      },
      formItemProps: {
        prop: 'localeId',
        label: '所属语言'
      },
      options: computed(() =>
        locales.value.map(({ id, icon, name }) => ({
          value: id,
          label: icon + ' ' + name
        }))
      )
    }
  ]

  return { columns, schemas }
}
