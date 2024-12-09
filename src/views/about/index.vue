<template>
  <div v-loading="loading" class="app-container">
    <div class="block">关于我</div>
    <el-input
      v-model="url"
      type="text"
      style="max-width: 600px"
      :disabled="!modifying"
    />
    <div class="block">
      <el-button type="primary" class="button" @click="handleClick">
        {{ modifying ? '确认' : '修改' }}
      </el-button>
      <el-button v-if="modifying" @click="modifying = false">取消</el-button>
    </div>
  </div>
</template>

<script>
import { getAbout, updateAbout } from '@/api/about'

export default {
  data() {
    return {
      url: '',
      btnContent: '修改',
      modifying: false,
      loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      try {
        const res = await getAbout()
        if (typeof res === 'string' || res.code !== 0) {
          throw new Error('获取数据失败！')
        }
        this.url = res.data
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },
    async handleClick() {
      if (!this.modifying) {
        this.modifying = true
      } else {
        try {
          const res = await updateAbout({
            url: this.url
          })
          if (typeof res === 'string' || res.code !== 0) {
            throw new Error('修改失败！')
          }
          this.fetchData()
          this.$message.success('修改成功！')
        } catch (error) {
          this.$message.error(error.message)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-size: 20px;
  font-weight: lighter;
}
</style>
