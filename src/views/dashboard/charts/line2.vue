<template>
  <div class="line-charts" ref="line-charts"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'LineCharts2',
  mounted() {
    const lineEcharts = echarts.init(this.$refs['line-charts'])
    lineEcharts.setOption({
      grid: {
        width: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      xAxis: {
        show: false,
        data: ['周一', '周二', '周三', '周四', '周五']
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'line',
          data: [10, 88, 44, 66, 77],
          /* 开启平滑处理 */
          smooth: true,
          /* 将拐点隐藏 */
          itemStyle: {
            opacity: 0
          },
          // 设置线段样式
          lineStyle: {
            color: '#80a6f0'
          },
          // 设置填充样式
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#80a6f0' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
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

<style>
.line-charts {
  width: 100%;
  height: 100%;
}
</style>
