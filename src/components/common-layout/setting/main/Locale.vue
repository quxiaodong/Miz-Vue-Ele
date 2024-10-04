<template>
  <el-form-item v-if="locales" :label="translate('common:layout.setting.lang')">
    <el-select :model-value="locale?.code" @change="toggleLocale">
      <el-option
        v-for="{ code, icon, name } in locales"
        :key="code"
        :value="code"
      >
        {{ icon }} {{ name }}
      </el-option>
      <template #label>{{ locale?.icon }} {{ locale?.name }}</template>
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import {
  locale,
  locales,
  toggleLocale
} from '@/components/common-locale/stores'
import { translate } from '@/utils/i18n'
</script>
