<template>
  <div class="app-container">
    <div class="block">项目名称</div>
    <el-input v-model="form.name" placeholder="请输入文章标题"></el-input>

    <div class="block">项目描述（英文逗号分割）</div>
    <el-input v-model="form.description"></el-input>

    <div class="block">项目链接</div>
    <el-input v-model="form.url"></el-input>

    <div class="block">Github 地址</div>
    <el-input v-model="form.github"></el-input>

    <div class="block">项目预览图</div>
    <Upload :image="form.thumb" @upload="handleImageUpload"></Upload>

    <div class="block">项目等级</div>
    <el-select v-model="form.order">
      <el-option label="1" :value="1"></el-option>
      <el-option label="2" :value="2"></el-option>
      <el-option label="3" :value="3"></el-option>
    </el-select>

    <div class="block"></div>
    <el-button type="primary" @click="handleSubmit">发布项目</el-button>
  </div>
</template>

<script>
import { postProject } from '@/api/project'
import Upload from '@/components/Upload'

export default {
  components: {
    Upload
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        url: '',
        github: '',
        thumb: '',
        order: ''
      }
    }
  },
  methods: {
    handleImageUpload(url) {
      this.form.thumb = url
    },
    validateForm() {
      const map = {
        name: '项目标题',
        description: '项目描述',
        url: '项目地址',
        github: '项目Github地址',
        thumb: '项目预览图',
        order: '项目等级'
      }
      for (var prop in map) {
        if (!this.form[prop]) {
          this.$message.error('请先填写' + map[prop] + '！')
          return false
        }
      }
      return true
    },
    async handleSubmit() {
      if (!this.validateForm()) return
      const data = {
        ...this.form,
        description: this.form.description.split(',')
      }
      try {
        const res = await postProject(data)
        if (typeof res === 'string' || res.code !== 0) {
          throw new Error('提交失败，服务器发生错误')
        }
        this.$message.success('提交成功！')
        this.$router.push({
          path: '/project/list'
        })
      } catch (error) {
        this.$message.error(error.message)
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
