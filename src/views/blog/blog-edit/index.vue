<template>
  <div v-loading="loading" class="app-container">
    <div class="block">文章标题</div>
    <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>

    <div class="block">文章编辑</div>
    <Editor
      ref="editor"
      :options="editorOptions"
      height="600px"
      @blur="handleEditorBlur"
    />

    <div class="block">文章描述</div>
    <el-input v-model="form.description" type="textarea" rows="6"></el-input>

    <div class="block">文章头图</div>
    <Upload :image="form.thumb" @upload="handleImageUpload" />

    <div class="block">选择分类</div>
    <el-select v-model="form.categoryId" placeholder="请选择分类">
      <el-option
        v-for="item in blogTypes"
        :key="item.id"
        :value="item.id"
        :label="item.name"
      ></el-option>
    </el-select>

    <div class="block"></div>
    <el-button type="primary" @click="handleSubmit">确认修改</el-button>
    <el-button @click="handleCancel">取消</el-button>
  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import Upload from '@/components/Upload'
import { getBlogTypes } from '@/api/blogType'
import { getBlogById, updateBlog } from '@/api/blog'

export default {
  components: {
    Editor,
    Upload
  },
  data() {
    return {
      editorOptions: {
        hideModeSwitch: true
      },
      form: {
        title: '',
        editorContent: '',
        description: '枫与铃',
        thumb: '',
        categoryId: ''
      },
      blogTypes: [],
      blogId: '',
      loading: false
    }
  },
  created() {
    this.fetchBlogTypes()
    this.blogId = this.$route.query.blogId
    this.fetchBlogInfo()
  },
  methods: {
    handleImageUpload(url) {
      this.form.thumb = url
    },
    async fetchBlogTypes() {
      const res = await getBlogTypes()
      this.blogTypes = res.data
    },
    async fetchBlogInfo() {
      this.loading = true
      const res = await getBlogById(this.blogId)
      if (typeof res === 'string' || res.code !== 0) {
        this.$message.error('获取博客信息失败！')
        this.loading = false
        return
      }
      Object.assign(this.form, res.data)
      this.form.categoryId = res.data.category?.id
      this.form.editorContent = res.data.htmlContent
      this.$refs.editor.invoke('setHTML', this.form.editorContent)
      this.loading = false
    },
    handleEditorBlur() {
      this.form.editorContent = this.$refs.editor.invoke('getHTML')
    },
    validateForm() {
      const map = {
        title: '标题',
        editorContent: '文章内容',
        description: '描述',
        categoryId: '文章分类'
      }
      for (const prop in map) {
        if (!this.form[prop]) {
          this.$message.error('请先填写' + map[prop] + '!')
          return false
        }
      }
      if (this.form.editorContent === '<p><br></p>') {
        this.$message.error('请先填写文章内容!')
        return false
      }
      return true
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        return
      }
      const html = this.$refs.editor.invoke('getHTML')
      const obj = {
        title: this.form.title,
        description: this.form.description,
        thumb: this.form.thumb,
        categoryId: this.form.categoryId,
        htmlContent: html
      }
      try {
        const res = await updateBlog(this.blogId, obj)
        if (typeof res === 'string' || res.code !== 0) {
          throw new Error('修改失败')
        }
        this.$message.success('修改成功！')
        this.$router.push({ path: this.$route.query.redirect })
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    handleCancel() {
      this.$router.push({ path: this.$route.query.redirect })
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
