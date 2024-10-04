<template>
  <el-breadcrumb v-if="matched.length" :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">
      {{ $t('common:menu.home') }}
    </el-breadcrumb-item>
    <el-breadcrumb-item v-for="(match, index) in matched" :key="index">
      {{ match.meta?.stem ? $t(match.meta.stem) : match.meta?.breadcrumb }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const matched = computed(() =>
  route.matched.filter(v => v.meta && v.meta.breadcrumb && v.path !== '/')
)
</script>
