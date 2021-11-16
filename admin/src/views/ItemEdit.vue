<template>
  <div class="about">
    <h1>{{ id ? '編輯' : '新建' }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名稱">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="圖標">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="formData.iconPath" :src="formData.iconPath" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="簡述">
        <el-input v-model="formData.plaintext" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getItem, updateItem, createItem } from '@/api/admin/item'
export default {
  props: {
    id: {}
  },
  data() {
    return {
      formData: {}
    }
  },
  methods: {
    afterUpload(res) {
      this.$set(this.formData, 'iconPath', res.url)
      // this.formData.icon = res.url
    },
    async save() {
      let res
      if (this.id) {
        res = await updateItem(this.id, this.formData)
      } else {
        res = await createItem(this.formData)
      }
      this.$router.push('/items/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await getItem(this.id)
      this.formData = res.data
    }
  },
  created() {
    this.id && this.fetch()
  }
}
</script>

