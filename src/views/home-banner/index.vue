<template>
  <div class="app-container">
    <!-- 表格数据 -->
    <el-table :data="banners" style="width: 100%" border>
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title" width="180" align="center" />
      <el-table-column label="描述" prop="description" />
      <el-table-column label="中图预览" prop="midImg" align="center">
        <template slot-scope="scope">
          <el-image
            style="height: 100px"
            :src="`${SERVER_URL}${scope.row.midImg}`"
          />
        </template>
      </el-table-column>
      <el-table-column label="大图预览" prop="bigImg" align="center">
        <template slot-scope="scope">
          <el-image
            style="height: 100px"
            :src="`${SERVER_URL}${scope.row.bigImg}`"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <div slot="content">编辑</div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="openEditDialog(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <el-dialog
      title="编辑标语"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <div style="display: flex; justify-content: space-around">
          <Upload
            title="中图预览"
            :image="form.midImg"
            @upload="hanleMidImageUpload"
          />
          <Upload
            title="大图预览"
            :image="form.bigImg"
            @upload="hanleBidImageUpload"
          />
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanners } from '@/api/banner'
import { SERVER_URL } from '@/urlConfig'
import Upload from '@/components/Upload'
import { setBanner } from '@/api/banner'

export default {
  components: {
    Upload
  },
  data() {
    return {
      banners: [],
      dialogFormVisible: false,
      form: {
        id: '',
        title: '',
        description: '',
        midImg: '',
        bigImg: ''
      },
      SERVER_URL
    }
  },
  created() {
    this.getBanners()
  },
  methods: {
    async getBanners() {
      const res = await getBanners()
      this.banners = res.data
    },
    openEditDialog(row) {
      this.form = { ...row }
      this.dialogFormVisible = true
    },
    hanleMidImageUpload(data) {
      this.form.midImg = data
    },
    hanleBidImageUpload(data) {
      this.form.bigImg = data
    },
    async editSubmit() {
      const data = this.banners.map(item => {
        if (item.id === this.form.id) {
          return this.form
        }
        return item
      })
      const res = await setBanner(data)
      if (typeof res === 'string' || res.code !== 0) {
        this.$message.error('编辑失败，请重试！')
        return
      }
      this.$message.success('编辑成功！')
      this.getBanners()
      this.dialogFormVisible = false
    }
  }
}
</script>
