<template>
  <div v-loading="loading" class="app-container">
    <!-- 数据表格 -->
    <el-table :data="comments" style="width: 100%" border>
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <el-image
            style="height: 50px"
            :src="`${SERVER_URL}${scope.row.avatar}`"
          />
        </template>
      </el-table-column>

      <el-table-column
        label="昵称"
        width="200"
        prop="nickname"
        align="center"
      />

      <el-table-column label="内容" prop="content" align="center" />

      <el-table-column label="创建日期" width="250" align="center">
        <template slot-scope="scope">
          {{ formatDate(scope.row.createDate) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
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
        layout="prev, pager, next, total, ->, sizes, jumper"
        :total="total"
        :page-size="limit"
        :page-sizes="[5, 10, 15, 20]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getComments, deleteComment } from '@/api/comment'
import { SERVER_URL } from '@/urlConfig'
import { formatDate } from '@/utils/tools'

export default {
  data() {
    return {
      SERVER_URL,
      loading: false,
      comments: [],
      page: 1,
      limit: 5,
      total: 0
    }
  },
  created() {
    this.fetchComments()
  },
  methods: {
    async fetchComments() {
      this.loading = true
      try {
        const res = await getComments(this.page, this.limit)
        if (typeof res === 'string' || res.code !== 0) {
          throw new Error('请求数据失败！')
        }
        this.comments = res.data.rows
        this.total = res.data.total
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },
    handleCurrentChange(val) {
      this.page = val
      this.fetchComments()
    },
    handleSizeChange(val) {
      this.limit = val
      this.fetchComments()
    },
    async handleDelete(id) {
      this.$confirm('是否删除该评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteComment(id)
          this.fetchComments()
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
    },
    formatDate
  }
}
</script>

<style lang="sass" scoped></style>
