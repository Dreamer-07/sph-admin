<template>
  <div ref="line-charts" class="line-charts"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'BarCharts',
  mounted() {
    const lineEcharts = echarts.init(this.$refs['line-charts'])
    lineEcharts.setOption({
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'bar',
          data: [10, 88, 44, 66, 77, 33, 45, 68, 23]
        }
      ],
      // 配置组件的通用介绍
      tooltip: {
        axisPointer: {
          type: 'cross'
        },
        textStyle: {
          color: '#000'
        }
      }
    })
  }
}
</script>

<style scoped>

</style>
