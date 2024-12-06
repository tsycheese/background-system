<template>
  <div class="app-container">
    <!-- 表格数据 -->
    <el-table :data="blogs" style="width: 100%" border>
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="文章名称"
        width="200px"
        prop="title"
        align="center"
      >
        <template slot-scope="scope">
          <el-popover
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          >
            <el-image
              style="width: 100%"
              :src="`${SERVER_URL}${scope.row.thumb}`"
              :preview-src-list="previewImages"
            />
            <span slot="reference" style="cursor: pointer">{{
              scope.row.title
            }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="文章描述" prop="description" />
      <el-table-column
        label="浏览数"
        width="100px"
        prop="scanNumber"
        align="center"
      />
      <el-table-column
        label="评论量"
        width="100px"
        prop="commentNumber"
        align="center"
      />
      <el-table-column
        label="所属分类"
        width="150px"
        prop="category"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.category.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="250px"
        prop="scanNumber"
        align="center"
      />
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <div slot="content">编辑</div>
            <el-button type="primary" icon="el-icon-edit" circle />
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

    <!-- 分页 -->
    <div style="margin: 20px 0">
      <el-pagination
        background
        layout="prev, pager, next, total"
        :total="total"
        :page-size="limit"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <!-- 对话框 -->
  </div>
</template>

<script>
import { SERVER_URL } from '@/urlConfig'
import { getBlogs, deleteBlog } from '@/api/blog'

export default {
  data() {
    return {
      blogs: [],
      page: 1,
      limit: 10,
      total: 0,
      previewImages: [],
      SERVER_URL
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await getBlogs(this.page, this.limit)
      console.log(res)
      this.blogs = res.data.rows
      this.total = res.data.total
      this.previewImages = res.data.rows.map(item => {
        return `${SERVER_URL}${item.thumb}`
      })
    },
    handleCurrentChange(val) {
      this.page = val
      this.fetchData()
    },
    handleDelete(blogId) {
      this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteBlog(blogId)
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(error => {
          if (error === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
    }
  }
}
</script>

<style lang="sass" scoped></style>
