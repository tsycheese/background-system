<template>
  <div class="app-container">
    <el-table :data="banners" style="width: 100%" border>
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="180" align="center" />

      <el-table-column prop="description" label="描述" />

      <el-table-column prop="midImg" label="中图预览" align="center">
        <template slot-scope="scope">
          <el-image style="height: 100px" :src="scope.row.midImg" />
        </template>
      </el-table-column>

      <el-table-column prop="bigImg" label="大图预览" align="center">
        <template slot-scope="scope">
          <el-image style="height: 100px" :src="scope.row.bigImg" />
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150" align="center">
        <el-tooltip placement="top">
          <div slot="content">编辑</div>
          <el-button type="primary" icon="el-icon-edit" circle />
        </el-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getBanners } from '@/api/banner'

export default {
  data() {
    return {
      banners: []
    }
  },
  created() {
    this.getBanners()
  },
  methods: {
    async getBanners() {
      const res = await getBanners()
      this.banners = res.data
    }
  }
}
</script>
