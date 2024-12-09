<template>
  <div v-loading="loading" class="app-container">
    <!-- 表格数据 -->
    <el-table :data="projects" style="width: 100%" border>
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="项目名称"
        width="200"
        align="center"
        prop="name"
      />
      <el-table-column label="项目描述">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.description" :key="index">
            {{ item }}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="项目描述" width="300" align="center">
        <template slot-scope="scope">
          <el-image
            style="height: 100px"
            :src="`${SERVER_URL}${scope.row.thumb}`"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <div slot="content">github 地址</div>
            <a
              :href="scope.row.github"
              target="_blank"
              class="github iconfont icon-github"
            />
          </el-tooltip>
          <el-tooltip placement="top">
            <div slot="content">编辑</div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.row.id)"
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
  </div>
</template>

<script>
import { getProjects, deleteProject } from '@/api/project'
import { SERVER_URL } from '@/urlConfig'

export default {
  data() {
    return {
      projects: [],
      loading: false,
      SERVER_URL
    }
  },
  created() {
    this.fetchProjects()
  },
  methods: {
    async fetchProjects() {
      this.loading = true
      const res = await getProjects()
      if (typeof res === 'string' || res.code !== 0) {
        this.$message.error('获取数据失败!')
        this.loading = false
        return
      }
      this.projects = res.data
      this.loading = false
    },
    handleEdit(id) {
      this.$router.push({
        path: '/project/edit',
        query: {
          redirect: '/project/list',
          projectId: id
        }
      })
    },
    handleDelete(id) {
      this.$confirm('确定删除此项目吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteProject(id)
          this.fetchProjects()
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

<style lang="scss" scoped>
.github {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background-color: rgb(163, 163, 163);
  line-height: 40px;
  text-align: center;
  margin-right: 10px;
}
</style>
