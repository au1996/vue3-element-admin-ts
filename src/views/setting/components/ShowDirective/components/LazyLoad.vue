<template>
  <div class="mt-20">
    <h1>请禁用浏览器缓存，使用低速网络查看效果</h1>
    <img v-lazyLoad="url" width="600" height="400" />
    <img v-lazyLoad="url2" width="600" height="400" />
    <img v-lazyLoad="url3" width="600" height="400" />
    <img v-lazyLoad="url4" width="600" height="400" />
    <img v-lazyLoad="url5" width="600" height="400" />
    <img v-lazyLoad="url6" width="600" height="400" />
  </div>
</template>

<script lang="ts" setup>
const url = 'https://www.xyob.cn/cube/cube01.bmp'
const url2 = 'https://www.xyob.cn/cube/cube02.bmp'
const url3 = 'https://www.xyob.cn/cube/cube03.bmp'
const url4 = 'https://www.xyob.cn/cube/cube04.bmp'
const url5 = 'https://www.xyob.cn/cube/cube05.bmp'
const url6 = 'https://www.xyob.cn/cube/cube06.bmp'
</script>
