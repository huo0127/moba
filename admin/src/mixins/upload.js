export default {
  computed: {
    uploadUrl () {
      return process.env.VUE_APP_API_URL + '/upload'
    },
  },
  methods: {
    getAuthHeaders () {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`,
      }
    },

    // 圖片上傳前的回調
    // 上傳的時候可以限制圖片的格式和大小
    beforeAvatarUpload (file) {
      // file代表的是上傳的那個圖片
      const isJPG = file.type === 'image/jpeg' // 判斷上傳的圖片是否為jpg
      const isPNG = file.type === 'image/png'; // 判斷上傳的圖片是否為png
      const isLt200KB = file.size / 1024 / 1024 < 1;
      if (!isJPG && !isPNG) {
        this.$message.error('上傳圖片只能是 JPG 或者是 PNG 格式!')
        return false
      }
      if (!isLt200KB) {
        this.$message.error('上傳圖片大小不能超過 1MB!')
        return false
      }
    },

    beforeVideoUpload (file) {
      let types = [
        "video/mp4",
        "video/ogg",
        "video/flv",
        "video/avi",
        "video/wmv",
        "video/rmvb",
      ];
      const isLt20M = file.size / 1024 / 1024 < 20 // 判斷上傳的影片是否小於10M

      if (types.indexOf(file.type) == -1) {
        this.$message.error("請上傳正確的影片格式");
        return false;
      }

      if (!isLt20M) {
        this.$message.error("上傳的影片不大於 20MB");
        return false;
      }
    },
  }
}
