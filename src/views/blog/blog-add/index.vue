<template>
  <div class="app-container">
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
    <el-button type="primary" @click="handleSubmit">发布文章</el-button>
  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import Upload from '@/components/Upload'
import { getBlogTypes } from '@/api/blogType'
import { postBlog } from '@/api/blog'

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
      blogTypes: []
    }
  },
  created() {
    this.fetchBlogTypes()
  },
  methods: {
    handleImageUpload(url) {
      this.form.thumb = url
    },
    async fetchBlogTypes() {
      const res = await getBlogTypes()
      this.blogTypes = res.data
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
      console.log(obj)
      try {
        const res = await postBlog(obj)
        if (typeof res === 'string' || res.code !== 0) {
          throw new Error('提交失败')
        }
        this.$message.success('提交成功！')
        this.$router.push({ path: '/blog/list' })
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
