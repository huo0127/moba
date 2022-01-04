<template>
  <div>
    <el-upload
      ref="upload"
      class="avatar-uploader"
      :disabled="videoIsUpload"
      :action="uploadUrl"
      :show-file-list="false"
      :headers="getAuthHeaders()"
      :http-request="uploadRequest"
    >
      <div class="videoContainer">
        <video :src="videoUrl" v-if="videoUrl" controls class="video" />
        <el-progress v-else-if="videoIsUpload" type="circle" percentage="videoUploadPercentage"></el-progress>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <div slot="tip" class="el-upload__tip">只能上傳 mp4/ogg/flv/avi/wmv/rmvb 影片，且不超過10MB</div>
    </el-upload>
  </div>
</template>

<script>
import { upload } from '@/api/upload'
export default {
  name: 'UploadVideo',
  props: {
    value: {},
    supportType: {
      // 支持文件的格式
      default: () => ['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'],
      type: Array
    }
  },
  data() {
    return {
      videoUrl: '',
      videoIsUpload: false,
      videoUploadPercentage: 0
    }
  },

  watch: {
    value: {
      immediate: true,
      handler: function(value) {
        if (!value) {
          this.videoUrl = ''
        }
        this.videoUrl = value
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
      // 判斷上傳的影片是否小於10M
      const isLt20M = param.file.size / 1024 / 1024 < 20
      if (this.supportType.indexOf(param.file.type) == -1) {
        this.$message.error('請上傳正確的影片格式')
        return false
      }
      if (!isLt20M) {
        this.$message.error('上傳的影片不大於 20MB')
        return false
      }

      const fileObj = param.file

      const form = new FormData()
      form.append('file', fileObj)
      const callback = progress => {
        this.videoIsUpload = true
        this.videoUploadPercentage = progress
      }
      upload(form, callback).then(res => {
        this.videoIsUpload = false
        this.videoUploadPercentage = 0
        if (res.success === true) {
          this.videoUrl = res.data.data.url
          console.log(this.videoUrl)
          this.$emit('getUploadVideo', res.data.data.url)
        } else {
          this.$message.error('上傳圖片失敗')
        }
      })
    }
  }
}
</script>

