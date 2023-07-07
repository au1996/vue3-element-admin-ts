import { onMounted, onUnmounted, Ref } from 'vue'
import * as echarts from 'echarts'

export default function useChart(chartRef: Ref) {
  const myChart: { value: echarts.ECharts | null } = {
    value: null
  }

  function chartResize() {
    myChart.value?.resize()
  }

  onMounted(() => {
    if (!myChart.value) {
      myChart.value = echarts.init(chartRef.value)
      window.addEventListener('resize', chartResize)
    }
  })

  onUnmounted(() => {
    myChart.value?.dispose()
    myChart.value = null
    window.removeEventListener('resize', chartResize)
  })

  return {
    myChart
  }
}
