<template>
  <div ref="line-charts" class="line-charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'ProgressCharts',
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
        max: 100,
        min: 0
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [88],
          // 设置柱条的宽度
          barWidth: 20,
          // 设置线段颜色
          itemStyle: {
            color: 'yellowgreen'
          },
          // 打开背景颜色设置
          showBackground: true,
          // 设置背景颜色
          backgroundStyle: {
            color: '#eee'
          },
          // 设置提醒文字
          label: {
            show: true,
            formatter: '|',
            color: '#fff',
            position: 'right'
          }
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
