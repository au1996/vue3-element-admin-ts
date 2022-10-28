<template>
  <div>
    <h1 class="title">雪月测试 scss 全局变量</h1>
    <img :src="imgUrl" alt="" width="100" height="100" />
    <img :src="logoUrl" alt="" width="100" height="100" />
  </div>
</template>

<script lang="ts" setup>
import imgUrl from '@/assets/img/logo.png'
const logoUrl = new URL('@/assets/img/logo.png', import.meta.url).href

console.log(imgUrl)
console.log(logoUrl)
</script>

<style lang="scss" scoped>
.title {
  color: $yellow;
}
</style>
