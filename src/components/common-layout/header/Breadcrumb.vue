<template>
  <el-breadcrumb v-if="matched.length" separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">
      {{ translate('common:menu.home') }}
    </el-breadcrumb-item>
    <el-breadcrumb-item v-for="({ meta }, index) in matched" :key="index">
      {{ translate({ stem: meta.stem, text: meta.name }) }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { translate } from '@/utils/i18n'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const matched = computed(() =>
  route.matched.filter(v => v.meta && v.meta.name && v.path !== '/')
)
</script>
