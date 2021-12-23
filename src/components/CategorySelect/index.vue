<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="selectCategoryForm.category1Id"
          placeholder="请选择"
          :disabled="isShowEditTable"
          @change="getCategory2List"
        >
          <el-option v-for="c1 in category1List" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="selectCategoryForm.category2Id"
          placeholder="请选择"
          :disabled="isShowEditTable"
          @change="getCategory3List"
        >
          <el-option v-for="c2 in category2List" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="selectCategoryForm.category3Id"
          placeholder="请选择"
          :disabled="isShowEditTable"
          @change="getAttrInfoList"
        >
          <el-option v-for="c3 in category3List" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: {
    // 是否显示修改表单
    isShowEditTable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectCategoryForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      },
      category1List: [],
      category2List: [],
      category3List: []
    }
  },
  mounted() {
    this.getCategory1List()
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
    async getAttrInfoList() {
      const result = await this.$api.attr.getAttrInfoList({ ...this.selectCategoryForm })
      this.$emit('update:attrInfoList', result.data)
      this.$emit('update:categoryId', this.selectCategoryForm.category3Id)
    }
  }
}
</script>

<style scoped>

</style>
