<template>
  <div>
    <el-upload
      ref="upload"
      class="avatar-uploader"
      :disabled="imgIsUpload"
      :action="uploadUrl"
      :show-file-list="false"
      :headers="getAuthHeaders()"
      :http-request="uploadRequest"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-progress v-else-if="imgIsUpload" type="circle" percentage="imgUploadPercentage"></el-progress>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div slot="tip" class="el-upload__tip">只能上傳jpg/jpeg/png圖片，且不超過1MB</div>
    </el-upload>
  </div>
</template>

<script>
import { upload } from '@/api/upload'
export default {
  name: 'UploadImage',
  props: {
    value: {},
    supportType: {
      // 支持文件的格式
      default: () => ['image/jpeg', 'image/jpg', 'image/png'],
      type: Array
    }
  },
  data() {
    return {
      imgUrl: '',
      imgIsUpload: false,
      imgUploadPercentage: 0
    }
  },

  watch: {
    value: {
      immediate: true,
      handler: function(value) {
        if (!value) {
          this.imgUrl = ''
        }
        this.imgUrl = value
      }
    }
  },
  computed: {
    // 獲取接口地址
    uploadUrl() {
      return process.env.VUE_APP_API_URL + '/upload'
    }
  },
  methods: {
    // 直接從本地獲取token
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    },

    uploadRequest(param) {
      const isLt1MB = param.file.size / 1024 / 1024 < 1
      if (this.supportType.indexOf(param.file.type) == -1) {
        this.$message.error('上傳圖片只能 image/jpeg, image/jpg, image/png 格式!')
        return false
      }
      if (!isLt1MB) {
        this.$message.error('上傳圖片大小不能超過 1MB')
        return false
      }
      const fileObj = param.file

      const form = new FormData()
      form.append('file', fileObj)
      const callback = progress => {
        this.imgIsUpload = true
        this.imgUploadPercentage = progress
      }
      upload(form, callback).then(res => {
        this.imgIsUpload = false
        this.imgUploadPercentage = 0
        if (res.success === true) {
          this.imgUrl = res.data.data.url
          this.$emit('getUploadImage', res.data.data.url)
        } else {
          this.$message.error('上傳圖片失敗')
        }
      })
    }
  }
}
</script>

