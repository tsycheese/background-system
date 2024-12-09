<template>
  <div v-loading="loading" class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-position="top"
      style="max-width: 600px"
    >
      <div class="block">网站信息</div>
      <el-form-item label="网站标题">
        <el-input v-model="form.siteTitle" :disabled="!modifying"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.mail" :disabled="!modifying"></el-input>
      </el-form-item>
      <el-form-item label="备案号">
        <el-input v-model="form.icp" :disabled="!modifying"></el-input>
      </el-form-item>

      <el-divider></el-divider>

      <div class="block">网页头像信息</div>
      <Upload :image="form.avatar" @upload="handleAvatarUpload"></Upload>

      <el-divider></el-divider>

      <div class="block">网站图标信息</div>
      <el-form-item label="网址图标地址">
        <el-input v-model="form.favicon" :disabled="!modifying"></el-input>
      </el-form-item>
      <el-form-item label="网页图标预览">
        <el-image style="height: 100px" :src="form.favicon"></el-image>
      </el-form-item>
      <el-form-item label="备案号">
        <el-input v-model="form.icp" :disabled="!modifying"></el-input>
      </el-form-item>

      <el-divider></el-divider>

      <div class="block">Github信息</div>
      <el-form-item label="Github名字">
        <el-input v-model="form.githubName" :disabled="!modifying"></el-input>
      </el-form-item>
      <el-form-item label="Github地址">
        <el-input v-model="form.github" :disabled="!modifying"></el-input>
      </el-form-item>

      <el-divider></el-divider>

      <div class="block">QQ信息</div>
      <el-form-item label="QQ号码">
        <el-input v-model="form.qq" :disabled="!modifying"></el-input>
      </el-form-item>
      <el-form-item label="QQ二维码图片预览">
        <Upload :image="form.qqQrCode" @upload="handleQQAvatarUpload"></Upload>
      </el-form-item>

      <el-divider></el-divider>

      <div class="block">微信信息</div>
      <el-form-item label="微信号码">
        <el-input v-model="form.weixin" :disabled="!modifying"></el-input>
      </el-form-item>
      <el-form-item label="微信二维码图片预览">
        <Upload
          :image="form.weixinQrCode"
          @upload="handleWeixinAvatarUpload"
        ></Upload>
      </el-form-item>

      <el-divider></el-divider>

      <el-button type="primary" @click="handleEditClick">
        {{ modifying ? '确认' : '编辑' }}
      </el-button>
      <el-button v-if="modifying" @click="modifying = false">取消</el-button>
    </el-form>
  </div>
</template>

<script>
import Upload from '@/components/Upload'
import { getSetting, updateSetting } from '@/api/setting'

export default {
  components: {
    Upload
  },
  data() {
    return {
      form: {
        avatar: '',
        siteTitle: '',
        github: '',
        qq: '',
        qqQrCode: '',
        weixin: '',
        weixinQrCode: '',
        mail: '',
        icp: '',
        githubName: '',
        favicon: '',
        id: ''
      },
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
        const res = await getSetting()
        if (typeof res === 'string' || res.code !== 0) {
          throw new Error('请求数据失败！')
        }
        this.form = res.data
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },
    handleAvatarUpload(url) {
      this.form.avatar = url
    },
    handleQQAvatarUpload(url) {
      this.form.qqQrCode = url
    },
    handleWeixinAvatarUpload(url) {
      this.form.weixinQrCode = url
    },
    async handleEditClick() {
      if (!this.modifying) {
        this.modifying = true
      } else {
        this.modifying = false
        try {
          const res = await updateSetting(this.form)
          if (typeof res === 'string' || res.code !== 0) {
            throw new Error('修改失败！')
          }
          this.$message.success('修改成功！')
          this.fetchData()
        } catch (error) {
          this.$message.error(error.message)
        } finally {
          this.modifying = false
        }
      }
    }
  }
}
</script>

<style lang="scss">
.block {
  margin: 15px 0;
  font-size: 24px;
  font-weight: lighter;
}

.el-form-item__label {
  margin-bottom: 0;
  line-height: 20px;
}
</style>
