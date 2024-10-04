<template>
  <el-form label-width="auto" label-position="left">
    <Locale />
    <Dark />
    <AsideWidth />
    <Animate />
    <Color />
    <Weak />
    <Gray />
  </el-form>
</template>

<script setup lang="ts">
import Animate from './Animate.vue'
import AsideWidth from './AsideWidth.vue'
import Color from './Color.vue'
import Dark from './Dark.vue'
import Gray from './Gray.vue'
import Locale from './Locale.vue'
import Weak from './Weak.vue'
</script>
