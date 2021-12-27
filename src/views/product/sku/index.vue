<template>
  <div>
    <!-- 表格 -->
    <el-table :data="skuInfoList" border>
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column label="名称" prop="skuName"></el-table-column>
      <el-table-column label="描述" prop="skuDesc" width="400"></el-table-column>
      <el-table-column label="默认图片" width="150">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" :alt="row.skuName" style="width: 80px; height: 80px;"/>
        </template>
      </el-table-column>
      <el-table-column label="重量(KG)" prop="weight" width="130"></el-table-column>
      <el-table-column label="价格(元)" prop="price" width="130"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button v-if="!row.isSale" type="success" icon="el-icon-arrow-up" size="mini" @click="onSale(row)"
          ></el-button>
          <el-button v-else type="info" icon="el-icon-arrow-down" size="mini" @click="cancelSale(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="$message.info('正在开发中!')"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" @click="showSkuDetatilInfo(row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" style="margin-left: 20px;"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="pageNo"
      :page-size="pageSize"
      :page-sizes="[10,20,30]"
      :total="total"
      layout="prev, pager, next, jumper, -> ,sizes, total"
      style="text-align: center"
      @current-change="getSkuList"
      @size-change="handlePageSizeChange"
    >
    </el-pagination>
    <!-- 抽屉 -->
    <el-drawer
      :visible.sync="isShowDetail"
      :show-close="false"
      size="45%"
    >
      <el-row>
        <el-col :span="5" class="sku-detail-label">名称</el-col>
        <el-col :span="16" class="sku-detail-info">{{ skuDetailInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="sku-detail-label">描述</el-col>
        <el-col :span="16" class="sku-detail-info">{{ skuDetailInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="sku-detail-label">价格</el-col>
        <el-col :span="1616" class="sku-detail-info">{{ skuDetailInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="sku-detail-label">平台属性</el-col>
        <el-col :span="16" class="sku-detail-info">
          <el-tag v-for="attrValue in skuDetailInfo.skuAttrValueList" :key="attrValue.id" type="success"
                  style="margin-right: 5px"
          >
            {{ attrValue.attrName }} - {{ attrValue.valueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="sku-detail-label">商品图片</el-col>
        <el-col :span="16" class="sku-detail-info" >
          <el-carousel height="150px" indicator-position="outside">
            <el-carousel-item v-for="skuImage in skuDetailInfo.skuImageList" :key="skuImage.id">
              <img :src="skuImage.imgUrl" :alt="skuImage.imgName" style="width: 100%; height: 100%;"/>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      skuInfoList: [],
      isShowDetail: false,
      skuDetailInfo: {}
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    // 获取 sku 商品列表
    async getSkuList(pageNo = 1) {
      this.pageNo = pageNo
      try {
        const result = await this.$api.sku.getAllSkuList(this.pageNo, this.pageSize)
        this.skuInfoList = result.data.records
        this.total = result.data.total
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    // 修改每页显示数目
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getSkuList()
    },
    // 上架商品
    async onSale(skuInfo) {
      await this.$api.sku.onSale(skuInfo.id)
      skuInfo.isSale = 1
      this.$message.success('上架成功')
    },
    // 下架商品
    async cancelSale(skuInfo) {
      await this.$api.sku.cancelSale(skuInfo.id)
      skuInfo.isSale = 0
      this.$message.success('下架成功')
    },
    // 显示 sku 详细信息
    async showSkuDetatilInfo(skuId) {
      this.isShowDetail = true
      const result = await this.$api.sku.getSkuDetailInfo(skuId)
      this.skuDetailInfo = result.data
    }
  }
}
</script>

<style lang="scss" scoped>
.sku-detail-label {
  font-size: 18px;
  text-align: right;
  margin-right: 25px;
}

.sku-detail-info {
  margin-bottom: 30px;
}

::v-deep .el-carousel__container {
  height: 600px !important;
}

::v-deep .el-carousel__item {
  h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  &:nth-child(2n) {
    background-color: #99a9bf;
  }

  &:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}

::v-deep .el-carousel__button {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff6d6d !important;
}
</style>
