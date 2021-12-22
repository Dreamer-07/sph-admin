<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin-top: 10px" @click="showAddDialog">新增
    </el-button>
    <hr>
    <!-- data:   table 展示的数据集合 -->
    <el-table border :data="brandList">
      <!-- 设置 type 属性为 index 即可显示从 1 开始的索引号。 -->
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <!-- 在 el-table-column 中用 prop 属性来对应对象中的键名即可填入数据 -->
      <el-table-column label="品牌名" prop="tmName"></el-table-column>
      <!-- 使用作用域插槽，定义子组件格式 -->
      <el-table-column label="品牌logo" prop="logoUrl">
        <template slot-scope="{row}">
          <img
            :src="row.logoUrl.indexOf('static') === -1 ? row.logoUrl : '/images/default.gif'"
            alt="欸嘿嘿"
            class="brand-logo"
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="showBrandInfo(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteBrandInfo(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
      page-size:    每页显示条目
      page-sizes:   切换每页显示条目
      current-page: 当前页
      total:        总共几页
      pager-count:  每页显示几个小按钮
      layout:       布局
    -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :page-size="3"
      :page-sizes="[3, 5, 7]"
      :current-page="pageNo"
      :total="total"
      :pager-count="7"
      layout="prev, pager, next, jumper, -> , sizes, total"
      @current-change="handlePageNoUpdate"
      @size-change="handlePageSizeUpdate"
    />

    <!-- add or update brand info -->
    <el-dialog title="新增品牌" :visible.sync="dialogFormVisible">
      <el-form style="width: 80%" :model="brandForm" :rules="brandFormRule" ref="brandForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="brandForm.tmName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="brandForm.logoUrl" :src="brandForm.logoUrl" class="avatar" alt="Brand Logo">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateBrandInfo">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

export default {
  name: 'Brand',
  data() {
    return {
      brandList: [],
      pageNo: 1,
      limit: 3,
      total: 0,
      dialogFormVisible: false,
      // 新增/修改表单
      brandForm: {
        id: null,
        tmName: '',
        logoUrl: ''
      },
      // 新增/修改 表单校验规则
      brandFormRule: {
        tmName: [
          { required: true, message: '请填写品牌名称', trigger: 'blur' },
          { min: 2, max: 10, message: '品牌名称应该控制在 2 到 10 个字符', trigger: 'change' },
          {
            // 自定义表单校验规则
            validator: (rule, value, callback) => {
              if (value.trim().length <= 0) {
                callback(new Error('品牌名不能为空'))
              } else {
                callback()
              }
            }, trigger: 'change'
          }
        ],
        logoUrl: [
          { required: true, message: '请上传品牌 Logo', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.handlePageNoUpdate()
  },
  methods: {
    // 页码更改
    async handlePageNoUpdate(pageNo = 1) {
      this.pageNo = pageNo
      const result = await this.$api.brand.getBrandList(this.pageNo, this.limit)
      this.brandList = result.data.records
      this.total = result.data.total
    },
    // 页显示条目更改
    async handlePageSizeUpdate(limit = 3) {
      this.limit = limit
      const result = await this.$api.brand.getBrandList(this.pageNo, this.limit)
      this.brandList = result.data.records
      this.total = result.data.total
    },
    // 图片上传之后的回调
    handleAvatarSuccess(res, file) {
      // res - 服务器上传成功的响应数据
      this.brandForm.logoUrl = res.data
    },
    // 图片上传之前的回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 显示新增图片的对话框
    showAddDialog() {
      // 初始化表单
      this.brandForm = { id: null, tmName: '', logoUrl: '' }
      this.dialogFormVisible = true
    },
    // 显示品牌的信息
    showBrandInfo(brandInfo) {
      // 浅拷贝数据，避免由于双向绑定带来的数据问题
      this.brandForm = { ...brandInfo }
      this.dialogFormVisible = true
    },
    // 添加/修改 品牌表单
    addOrUpdateBrandInfo() {
      this.$refs.brandForm.validate(async(success) => {
        // 判断表单校验是否通过
        if (success) {
          // 判断表单是否存在 id ，如果存在表示修改，反之就是新增
          const { id } = this.brandForm
          if (id) {
            await this.$api.brand.updateBrandInfo(this.brandForm)
          } else {
            // 新增品牌
            await this.$api.brand.saveBrandInfo(this.brandForm)
          }
          // 关闭弹出
          this.dialogFormVisible = false
          // 发送消息提示
          this.$message({
            message: id ? '修改数据成功' : '添加数据成功',
            type: 'success'
          })
          // 重新加载数据
          this.handlePageNoUpdate(id ? this.pageNo : 1)
        } else {
          this.$message({
            message: '请输入正确的值',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 删除品牌信息
    deleteBrandInfo(brandIndo) {
      // 打开消息弹框
      this.$confirm(`此操作将删除${brandIndo.tmName}品牌`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 发送删除请求
        await this.$api.brand.deleteBrandInfoById(brandIndo.id)
        // 弹出消息提示
        this.$message({
          message: '成功删除',
          type: 'success'
        })
        // 刷新页面
        this.handlePageNoUpdate(this.brandList.length > 1 ? this.pageNo : this.pageNo - 1)
      }).catch(() => {
        this.$message({
          message: '已取消删除',
          type: 'info'
        })
      })
    }
  }
}
</script>
<style lang="scss">
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .el-upload:hover {
    border-color: #409EFF;
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style lang="scss" scoped>
hr {
  border-color: #ffffff;
}

.brand-logo {
  width: 160px;
  height: 100px;
}
</style>
