<template>
  <div class="createArticleContainer">
    <h1 class="title">{{ id ? '編輯' : '創建' }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save" ref="formData" :model="formData" :rules="rules">
      <el-form-item label="所属分類" prop="categories">
        <el-select v-model="formData.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <div class="createArtilceTitle">
        <el-form-item label="標題" prop="name">
          <el-input v-model="formData.name" v-focus></el-input>
        </el-form-item>
      </div>

      <el-form-item label="圖片">
        <UploadImage v-model="formData.iconPath" @getUploadImage="getUploadImage"></UploadImage>
      </el-form-item>

      <el-form-item label="詳情">
        <vue-editor v-model="formData.body" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="$router.push('/operate/article/list')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { updateArticle, createArticle, getArticle } from '@/api/article'
import { imageUpload } from '@/api/upload'
import { getCateList } from '@/api/category'
import UploadImage from '@/components/UploadImage'
export default {
  props: {
    id: {}
  },
  components: {
    VueEditor,
    UploadImage
  },
  data() {
    return {
      formData: {},
      categories: [],
      rules: {
        name: [{ required: true, message: '請輸入文章名稱', trigger: 'blur' }],
        categories: [{ required: true, message: '請選擇文章分類', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await imageUpload(formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.data.url)
      resetUploader()
    },

    save() {
      this.$refs.formData.validate(async valid => {
        if (valid) {
          try {
            if (this.id) {
              await updateArticle(this.id, this.formData)
            } else {
              await createArticle(this.formData)
            }
            this.$router.push('/operate/article/list')
            this.$message.success(this.id ? '編輯文章成功' : '創建文章成功')
          } catch (error) {
            this.$message.error(this.id ? '編輯文章失敗' : '創建文章失敗')
          }
        } else {
          return false
        }
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

    getUploadImage(val) {
      this.formData.iconPath = val
    }
  },
  created() {
    this.getCateList()
    this.id && this.getArticle()
  }
}
</script>
