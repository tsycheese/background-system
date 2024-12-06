<template>
  <div class="upload-container">
    <h3>{{ title }}</h3>
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :headers="headers"
    >
      <img v-if="image" :src="imgageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { SERVER_URL } from '@/urlConfig'
import { getToken } from '@/utils/auth'

export default {
  props: {
    title: {
      type: String,
      default: '上传头像'
    },
    image: {
      type: String,
      default: ''
    }
  },
  computed: {
    imgageUrl() {
      return SERVER_URL + this.image
    },
    headers() {
      return {
        Authorization: 'Bearer ' + getToken() // 从本地获取 token，添加到 header 里面
      }
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      if (typeof res === 'string') {
        this.$message.error('上传失败，请重试！')
        return
      }
      this.$emit('upload', res.data)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  min-width: 178px;
  height: 178px;
  display: block;
}
</style>
