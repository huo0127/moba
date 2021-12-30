<template>
  <div class="createArticleContainer">
    <h1 class="title">{{ id ? '編輯' : '創建' }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分類">
        <el-select v-model="formData.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <div class="createArtilceTitle">
        <el-form-item label="標題">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
      </div>

      <el-form-item label="圖片">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="formData.iconPath" :src="formData.iconPath" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="詳情">
        <vue-editor v-model="formData.body" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { updateArticle, createArticle, getArticle, articleImageUpload } from '@/api/article'
import { getCateList } from '@/api/category'
import upload from '@/mixins/upload'
export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  mixins: [upload],
  data() {
    return {
      formData: {},
      categories: []
    }
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await articleImageUpload(formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.data.url)
      resetUploader()
    },
    async save() {
      let res
      if (this.id) {
        res = await updateArticle(this.id, this.formData)
      } else {
        res = await createArticle(this.formData)
      }
      this.$router.push('/operate/article/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async getArticle() {
      const res = await getArticle(this.id)
      this.formData = res.data.data
    },
    async getCateList() {
      const res = await getCateList()
      const data = res.data.data.find(item => item.name === '新聞資訊')
      this.categories = data.children
    },
    afterUpload(res) {
      this.$set(this.formData, 'iconPath', res.data.data.url)
    }
  },
  created() {
    this.getCateList()
    this.id && this.getArticle()
  }
}
</script>
<style lang="scss">
.createArtilceTitle {
  .el-input__inner {
    width: 500px;
  }
}
</style>
