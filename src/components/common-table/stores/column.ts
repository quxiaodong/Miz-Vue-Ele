import { createInjectionState } from '@vueuse/shared'
import { computed, ref } from 'vue'
import { Props } from '../index'

const [useProvideColumnStore, useColumnStore] = createInjectionState(
  (original: Props['columns']) => {
    const DEFAULT_SELECTED = original
      .filter(v => !v.defaultHide)
      .map(v => v.prop)

    const columns = ref([...original])

    const selected = ref(DEFAULT_SELECTED)

    const result = computed(() =>
      columns.value.filter(v => selected.value.includes(v.prop) || v.alwaysShow)
    )

    const all = computed(() => selected.value.length === original.length)

    const indeterminate = computed(
      () => !!selected.value.length && selected.value.length !== original.length
    )

    const select = (value: string[]) => (selected.value = value)

    const selectAll = (value: boolean) => {
      selected.value = value
        ? original.map(v => v.prop)
        : original.filter(v => v.alwaysShow).map(v => v.prop)
    }

    const reset = () => {
      columns.value = [...original]
      selected.value = DEFAULT_SELECTED
    }

    return {
      columns,
      selected,
      result,
      all,
      indeterminate,
      select,
      selectAll,
      reset
    }
  }
)

export { useProvideColumnStore }

export { useColumnStore }
