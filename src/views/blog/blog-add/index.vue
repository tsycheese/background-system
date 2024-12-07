<template>
  <div class="app-container">
    <!-- 文章标题 -->
    <div class="block">文章标题</div>
    <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: ''
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
