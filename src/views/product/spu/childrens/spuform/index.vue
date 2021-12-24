<template>
  <div>
    <el-form label-width="80px" :model="spuDetailInfo">
      <el-form-item label="SPU名称">
        <el-input v-model="spuDetailInfo.spuName" placeholder="SPU名称"/>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spuDetailInfo.tmId" placeholder="请选择品牌">
          <el-option
            v-for="brandInfo in brandInfoList"
            :key="brandInfo.id"
            :label="brandInfo.tmName"
            :value="brandInfo.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="spuDetailInfo.description" placeholder="SPU描述" type="textarea" rows="4"/>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"/>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="selectedAttrInfo" :placeholder="`还有${unUseSaleAttrList.length}项未选择`">
          <el-option
            v-for="saleAttr in unUseSaleAttrList"
            :key="saleAttr.id"
            :value="`${saleAttr.id}:${saleAttr.name}`"
            :label="saleAttr.name"
          />
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!selectedAttrInfo" @click="addSpuSaleAttr">添加销售属性
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-table :data="spuDetailInfo.spuSaleAttrList" border>
          <el-table-column type="index" align="center" label="序号" width="80"/>
          <el-table-column prop="saleAttrName" label="属性名" width="160"/>
          <el-table-column prop="spuSaleAttrList" label="属性值名称列表">
            <template slot-scope="{ row }">
              <el-tag
                v-for="(spuSaleAttrValue, index) in row.spuSaleAttrValueList"
                :key="spuSaleAttrValue.id"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ spuSaleAttrValue.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.inputVisible"
                ref="saveTagInput"
                v-model="row.inputValue"
                class="input-new-tag"
                size="small"
                @blur="closeAttrValueInput(row)"
                @keyup.native.enter="closeAttrValueInput(row)"
              />
              <el-button v-else class="button-new-tag" size="small" @click="addSpuSaleAttrValue(row)">
                + New Tag
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="{ $index }">
              <el-button
                size="mini" type="danger" icon="el-icon-delete"
                @click="spuDetailInfo.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpuInfo">保存</el-button>
        <el-button @click="$emit('updateSceneType', { sceneType: 0 })">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spuDetailInfo: {
        'category3Id': 0,
        'description': '',
        'spuImageList': [
        ],
        'spuName': '',
        'spuSaleAttrList': [],
        'tmId': ''
      },
      spuImageList: [],
      brandInfoList: [],
      saleAttrList: [],
      selectedAttrInfo: '',
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  computed: {
    // 未选择的销售属性列表
    unUseSaleAttrList() {
      return this.saleAttrList.filter(saleAttr => this.spuDetailInfo.spuSaleAttrList.every(spuSaleAttr => saleAttr.id != spuSaleAttr.baseSaleAttrId))
    }
  },
  methods: {
    // 删除图片
    handleRemove(file, fileList) {
      this.spuImageList = fileList
    },
    // 查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 新增图片
    handleSuccess(response, file, fileList) {
      this.spuImageList = fileList
    },
    // 获取 spu 修改表单项数据
    async getSpuEditForm(spuId) {
      try {
        const { data: spuDetailInfo } = await this.$api.spu.getSpuDetailInfo(spuId)
        const { data: spuImageList } = await this.$api.spu.getSpuImageList(spuId)
        const { data: brandInfoList } = await this.$api.brand.getAllBrandInfo()
        const { data: saleAttrList } = await this.$api.attr.getBaseSaleAttrList()
        this.spuDetailInfo = spuDetailInfo
        this.spuImageList = spuImageList.map(item => {
          item.name = item.imgName
          item.url = item.imgUrl
          return item
        })
        this.brandInfoList = brandInfoList
        // 排除 SPU 已经设置的属性
        this.saleAttrList = saleAttrList
      } catch (e) {
        this.$message(e.message)
      }
    },
    // 获取 spu 添加表单项数据
    async getSpuAddForm(category3Id) {
      try {
        /*
        * 清除已存在数据
        *  this._data:           当前 vue 实例的 data 对象
        *  this.$options.data(): 当前 vue 配置的 data 函数
        * */
        Object.assign(this._data, this.$options.data())
        const { data: brandInfoList } = await this.$api.brand.getAllBrandInfo()
        const { data: saleAttrList } = await this.$api.attr.getBaseSaleAttrList()
        this.brandInfoList = brandInfoList
        // 排除 SPU 已经设置的属性
        this.saleAttrList = saleAttrList
        // 保存分类信息
        this.spuDetailInfo.category3Id = category3Id
      } catch (e) {
        this.$message(e.message)
      }
    },
    // 添加 spu 销售属性
    addSpuSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.selectedAttrInfo.split(':')
      this.spuDetailInfo.spuSaleAttrList.push({ baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] })
      this.selectedAttrInfo = ''
    },
    // 添加 spu 销售属性值
    addSpuSaleAttrValue(spuSaleAttr) {
      // 设置响应式数据
      this.$set(spuSaleAttr, 'inputVisible', true)
      this.$set(spuSaleAttr, 'inputValue', '')
    },
    // 关闭 spu 属性输入框
    closeAttrValueInput(spuSaleAttr) {
      const { baseSaleAttrId, saleAttrName, spuId, inputValue, spuSaleAttrValueList } = spuSaleAttr
      if (inputValue.trim() === '') {
        this.$message('添加的属性值不能为空')
        return
      } else if (spuSaleAttrValueList.some(item => item.saleAttrValueName === inputValue)) {
        this.$message('添加的属性值不能相同')
        return
      }
      spuSaleAttrValueList.push({ baseSaleAttrId, saleAttrName, spuId, saleAttrValueName: inputValue })
      spuSaleAttr.inputVisible = false
      spuSaleAttr.inputValue = ''
    },
    // 保存 / 修改 spu info
    async addOrUpdateSpuInfo() {
      // 筛选图片属性
      this.spuDetailInfo.spuImageList = this.spuImageList.map(item => ({
        imgName: item.name,
        imgUrl: item.imgUrl || (item.response && item.response.data)
      }))
      try {
        // 发送请求
        await this.$api.spu.addOrUpdateSpuDetailInfo(this.spuDetailInfo)
        // 弹出消息
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        // 回到展示列表
        this.$emit('updateSceneType', { sceneType: 0, flag: Boolean(this.spuDetailInfo.id) })
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

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
