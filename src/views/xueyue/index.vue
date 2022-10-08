<template>
  <div>
    <h1 class="title">测试 scss 全局变量</h1>
    <br />
    <el-button type="primary" @click="onMessage">点击提示msg</el-button>
    <br />
    <br />
    <Message ref="messageRef" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import Message from './component/Message.vue'

const messageRef = ref<InstanceType<typeof Message> | null>(null)

const onMessage = () => {
  ElMessage.success(messageRef.value?.msg)
}
</script>

<style lang="scss" scoped>
.title {
  color: $yellow;
  background-color: $panGreen;
}
</style>
