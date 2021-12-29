<template>
  <el-card>
    <div slot="header" class="flex-wp">
      <el-tabs v-model="activeName" class="tabs">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visits"></el-tab-pane>
      </el-tabs>
      <div class="date-select flex-wp">
        <span @click="selectDate('day')">今日</span>
        <span @click="selectDate('week')">本周</span>
        <span @click="selectDate('month')">本月</span>
        <span @click="selectDate('year')">本年</span>
        <el-date-picker
          v-model="selectDateRange"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="sale-content">
      <el-row>
        <el-col :span="16">
          <div ref="sale-charts" class="sale-charts"></div>
        </el-col>
        <el-col :span="8" class="ct-right">
          <h3>门店{{ chartTitle }}排名</h3>
          <ul class="sale-rank-list">
            <li class="sale-rank-item">
              <span class="index">1</span>
              <span class="store-name">肯德基</span>
              <span class="count">123456</span>
            </li>
            <li class="sale-rank-item">
              <span class="index">2</span>
              <span class="store-name">肯德基</span>
              <span class="count">123456</span>
            </li>
            <li class="sale-rank-item">
              <span class="index">3</span>
              <span class="store-name">肯德基</span>
              <span class="count">123456</span>
            </li>
            <li class="sale-rank-item">
              <span class="index">4</span>
              <span class="store-name">肯德基</span>
              <span class="count">123456</span>
            </li>
            <li class="sale-rank-item">
              <span class="index">5</span>
              <span class="store-name">肯德基</span>
              <span class="count">123456</span>
            </li>
            <li class="sale-rank-item">
              <span class="index">6</span>
              <span class="store-name">肯德基</span>
              <span class="count">123456</span>
            </li>
            <li class="sale-rank-item">
              <span class="index">7</span>
              <span class="store-name">肯德基</span>
              <span class="count">123456</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  name: 'Sale',
  data() {
    return {
      activeName: 'sale',
      saleEchart: null,
      selectDateRange: []
    }
  },
  computed: {
    chartTitle() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    },
    ...mapState({
      saleDataList: (state) => state.dashboard.dataList
    })
  },
  watch: {
    chartTitle() {
      this.saleEchart.setOption({
        title: {
          text: this.chartTitle + '趋势'
        },
        xAxis: [
          {
            type: 'category',
            data: this.saleDataList.orderFullYearAxis,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: this.activeName === 'sale' ? this.saleDataList.orderFullYear : this.saleDataList.userFullYear
          }
        ]
      })
    },
    saleDataList() {
      this.saleEchart.setOption({
        xAxis: [
          {
            type: 'category',
            data: this.saleDataList.orderFullYearAxis,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: this.activeName === 'sale' ? this.saleDataList.orderFullYear : this.saleDataList.userFullYear
          }
        ]
      })
    }
  },
  mounted() {
    this.saleEchart = echarts.init(this.$refs['sale-charts'])
    this.saleEchart.setOption({
      title: {
        text: '销售额趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: []
        }
      ]
    })
  },
  methods: {
    // 选择不同的日期
    selectDate(type) {
      let startDay, endDay
      switch (type) {
        case 'day':
          startDay = endDay = moment(new Date()).format('yyyy-MM-DD')
          break
        case 'week':
          startDay = moment().weekday(1).format('yyyy-MM-DD')
          endDay = moment().weekday(7).format('yyyy-MM-DD')
          break
        case 'month':
          startDay = moment().startOf('month').format('yyyy-MM-DD')
          endDay = moment().endOf('month').format('yyyy-MM-DD')
          break
        case 'year':
          startDay = moment().startOf('year').format('yyyy-MM-DD')
          endDay = moment().endOf('year').format('yyyy-MM-DD')
          break
      }
      this.selectDateRange = [startDay, endDay]
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {

  ::v-deep .el-tabs__nav-wrap::after {
    background-color: transparent;
  }
}

.date-select {
  width: 450px;
  align-items: center;
  font-size: 14px;

  & > span {
    cursor: pointer;
  }

  span:last-of-type {
    margin-right: 20px;
  }

  ::v-deep .el-date-editor {
    width: 265px;
  }
}

.sale-content {
  ::v-deep .sale-charts {
    width: 100%;
    height: 400px;
  }

  .ct-right {
    h3 {
      margin: 0;
    }

    .sale-rank-list {
      height: 400px;

      .sale-rank-item {
        height: 55px;
        font-size: 18px;

        & > span {
          display: inline-block;
        }

        @for $idx from 1 through length(1 2 3) {
          &:nth-child(#{$idx}) {
            .index {
              color: white;
              background-color: black;
              border-radius: 50%;
            }
          }
        }

        .index {
          width: 25px;
          line-height: 25px;
          text-align: center;
          color: black;
        }

        .store-name {
          width: 435px;
          text-align: left;
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
