<template>
  <iframe :src width="100%" height="100%" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const src = route.meta.link as string
</script>
