<template>
  <h3>测试defineExpose：{{ msg }}</h3>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const msg = ref('defineExpose暴露的msg')

defineExpose({
  msg
})
</script>
