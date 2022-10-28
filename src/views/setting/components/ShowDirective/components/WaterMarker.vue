<template>
  <div class="mt-20">
    <img v-waterMarker="obj" :src="url" width="300" height="300" />
    <img v-waterMarker="obj" width="300" height="300" />
    <span v-waterMarker class="box"></span>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
const url = ref('https://www.xueyueob.cn/cube/cube06.bmp')
const obj = reactive({
  text: '雪月欧尼酱',
  color: 'skyblue'
})
</script>

<style lang="scss" scoped>
.box {
  display: inline-flex;
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
}
</style>
