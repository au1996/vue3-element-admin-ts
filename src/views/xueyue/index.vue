<template>
  <h1 class="title">{{ msg }}</h1>
</template>

<script lang="ts" setup>
const msg = '雪月测试 scss 全局变量'
</script>

<style lang="scss" scoped>
.title {
  color: $yellow;
}
</style>
