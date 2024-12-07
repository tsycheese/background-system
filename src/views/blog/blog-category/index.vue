<template>
  <div v-loading="loading" class="app-container">
    <!-- 新建文章分类 -->
    <section style="display: flex; gap: 20px">
      <el-select v-model="chosenOrder" placeholder="博客分类等级">
        <el-option
          v-for="item in blogTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        v-model="chosenName"
        style="width: 250px"
        placeholder="输入博客分类名称"
      ></el-input>
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </section>

    <!-- 表格数据 -->
    <section>
      <el-table :data="blogTypes" width="auto" border>
        <el-table-column label="序号" width="50" align="center">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="博客类别" prop="name" align="center" />
        <el-table-column label="文章数量" prop="articleCount" align="center" />
        <el-table-column label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">编辑</div>
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="handleEdit(scope.row)"
              />
            </el-tooltip>
            <el-tooltip placement="top">
              <div slot="content">删除</div>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="handleDelete(scope.row.id)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <!-- 对话框 -->
    <el-dialog
      title="编辑文章分类"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="form" label-width="auto">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类等级">
          <el-select v-model="form.order" autocomplete="off">
            <el-option
              v-for="item in blogTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogTypes,
  addBlogType,
  deleteBlogType,
  updateBlogType
} from '@/api/blogType'

export default {
  data() {
    return {
      chosenOrder: 1,
      blogTypeOptions: [
        {
          value: 1,
          label: '一级分类'
        },
        {
          value: 2,
          label: '二级分类'
        },
        {
          value: 3,
          label: '三级分类'
        },
        {
          value: 4,
          label: '四级分类'
        },
        {
          value: 5,
          label: '五级分类'
        }
      ],
      chosenName: '',
      blogTypes: [],
      loading: false,
      dialogFormVisible: false,
      form: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true
        const res = await getBlogTypes()
        if (typeof res === 'string' || res.code !== 0) {
          throw new Error('获取博客分类失败！')
        }
        this.blogTypes = res.data
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },
    async handleAdd() {
      try {
        const data = {
          order: this.chosenOrder,
          name: this.chosenName
        }
        const res = await addBlogType(data)
        if (typeof res === 'string' || res.code !== 0) {
          throw new Error('添加文章类别失败！')
        }
        await this.fetchData()
        this.$message.success('添加成功！')
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    async handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            const res = await deleteBlogType(id)
            if (typeof res === 'string' || res.code !== 0) {
              throw new Error('删除文章分类失败！')
            }
            await this.fetchData()
            this.$message.success('删除成功！')
          } catch (error) {
            this.$message.error(error.message)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleEdit(row) {
      this.form = { ...row }
      this.dialogFormVisible = true
    },
    async handleEditSubmit() {
      try {
        const res = await updateBlogType(this.form.id, this.form)
        console.log(res)
        if (typeof res === 'string' || res.code !== 0) {
          throw new Error('修改文章分类失败！')
        }
        await this.fetchData()
        this.$message.success('修改成功！')
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.dialogFormVisible = false
      }
    }
  }
}
</script>

<style scoped>
section {
  margin-bottom: 30px;
}
</style>
