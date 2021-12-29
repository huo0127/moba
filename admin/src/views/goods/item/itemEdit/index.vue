<template>
  <div class="createItemContainer">
    <h1 class="title">{{ id ? '編輯' : '創建' }}裝備</h1>
    <el-card shadow="never">
      <el-form @submit.native.prevent="save" :model="formData" ref="formData">
        <el-form-item label="名稱" label-width="100px">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="圖標" label-width="100px">
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
        <el-form-item label="簡述" label-width="100px">
          <el-input v-model="formData.plaintext" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getItem, updateItem, createItem } from '@/api/item'
import upload from '@/mixins/upload'
export default {
  name: 'ItmeEdit',
  props: {
    id: {}
  },
  mixins: [upload],
  data() {
    return {
      formData: {}
    }
  },
  methods: {
    afterUpload(res) {
      this.$set(this.formData, 'iconPath', res.data.data.url)
    },
    async save() {
      let res
      if (this.id) {
        res = await updateItem(this.id, this.formData)
      } else {
        res = await createItem(this.formData)
      }
      this.$router.push('/goods/item/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async getItem() {
      const res = await getItem(this.id)
      this.formData = res.data.data
    }
  },
  created() {
    this.id && this.getItem()
  }
}
</script>
<style lang="scss">
.createItemContainer {
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
  .el-input__inner {
    width: 250px;
  }
  .el-textarea__inner {
    width: 500px;
  }
}
</style>
