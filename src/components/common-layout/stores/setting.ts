import { ref } from 'vue'

export const visible = ref(false)

export const toggleVisible = (value?: boolean) => {
  visible.value = value ?? !visible.value
}
