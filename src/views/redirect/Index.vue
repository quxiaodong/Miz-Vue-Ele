<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

type Props = {
  redirect: string
}

const { redirect } = defineProps<Props>()

const router = useRouter()

router.replace(redirect)
</script>
