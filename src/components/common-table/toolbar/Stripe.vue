<template>
  <el-tooltip
    placement="top"
    :content="translate({ stem: 'common:table.stripe' })"
  >
    <el-switch
      :model-value="stripe"
      inline-prompt
      :active-text="translate({ stem: 'common:table.stripe.open' })"
      :inactive-text="translate({ stem: 'common:table.stripe.close' })"
      @change="toggle!"
    />
  </el-tooltip>
</template>

<script setup lang="ts">
import { translate } from '@/utils/i18n'
import { useStripeStore } from '../stores/stripe'

const { stripe, toggle } = useStripeStore()!
</script>
