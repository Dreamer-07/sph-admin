<template>
  <div class="product-wp">
    <!-- 分类选择器 -->
    <el-card>
      <div>
        <el-form :inline="true">
          <el-form-item label="一级分类">
            <el-select
              v-model="selectCategoryForm.category1Id"
              placeholder="请选择"
              :disabled="sceneType!==0"
              @change="getCategory2List"
            >
              <el-option v-for="c1 in category1List" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类">
            <el-select
              v-model="selectCategoryForm.category2Id"
              placeholder="请选择"
              :disabled="sceneType!==0"
              @change="getCategory3List"
            >
              <el-option v-for="c2 in category2List" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="三级分类">
            <el-select
              v-model="selectCategoryForm.category3Id"
              placeholder="请选择"
              :disabled="sceneType!==0"
              @change="getSpuInfoList(1)"
            >
              <el-option v-for="c3 in category3List" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 数据展示 -->
    <el-card>
      <div v-show="sceneType === 0">
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 20px;"
                   :disabled="!selectCategoryForm.category3Id" @click="initAddForm"
        >添加 SPU
        </el-button>

        <el-table :data="spuInfoList" border>
          <el-table-column label="序号" type="inedx" align="center" width="80px"></el-table-column>
          <el-table-column label="spu名称" prop="spuName"></el-table-column>
          <el-table-column label="spu描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <MiniButton type="success" icon="el-icon-plus" size="mini" title="添加 sku 信息"
                          @click="showSkuForm(row)"
              />
              <MiniButton type="warning" icon="el-icon-edit" size="mini" title="修改 sku 信息"
                          @click="initEditForm(row.id)"
              />
              <MiniButton type="info" icon="el-icon-info" size="mini" title="查看当前 spu 相关的 sku 列表"
                          @click="showSkuList(row)"
              />
              <el-popconfirm :title="`确定删除[${row.spuName}]SPU属性吗`" @onConfirm="deleteSpuInfo(row.id)">
                <MiniButton slot="reference" type="danger" icon="el-icon-delete" size="mini" title="删除 spu"/>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          style="margin-top: 20px; text-align: center"
          :page-size="pageSize"
          :page-sizes="[3, 5, 7]"
          :current-page="pageNo"
          :total="total"
          :pager-count="7"
          layout="prev, pager, next, jumper, -> , sizes, total"
          @current-change="getSpuInfoList"
          @size-change="handlePageSizeUpdate"
        />
      </div>

      <SpuForm v-show="sceneType === 1" ref="spu-form" @updateSceneType="updateSceneType"/>

      <SkuForm v-show="sceneType === 2" ref="sku-form" @updateSceneType="updateSceneType"/>
    </el-card>

    <el-dialog :title="`${selectedSpuName}商品的 sku 列表`" :visible.sync="dialogTableVisible" @close="closeDialog">
      <el-table :data="skuInfoList" v-loading="loading">
        <el-table-column prop="skuName" label="名称"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="weight" label="重量"></el-table-column>
        <el-table-column label="默认图片">
          <template slot-scope="{ row }">
            <img :src="row.skuDefaultImg" :alt="row.skuName" style="width: 100px; height: 100px;"/>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuForm from './childrens/skuform'
import SpuForm from './childrens/spuform'

export default {
  name: 'Spu',
  components: { SkuForm, SpuForm },
  data() {
    return {
      selectCategoryForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      },
      category1List: [],
      category2List: [],
      category3List: [],
      pageNo: 1,
      total: 0,
      pageSize: 3,
      spuInfoList: [],
      sceneType: 0, // 切换场景: [0 - 查看 spu 信息; 1 - 修改/新增 spu; 2 - 新增 sku]
      dialogTableVisible: false,
      selectedSpuName: '',
      skuInfoList: [],
      loading: true
    }
  },
  mounted() {
    this.getCategory1List()
  },
  component: {
    SkuForm,
    SpuForm
  },
  methods: {
    async getCategory1List() {
      const result = await this.$api.attr.getCategory1List()
      this.category1List = result.data
    },
    async getCategory2List() {
      // 清除二三级数据
      this.category2List = []
      this.category3List = []
      this.selectCategoryForm.category2Id = ''
      this.selectCategoryForm.category3Id = ''

      // 清空数据
      this.$emit('update:attrInfoList', [])
      this.$emit('update:categoryId', '')

      const { category1Id } = this.selectCategoryForm
      const result = await this.$api.attr.getCategory2List(category1Id)
      this.category2List = result.data
    },
    async getCategory3List() {
      // 清除三级数据
      this.category3List = []
      this.selectCategoryForm.category3Id = ''

      // 清空数据
      this.$emit('update:attrInfoList', [])
      this.$emit('update:categoryId', '')

      const { category2Id } = this.selectCategoryForm
      const result = await this.$api.attr.getCategory3List(category2Id)
      this.category3List = result.data
    },
    // 获取平台属性
    async getSpuInfoList(page = 1) {
      this.pageNo = page
      const { pageNo, pageSize } = this
      try {
        const result = await this.$api.spu.getSpuInfoList({
          pageNo,
          pageSize,
          category3Id: this.selectCategoryForm.category3Id
        })
        this.total = result.data.total
        this.spuInfoList = result.data.records
      } catch (e) {
        this.$message(e.message)
      }
    },
    // 修改每页显示大小
    handlePageSizeUpdate(pageSize) {
      this.pageSize = pageSize
      this.getSpuInfoList()
    },
    // 修改场景类型
    updateSceneType({ sceneType, flag = true }) {
      this.sceneType = sceneType
      sceneType === 0 && this.getSpuInfoList(flag ? this.pageNo : 1)
    },
    // 初始化修改表单
    initEditForm(spuId) {
      this.updateSceneType({ sceneType: 1 })
      this.$refs['spu-form'].getSpuEditForm(spuId)
    },
    // 初始化添加表单
    initAddForm() {
      this.updateSceneType({ sceneType: 1 })
      this.$refs['spu-form'].getSpuAddForm(this.selectCategoryForm.category3Id)
    },
    // 删除 spu 信息
    async deleteSpuInfo(spuId) {
      try {
        await this.$api.spu.deleteSpuInfoBySpuId(spuId)
        this.getSpuInfoList(this.spuInfoList.length > 1 ? this.pageNo : this.pageNo - 1)
      } catch (e) {
        this.$message({
          type: 'error',
          message: e.message
        })
      }
    },
    // 显示 sku form
    showSkuForm({ id, spuName, tmId }) {
      this.sceneType = 2
      this.$refs['sku-form'].initFormData({ ...this.selectCategoryForm, spuId: id, spuName, tmId })
    },
    // 展示 sku list
    async showSkuList({ id, spuName }) {
      this.dialogTableVisible = true
      this.selectedSpuName = spuName
      // 发送请求
      try {
        const result = await this.$api.sku.getSkuListBySpuId(id)
        this.skuInfoList = result.data
        this.loading = false
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    // 关闭弹窗
    closeDialog() {
      this.loading = true
      this.skuInfoList = []
    }
  }
}
</script>

<style lang="scss" scoped>

.product-wp {
  margin-top: 20px;
}

</style>
