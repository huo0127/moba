<template>
  <div>
    <h1>廣告位列表</h1>
    <el-card>
      <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">創建廣告</el-button>
      <el-table :data="adList">
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

    <el-dialog :title="!this.model._id ? '創建廣告位' : '編輯廣告位'" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="廣告位名稱">
          <el-input v-model="model.name"></el-input>
        </el-form-item>

        <HintButton type="primary" icon="el-icon-plus" title="創建廣告位" @click="addAdInfo"></HintButton>
        <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
          <el-col :span="12" v-for="(item, i) in model.items" :key="i">
            <el-card>
              <el-form-item label="跳轉連結 (URL)">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="圖片" style="margin-top: 0.5rem">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'image', res.data.url)"
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="save" type="primary">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createAd, updateAd, deleteAd, getAdList } from '@/api/ad'
import upload from '@/mixins/upload'
export default {
  data() {
    return {
      adList: [],
      dialogFormVisible: false,
      //  廣告位數據
      model: {
        items: []
      },
      id: ''
    }
  },
  mixins: [upload],
  created() {
    this.getAdList()
  },
  methods: {
    async getAdList() {
      const res = await getAdList()
      this.adList = res
    },
    showAddDialog() {
      this.dialogFormVisible = true
      this.model = {
        items: [{}]
      }
    },
    dialogClose() {
      this.model = { items: [] }
    },
    addAdInfo() {
      this.model.items.push({})
    },
    async showUpdateDialog(row) {
      this.dialogFormVisible = true
      this.model = {
        ...row
      }
      this.id = row._id
    },
    remove(row) {
      this.$confirm(`是否確定要删除 "${row.name}"`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deleteAd(row._id)
        if (!res) return
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getAdList()
      })
    },
    async save() {
      if (this.id) {
        const res = await updateAd(this.id, this.model)
        if (!res) return
        this.$message.success('編輯廣告位成功')

        this.getAdList()
        this.dialogFormVisible = false
      } else {
        const res = await createAd(this.model)
        if (!res) return
        this.$message.success('創建廣告位成功')

        this.getAdList()
        this.dialogFormVisible = false
      }
    }
  }
}
</script>

