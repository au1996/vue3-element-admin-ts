<template>
  <div ref="echartMain" :style="{ width: width, height: height }">雪月测试</div>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  PolarComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer,
  LineChart,
  PolarComponent,
  LegendComponent
])

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

let myChart: any = null
const echartMain = ref()
onMounted(() => {
  myChart = echarts.init(echartMain.value)
  myChart?.setOption(props.eData)
  window.addEventListener('resize', chartResize)
})

onUnmounted(() => {
  myChart?.dispose()
  window.removeEventListener('resize', chartResize)
})

function chartResize() {
  myChart?.resize()
}
</script>
