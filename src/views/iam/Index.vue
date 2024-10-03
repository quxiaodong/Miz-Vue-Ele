<template>
  <div
    class="h-screen flex items-center justify-center page-bg bg-[url('@/images/background.svg')] bg-no-repeat bg-center bg-contain"
  >
    <el-space :size="20" class="fixed top-5 right-5">
      <common-dark />
      <common-locale />
    </el-space>
    <div class="w-80 sm:w-4/5">
      <img src="@/images/element-plus-logo.svg" class="w-1/2 mx-auto mb-10" />
      <router-view />
    </div>
  </div>
</template>
