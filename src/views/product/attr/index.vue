<template>
  <div class="product-attr-wp">
    <el-card>
      <CategorySelect
        ref="category-select"
        :attr-info-list.sync="attrInfoList"
        :category-id.sync="categoryId"
        :is-show-edit-table="isShowEditTable"
      />
    </el-card>

    <!-- 展示属性值列表 -->
    <el-card v-show="!isShowEditTable">
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin-bottom: 20px"
        :disabled="!categoryId"
        @click="showAddForm"
      >
        新增
      </el-button>
      <el-table :data="attrInfoList" border>
        <el-table-column label="序号" width="50" type="index"/>
        <el-table-column prop="attrName" label="属性名" width="120"/>
        <el-table-column prop="attrValueList" label="可选属性值">
          <template slot-scope="{row}">
            <el-tag
              v-for="attrValue in row.attrValueList"
              :key="attrValue.id"
              type="success"
              style="margin: 0 10px"
            >
              {{ attrValue.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
        >
          <template slot-scope="{ row }">
            <el-button type="warning" icon="el-icon-edit" size="mini" @click="showEditForm(row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/修改属性值 -->
    <el-card v-show="isShowEditTable">
      <el-form :inline="true" :model="editForm">
        <el-form-item label="属性名">
          <el-input v-model="editForm.attrName" placeholder="请输入属性名"></el-input>
        </el-form-item>
      </el-form>
      <el-button-group>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-right: 5px"
          :disabled="!editForm.attrName.trim()"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button @click="isShowEditTable = false">取消</el-button>
      </el-button-group>
      <el-table :data="editForm.attrValueList" style="margin: 5px 0" border>
        <el-table-column label="序号" type="index" width="80" align="center"/>
        <el-table-column label="属性值名称" prop="valueName">
          <template slot-scope="{row, $index}">
            <el-input
              v-show="editIngFormItemIndex === $index"
              :ref="$index"
              v-model="row.valueName"
              size="mini"
              @blur="editIngFormItemIndex = -1"
              @keyup.native.enter="editIngFormItemIndex = -1"
            />
            <span
              v-show="editIngFormItemIndex !== $index"
              style="display: block; height: 23px"
              @click="showEditFormInput($index)"
            >{{ row.valueName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row, $index}">
            <el-popconfirm :title="`确实删除[${row.valueName}]属性值吗?`" @onConfirm="deleteAttrInfo($index)">
              <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-button-group>
        <el-button
          type="primary"
          style="margin-right: 5px"
          :disabled="!(editForm.attrName.trim() && editForm.attrValueList.length > 0)"
          @click="saveAttrInfo"
        >
          保存
        </el-button>
        <el-button @click="isShowEditTable = false">取消</el-button>
      </el-button-group>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'Attr',
  data() {
    return {
      attrInfoList: [],
      categoryId: '',
      isShowEditTable: false,
      editForm: {
        attrName: '',
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 0
      },
      editIngFormItemIndex: -1
    }
  },
  methods: {
    // 显示添加表单
    showAddForm() {
      this.isShowEditTable = true

      // 初始化数据
      this.editForm.attrName = ''
      this.editForm.categoryId = this.categoryId
      this.editForm.attrValueList = []
      this.editForm.categoryLevel = 3
    },
    // 显示修改表单
    showEditForm(attrInfo) {
      this.isShowEditTable = true
      // 由于 attrInfo 中存在引用对象嵌套的关系，所以需要使用深拷贝
      this.editForm = cloneDeep(attrInfo)
    },
    // 添加属性值
    addAttrValue() {
      this.editForm.attrValueList.push({ attrId: this.editForm.id, valueName: '' })
      const index = this.editForm.attrValueList.length - 1
      this.editIngFormItemIndex = index
      this.$nextTick(() => this.$refs[index].focus())
    },
    // 显示修改表单项
    showEditFormInput(index) {
      this.editIngFormItemIndex = index
      this.$nextTick(() => this.$refs[index].focus())
    },
    // 删除属性值
    deleteAttrInfo(index) {
      this.editForm.attrValueList.splice(index, 1)
    },
    // 保存属性
    async saveAttrInfo() {
      this.editForm.attrValueList = this.editForm.attrValueList.filter(item => item.valueName)
      try {
        await this.$api.attr.saveAttrInfo(this.editForm)
        // 显示
        this.isShowEditTable = false
        // 重新刷新数据
        // console.log()
        this.$refs['category-select'].getAttrInfoList()
      } catch (e) {
        this.$message(e.message)
      }
    }
  }
}
</script>

<style scoped>
.product-attr-wp {
  margin-top: 20px;
}
</style>
