<template>
  <div ref="chartRef" :style="{ width: width, height: height }"></div>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue'
import useChart from '@/hooks/useChart'

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  },
  eData: {
    type: Object,
    default: () => {
      return {
        title: {
          text: 'Echart 标题'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  }
})

const chartRef = ref()
const { myChart } = useChart(chartRef)
onMounted(() => {
  myChart.value?.setOption(props.eData)
})
</script>
