<template>
  <el-space direction="vertical" class="w-full" alignment="center">
    <div class="h-80 w-80 overflow-hidden rounded border">
      <VueCropper
        ref="cropper"
        :img="options.img"
        :auto-crop="options.autoCrop"
        :auto-crop-width="options.autoCropWidth"
        :auto-crop-height="options.autoCropHeight"
        :output-type="options.outputType"
      />
    </div>
    <div class="text-center">
      <el-button type="primary" @click="select">选择图片</el-button>
      <el-button
        type="primary"
        icon="RefreshLeft"
        @click="cropper.rotateLeft()"
      />
      <el-button
        type="primary"
        icon="RefreshRight"
        @click="cropper.rotateRight()"
      />
      <el-button type="primary" @click="crop">裁剪图片</el-button>
    </div>
  </el-space>
</template>

<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
import { VueCropper } from 'vue-cropper'
import 'vue-cropper/dist/index.css'

type Props = {
  src?: string
}

type Emits = {
  (e: 'crop', data: Blob): void
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()

const cropper = useTemplateRef<InstanceType<typeof VueCropper>>('cropper')

const options = reactive({
  img: props.src,
  autoCrop: true,
  autoCropWidth: 200,
  autoCropHeight: 200,
  outputType: 'png'
})

const select = () => {
  let input: HTMLInputElement | null = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = e => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) {
      input = null
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      options.img = reader.result as string
      input = null
    }
    reader.readAsDataURL(file)
  }
  input.click()
}

const crop = () =>
  cropper.value.getCropBlob((data: Blob) => emits('crop', data))
</script>
