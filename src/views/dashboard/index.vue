<template>
  <div class="home-wp">
    <el-row :gutter="10" class="chart-list">
      <el-col :span="6">
        <el-card>
          <ChartDetail title="总销售额" count-data="￥126560">
            <template slot="content">
              <span>
                周同比: 56.67%
                <svg t="1640679289051" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="4684" width="17" height="17"
                ><path d="M960 704L512 256l-448 448z" fill="#f32322" p-id="4685"></path></svg>
              </span>
              <span>
                日同比: 19.16%
                <svg t="1640680103780" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="5777" width="17" height="17"
                ><path d="M64 320l448 448 448-448z" fill="#66f76e" p-id="5778"></path></svg>
              </span>
            </template>
            <template slot="ft">
              <span>日销售额￥12423</span>
            </template>
          </ChartDetail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <ChartDetail title="访问量" count-data="88460">
            <template slot="content">
              <LineChart/>
            </template>
            <template slot="ft">
              <span>日访问量 1234</span>
            </template>
          </ChartDetail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <ChartDetail title="支付笔数" count-data="88460">
            <template slot="content">
              <BarChart/>
            </template>
            <template slot="ft">
              <span>转换率 65%</span>
            </template>
          </ChartDetail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <ChartDetail title="运营活动效果" count-data="78%">
            <template slot="content">
              <ProgressChart/>
            </template>
            <template slot="ft">
              <span>
                周同比: 12%
                <svg t="1640679289051" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="4684" width="17" height="17"
                ><path d="M960 704L512 256l-448 448z" fill="#f32322" p-id="4685"></path></svg>
              </span>
              <span>
                日同比: 11%
                <svg t="1640680103780" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="5777" width="17" height="17"
                ><path d="M64 320l448 448 448-448z" fill="#66f76e" p-id="5778"></path></svg>
              </span>
            </template>
          </ChartDetail>
        </el-card>
      </el-col>
    </el-row>
    <Sale/>
    <el-row :gutter="25" style="margin-top: 10px;" class="observer-wp">
      <el-col :span="12">
        <el-card class="search-wp">
          <div slot="header" class="col-hd flex-wp">
            <h4>线上热门热搜</h4>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item>双皮奶</el-dropdown-item>
                <el-dropdown-item>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="search-charts flex-wp">
            <div class="chart-item flex-wp">
              <div class="search-charts-hd">
                <span>搜索用户数</span>
                <svg t="1640677514148" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     p-id="2055" width="20" height="20"
                >
                  <path
                    d="M512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768z m0 707.669333a323.669333 323.669333 0 1 1 0-647.338666 323.669333 323.669333 0 0 1 0 647.338666z m-0.085333-248.106666c5.034667-12.245333 12.16-29.866667 21.333333-52.906667 9.216-23.04 16.682667-42.496 22.485333-58.368 5.802667-15.872 8.704-26.197333 8.704-30.976 0-8.106667-5.162667-12.16-15.488-12.16-11.861333 0-29.354667 6.656-52.565333 19.968-23.168 13.312-48.213333 31.402667-75.221333 54.272l13.994666 12.8 10.24-8.405333c6.272-6.016 13.824-11.690667 22.656-16.981334 8.832-5.290667 15.146667-7.936 18.944-7.936 5.290667 0 7.936 2.56 7.936 7.765334 0 1.450667-6.954667 19.626667-20.821333 54.485333-13.866667 34.858667-21.674667 54.698667-23.466667 59.434667l-27.989333 64.426666c-7.296 18.688-10.965333 32.085333-10.965333 40.192 0 5.376 2.133333 9.813333 6.442666 13.354667 4.266667 3.541333 9.216 5.290667 14.762667 5.290667 13.866667 0 33.536-7.253333 58.965333-21.674667 25.472-14.464 49.664-30.72 72.533334-48.810667l-14.677334-13.44-5.248 3.285334a72.533333 72.533333 0 0 1-5.674666 3.285333c-24.96 17.834667-42.24 26.752-51.797334 26.752-5.077333 0-7.594667-2.56-7.594666-7.765333 0-4.138667 3.797333-15.957333 11.349333-35.498667 7.552-19.498667 14.592-36.266667 21.162667-50.389333zM560.981333 298.666667c-9.258667 0-17.664 2.517333-25.173333 7.552a55.466667 55.466667 0 0 0-17.493333 18.346666c-4.266667 7.253333-6.314667 14.933333-6.314667 23.04 0 9.301333 3.456 17.706667 10.410667 25.173334a32.981333 32.981333 0 0 0 25.088 11.221333c13.013333 0 24.576-5.546667 34.688-16.554667 10.069333-11.008 15.146667-22.912 15.146666-35.669333a30.208 30.208 0 0 0-10.837333-23.552 37.376 37.376 0 0 0-25.557333-9.557333z"
                    p-id="2056" fill="#c7c7c7"
                  ></path>
                </svg>
              </div>
              <div class="search-charts-count">
                <span class="count-data">12321</span>
                <span class="count-than">
                17.1
                <svg t="1640679289051" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="4684" width="17" height="17"
                ><path d="M960 704L512 256l-448 448z" fill="#f32322" p-id="4685"></path></svg>
              </span>
              </div>
              <div class="search-charts-content">
                <LineChart2/>
              </div>
            </div>
            <div class="chart-item flex-wp">
              <div class="search-charts-hd">
                <span>搜索用户数</span>
                <svg t="1640677514148" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     p-id="2055" width="20" height="20"
                >
                  <path
                    d="M512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768z m0 707.669333a323.669333 323.669333 0 1 1 0-647.338666 323.669333 323.669333 0 0 1 0 647.338666z m-0.085333-248.106666c5.034667-12.245333 12.16-29.866667 21.333333-52.906667 9.216-23.04 16.682667-42.496 22.485333-58.368 5.802667-15.872 8.704-26.197333 8.704-30.976 0-8.106667-5.162667-12.16-15.488-12.16-11.861333 0-29.354667 6.656-52.565333 19.968-23.168 13.312-48.213333 31.402667-75.221333 54.272l13.994666 12.8 10.24-8.405333c6.272-6.016 13.824-11.690667 22.656-16.981334 8.832-5.290667 15.146667-7.936 18.944-7.936 5.290667 0 7.936 2.56 7.936 7.765334 0 1.450667-6.954667 19.626667-20.821333 54.485333-13.866667 34.858667-21.674667 54.698667-23.466667 59.434667l-27.989333 64.426666c-7.296 18.688-10.965333 32.085333-10.965333 40.192 0 5.376 2.133333 9.813333 6.442666 13.354667 4.266667 3.541333 9.216 5.290667 14.762667 5.290667 13.866667 0 33.536-7.253333 58.965333-21.674667 25.472-14.464 49.664-30.72 72.533334-48.810667l-14.677334-13.44-5.248 3.285334a72.533333 72.533333 0 0 1-5.674666 3.285333c-24.96 17.834667-42.24 26.752-51.797334 26.752-5.077333 0-7.594667-2.56-7.594666-7.765333 0-4.138667 3.797333-15.957333 11.349333-35.498667 7.552-19.498667 14.592-36.266667 21.162667-50.389333zM560.981333 298.666667c-9.258667 0-17.664 2.517333-25.173333 7.552a55.466667 55.466667 0 0 0-17.493333 18.346666c-4.266667 7.253333-6.314667 14.933333-6.314667 23.04 0 9.301333 3.456 17.706667 10.410667 25.173334a32.981333 32.981333 0 0 0 25.088 11.221333c13.013333 0 24.576-5.546667 34.688-16.554667 10.069333-11.008 15.146667-22.912 15.146666-35.669333a30.208 30.208 0 0 0-10.837333-23.552 37.376 37.376 0 0 0-25.557333-9.557333z"
                    p-id="2056" fill="#c7c7c7"
                  ></path>
                </svg>
              </div>
              <div class="search-charts-count">
                <span class="count-data">12321</span>
                <span class="count-than">
                  26.2
                  <svg t="1640680103780" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="5777" width="17" height="17"
                  ><path d="M64 320l448 448 448-448z" fill="#66f76e" p-id="5778"></path></svg>
              </span>
              </div>
              <div class="search-charts-content">
                <LineChart2/>
              </div>
            </div>
          </div>
          <div class="search-info-tb">
            <el-table style="width: 100%" border>
              <el-table-column
                prop="date"
                label="排名"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="搜索关键字"
                width="250"
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="用户数"
                sortable
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="周涨幅"
                sortable
              >
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination
              layout="->,prev, pager, next"
              :total="1000"
            >
            </el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="category-wp">
          <div slot="header" class="col-hd flex-wp">
            <h4>销售额类别占比</h4>
            <el-radio-group v-model="categoryType">
              <el-radio-button label="全部渠道"></el-radio-button>
              <el-radio-button label="线上"></el-radio-button>
              <el-radio-button label="门店"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="category-charts">
            <PieChart />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartDetail from './childrens/chart_detail'
import Sale from './childrens/sale'
import LineChart from './charts/line'
import LineChart2 from './charts/line2'
import BarChart from './charts/bar'
import PieChart from './charts/pie'
import ProgressChart from './charts/progress'

export default {
  name: 'Home',
  components: {
    ChartDetail,
    Sale,
    LineChart,
    LineChart2,
    BarChart,
    PieChart,
    ProgressChart
  },
  data() {
    return {
      categoryType: '全部渠道'
    }
  },
  mounted() {
    this.$store.dispatch('getDashboardDataList')
  }
}
</script>
<style>
.flex-wp {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
<style lang="scss" scoped>
@mixin observerItem {
  /* 搜索信息 - 头部 */
  .col-hd {
    height: 20px;

    h4 {
      padding: 0;
      margin: 0;
    }
  }
}

svg {
  position: relative;
  top: 5px;
}

.home-wp {
  margin-top: 20px;

  .chart-list {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 200px;
  }

}

.search-wp {

  @include observerItem;

  /* 搜索信息 - 图表 */
  .search-charts {
    width: 100%;
    height: 200px;

    .chart-item {
      width: 49%;
      height: 100%;
      flex-direction: column;
      align-items: start;

      /* 图表头部 */
      .search-charts-hd {
        color: #b8bcbc;

        & > span {
          margin-right: 10px;
        }
      }

      /* 搜索计数信息 */
      .search-charts-count {
        .count-data {
          font-size: 24px;
          margin-right: 50px;
        }

        .count-than {
          font-size: 14px;
        }
      }

      /* 搜索图表 */
      .search-charts-content {
        width: 100%;
        height: 100px;
      }
    }

  }

  /* 搜索信息 - 表格 */
  .search-info-tb {
    margin: 10px 0;
  }
}

.category-wp {
  @include observerItem;

  .category-charts {
    width: 100%;
    height: 371.5px;
  }
}
</style>
