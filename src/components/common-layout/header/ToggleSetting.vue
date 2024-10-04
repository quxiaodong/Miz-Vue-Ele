<template>
  <div class="placeholder" @click="toggleVisible(true)">
    <el-icon :size="18">
      <Setting />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { toggleVisible } from '../stores/setting'
</script>
