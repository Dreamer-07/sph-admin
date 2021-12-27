<template>
  <el-form label-width="80px">
    <el-form-item label="SPU名称">{{ spuInfo.spuName }}</el-form-item>
    <el-form-item label="SKU名称">
      <el-input v-model="skuInfo.skuName" placeholder="SKU名称"/>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input v-model="skuInfo.price" placeholder="价格(元)" type="number"/>
    </el-form-item>
    <el-form-item label="重量(千克)">
      <el-input v-model="skuInfo.weight" placeholder="重量(千克)" type="number"/>
    </el-form-item>
    <el-form-item label="规格描述">
      <el-input v-model="skuInfo.skuDesc" placeholder="规格描述" type="textarea" rows="4"/>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true" label-width="100px">
        <el-form-item v-for="attrInfo in attrInfoList" :key="attrInfo.id" :label="attrInfo.attrName">
          <el-select v-model="attrInfo.selectOption" placeholder="请选择">
            <el-option
              v-for="attrValueInfo in attrInfo.attrValueList"
              :key="attrValueInfo.id"
              :label="attrValueInfo.valueName"
              :value="attrValueInfo.id"
            >
              {{ attrValueInfo.valueName }}
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true" label-width="100px">
        <el-form-item
          v-for="spuSaleAttrInfo in spuAttrList"
          :key="spuSaleAttrInfo.id"
          :label="spuSaleAttrInfo.saleAttrName"
        >
          <el-select v-model="spuSaleAttrInfo.selectOption" placeholder="请选择">
            <el-option
              v-for="spuSaleAttrValueInfo in spuSaleAttrInfo.spuSaleAttrValueList"
              :key="spuSaleAttrValueInfo.id"
              :label="spuSaleAttrValueInfo.saleAttrValueName"
              :value="spuSaleAttrValueInfo.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片列表">
      <el-table :data="spuImageList" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column label="图片">
          <template slot-scope="{ row }">
            <img :src="row.imgUrl" :alt="row.imgName" style="width: 100px;height: 100px;"/>
          </template>
        </el-table-column>
        <el-table-column prop="imgName" label="名称"/>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-tag v-if="row.isDefault" :disable-transitions="true" type="success">默认</el-tag>
            <el-button v-else type="primary" size="mini" @click="changeDefaultImage(row)">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveSkuInfo">保存</el-button>
      <el-button @click="cancelSkuForm">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      // sku 信息维护
      skuInfo: {
        // 分类 id
        'category3Id': 0,
        // spu id
        'spuId': 0,
        // 选择的品牌
        'tmId': '',
        // 重量
        'weight': '',
        // 价格
        'price': 0,
        // 默认展示图片
        'skuDefaultImg': '',
        // sku 产品名称
        'skuName': '',
        // 描述信息
        'skuDesc': '',
        // Sku 平台属性
        'skuAttrValueList': [],
        // Sku 图片列表
        'skuImageList': [],
        // SKU 销售属性
        'skuSaleAttrValueList': []
      },
      // SPU 信息
      spuInfo: {
        spuId: null,
        spuName: ''
      },
      // 平台属性信息
      attrInfoList: [],
      // SPU 销售属性西悉尼
      spuAttrList: [],
      // SPU 图片信息
      spuImageList: []
    }
  },
  methods: {
    // 初始化表单数据
    async initFormData(spuInfo) {
      try {
        this.spuInfo = spuInfo
        // TODO
        this.skuInfo.category3Id = spuInfo.category3Id
        this.skuInfo.spuId = spuInfo.spuId
        this.skuInfo.tmId = spuInfo.tmId
        const { data: attrInfoList } = await this.$api.attr.getAttrInfoList(spuInfo)
        const { data: spuAttrList } = await this.$api.attr.getSpuAttrList(spuInfo.spuId)
        const { data: spuImageList } = await this.$api.spu.getSpuImageList(spuInfo.spuId)
        this.attrInfoList = attrInfoList
        this.spuAttrList = spuAttrList
        this.spuImageList = spuImageList.map(item => {
          item.isDefault = false
          return item
        })
      } catch (e) {
        this.$message({
          type: 'error',
          message: e.message
        })
      }
    },
    // 处理选择图片
    handleSelectionChange(selectedImage) {
      this.skuInfo.skuImageList = selectedImage
    },
    // 修改默认图片
    changeDefaultImage(imageInfo) {
      this.spuImageList.forEach(item => {
        if (item.id === imageInfo.id) {
          item.isDefault = true
          this.skuInfo.skuDefaultImg = item.imgUrl
        } else {
          item.isDefault = false
        }
      })
    },
    // 清除 sku 表单
    cancelSkuForm() {
      this.$emit('updateSceneType', { sceneType: 0 })
      // 清除数据
      Object.assign(this._data, this.$options.data())
    },
    // 保存 sku 信息
    async saveSkuInfo() {
      // 处理数据
      const { skuInfo, attrInfoList, spuAttrList } = this
      // 处理数据 - 求和并整理(只需要选择了参数的平台属性，不需要没有选择的)
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, { id, selectOption }) => {
        selectOption && prev.push({ attrId: id, valueId: selectOption })
        return prev
      }, [])
      skuInfo.skuSaleAttrValueList = spuAttrList.reduce((prev, { id, selectOption }) => {
        selectOption && prev.push({ saleAttrId: id, saleValueId: selectOption })
        return prev
      }, [])
      skuInfo.skuImageList = skuInfo.skuImageList.map(({ id, imgName, imgUrl, isDefault, spuImgId }) => ({
        imgName,
        imgUrl,
        isDefault: Number(isDefault),
        spuImgId: !spuImgId ? id : spuImgId
      }))
      // 发送请求保存数据
      console.log(skuInfo.skuImageList)
      try {
        await this.$api.sku.saveSkuInfo(skuInfo)
        this.$message.success('保存成功')
        this.$emit('updateSceneType', { sceneType: 0 })
      } catch (e) {
        this.$message({
          type: 'error',
          message: e.message
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
