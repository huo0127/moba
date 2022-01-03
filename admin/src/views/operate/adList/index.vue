<template>
  <div class="createAdContainer">
    <h1 class="title">廣告位列表</h1>
    <el-card shadow="never">
      <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">創建廣告</el-button>

      <el-table :data="adList" border stripe>
        <el-table-column type="index" label="序號"></el-table-column>
        <el-table-column prop="name" label="名稱"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="{ row, $index }">
            <HintButton type="warning" title="編輯" icon="el-icon-edit" @click="showUpdateDialog(row)"></HintButton>
            <HintButton type="danger" title="刪除" icon="el-icon-delete" @click="remove(row)"></HintButton>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      :title="!model._id ? '創建廣告位' : '編輯廣告位'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form ref="model" :model="model" :rules="rules" :label-position="labelPosition" label-width="120px">
        <el-form-item label="廣告位名稱" prop="name">
          <el-input ref="name" v-model="model.name"></el-input>
        </el-form-item>

        <div style="margin-bottom: 0.8rem">
          <HintButton type="primary" icon="el-icon-plus" title="創建廣告位" @click="model.items.push({})"></HintButton>
        </div>
        <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
          <el-col :span="12" v-for="(item, i) in model.items" :key="i">
            <el-card shadow="never">
              <el-form-item label="跳轉連結 (URL)" prop="url">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="圖片" style="margin-top: 0.5rem" prop="image">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'image', res.data.data.url)"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="item.image" :src="item.image" style="width: 300px" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <!-- 創建或修改廣告位的刪除 -->
              <el-form-item>
                <HintButton
                  type="danger"
                  icon="el-icon-delete"
                  title="刪除廣告位"
                  @click="model.items.splice(i, 1)"
                ></HintButton>
              </el-form-item>
            </el-card>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button @click="save" type="primary">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createAd, updateAd, deleteAd, getAdList } from '@/api/ad'
import upload from '@/mixins/upload'
export default {
  name: 'AdList',
  data() {
    return {
      labelPosition: 'top',
      adList: [],
      dialogFormVisible: false,
      //  廣告位數據
      model: {
        items: []
      },
      id: '',
      rules: {
        name: [{ required: true, message: '請輸入廣告名稱', trigger: 'blur' }]
      }
    }
  },
  mixins: [upload],
  created() {
    this.getAdList()
  },
  methods: {
    async getAdList() {
      const res = await getAdList()
      this.adList = res.data.data
    },

    async showUpdateDialog(row) {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.model = {
          ...row
        }
        this.id = row._id
      })
    },

    handleReset() {
      this.model = {
        items: []
      }
      this.$nextTick(() => {
        this.$refs.model.resetFields()
      })
    },

    handleClose() {
      this.handleReset()
      this.dialogFormVisible = false
    },

    remove(row) {
      this.$confirm(`是否確定要删除 "${row.name}"`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await deleteAd(row._id)
          if (!res) return
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getAdList()
        })
        .catch(() => {
          // catch處理的就是點擊取消的邏輯
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    save() {
      this.$refs.model.validate(async valid => {
        if (valid) {
          try {
            if (this.model._id) {
              await updateAd(this.id, this.model)
            } else {
              await createAd(this.model)
            }
            this.$message.success(this.model._id ? '編輯廣告成功' : '創建廣告成功')
            this.dialogFormVisible = false
            this.getAdList()
          } catch (error) {
            this.$message.error(this.model._id ? '編輯廣告失敗' : '創建廣告失敗')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
