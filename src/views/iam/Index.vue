<template>
  <div
    class="page-bg flex h-full items-center justify-center bg-[url('@/images/background.svg')] bg-contain bg-center bg-no-repeat"
  >
    <el-space :size="20" class="fixed right-5 top-5">
      <common-dark />
      <common-locale />
    </el-space>
    <div class="w-80 sm:w-4/5">
      <img src="@/images/element-plus-logo.svg" class="mx-auto mb-10 w-1/2" />
      <router-view />
    </div>
  </div>
</template>
