<template>
  <img :src="avatar" alt="头像" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      name: 'xueyue'
    }
  },
  computed: {
    avatar() {
      return this.$store.state.user.avatar
    }
  }
})
</script>
