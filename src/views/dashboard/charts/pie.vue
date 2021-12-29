<template>
  <div class="chart-item" ref="chart-item"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'PieCharts',
  mounted() {
    const pieEcharts = echarts.init(this.$refs['chart-item'])
    pieEcharts.setOption({
      title: {
        text: 'Search Engine',
        subtext: '1048',
        left: 'center',
        top: 'center',
        textStyle: {
          fontSize: 12,
          color: '#aeaeae'
        },
        subtextStyle: {
          fontSize: 30,
          color: '#000'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          /* 切出空心 */
          radius: ['40%', '70%'],
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    })
    // 为 echarts 绑定DOM回调事件
    pieEcharts.on('mouseover', ({ data }) => {
      const { name, value } = data
      pieEcharts.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  }
}
</script>

<style scoped>
.chart-item {
  width: 100%;
  height: 100%;
}
</style>
