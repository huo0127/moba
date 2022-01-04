<template>
  <div class="createItemContainer">
    <h1 class="title">{{ id ? '編輯' : '創建' }}裝備</h1>
    <el-card shadow="never">
      <el-form @submit.native.prevent="save" :model="formData" ref="formData" :rules="rules" label-width="120px">
        <el-form-item label="名稱" prop="name">
          <el-input v-model="formData.name" v-focus></el-input>
        </el-form-item>

        <el-form-item label="簡述">
          <el-input v-model="formData.plaintext" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="圖標">
          <UploadImage v-model="formData.iconPath" @getUploadImage="getUploadImage"></UploadImage>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
          <el-button @click="$router.push('/goods/item/list')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getItem, updateItem, createItem } from '@/api/item'
import UploadImage from '@/components/UploadImage'
export default {
  name: 'ItmeEdit',
  props: {
    id: {}
  },
  data() {
    return {
      formData: {},
      rules: {
        name: [{ required: true, message: '請輸入裝備名稱', trigger: 'blur' }]
      }
    }
  },

  components: { UploadImage },
  methods: {
    getUploadImage(val) {
      this.formData.iconPath = val
    },

    save() {
      this.$refs.formData.validate(async valid => {
        if (valid) {
          try {
            if (this.id) {
              await updateItem(this.id, this.formData)
            } else {
              await createItem(this.formData)
            }
            this.$message.success(this.id ? '編輯裝備成功' : '創建裝備成功')
            this.$router.push('/goods/item/list')
          } catch (err) {
            this.$message.error(this.id ? '編輯裝備失敗' : '創建裝備失敗')
          }
        } else {
          return false
        }
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
  .el-input__inner {
    width: 250px;
  }
  .el-textarea__inner {
    width: 500px;
  }
}
</style>
