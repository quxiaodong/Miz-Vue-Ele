<template>
  <div>
    <Table v-show="selected.length" />
    <Empty v-show="!selected.length" />
  </div>
</template>

<script setup lang="ts">
import { useColumnStore } from '../stores/column'
import Empty from './Empty.vue'
import Table from './Table.vue'

const { selected } = useColumnStore()!
</script>
