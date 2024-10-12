<template>
  <el-tooltip :content="$t('common:table.stripe')" placement="top">
    <el-switch
      :model-value="stripe"
      inline-prompt
      :active-text="$t('common:table.stripe.open')"
      :inactive-text="$t('common:table.stripe.close')"
      @change="toggle!"
    />
  </el-tooltip>
</template>

<script setup lang="ts">
import { useStripeStore } from '../stores/stripe'

const { stripe, toggle } = useStripeStore()!
</script>
