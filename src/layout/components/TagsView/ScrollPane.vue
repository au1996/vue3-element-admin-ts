<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScrollPane',
  emits: {
    scroll: null
  },
  data() {
    return {
      left: 0,
      tagAndTagSpacing: 4
    }
  },
  computed: {
    scrollWrapper(): any {
      return (this.$refs.scrollContainer as any).$refs.wrap$
    }
  },
  mounted() {
    this.scrollWrapper?.addEventListener('scroll', this.emitScroll, true)
  },
  beforeUnmount() {
    this.scrollWrapper?.removeEventListener('scroll', this.emitScroll)
  },
  methods: {
    handleScroll(e: any) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.scrollWrapper
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    },
    emitScroll() {
      this.$emit('scroll')
    },
    moveToTarget(currentTag: any) {
      const $container = (this.$refs.scrollContainer as any).$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = this.scrollWrapper
      const tagList = document.getElementsByClassName('tags-view-item') as any

      let firstTag = null
      let lastTag = null

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex = [...tagList].findIndex((item) => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft =
          nextTag.offsetLeft + nextTag.offsetWidth + this.tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.offsetLeft - this.tagAndTagSpacing

        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.scroll-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;

  :deep(.el-scrollbar__bar) {
    bottom: 0;
  }

  :deep(.el-scrollbar__wrap) {
    height: 49px;
  }
}
</style>
