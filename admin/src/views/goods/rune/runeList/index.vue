<template>
  <div class="runeListContainer">
    <h1 class="title">天賦符文列表</h1>
    <el-card shadow="never">
      <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">新建天賦符文</el-button>
      <div style="margin-top: 1.3rem">
        <el-row>
          <SearchBar @search="searchRune"></SearchBar>
        </el-row>
      </div>

      <div class="tableItem">
        <el-table :data="runeList" border stripe>
          <el-table-column prop="ID" label="ID" />
          <el-table-column prop="name" label="天賦名稱" width="width" />

          <el-table-column prop="icon" label="圖標">
            <template slot-scope="scope">
              <img :src="scope.row.icon" style="height: 3rem" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <HintButton title="編輯" type="warning" icon="el-icon-edit" @click="showUpdateDialog(row)"></HintButton>
              <HintButton title="刪除" type="danger" icon="el-icon-delete" @click="deleteRune(row)"></HintButton>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <div class="runeDialogContainer">
      <el-dialog :title="formData._id ? '編輯天賦符文' : '創建天賦符文'" :visible.sync="dialogFormVisible">
        <el-form ref="formData" :model="formData" :label-position="labelPosition">
          <el-form-item label="圖標" label-width="100px">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(res) => $set(formData, 'icon', res.data.data.url)"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="formData.icon" :src="formData.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="ID" label-width="100px">
            <el-input v-model="formData.ID" />
          </el-form-item>
          <el-form-item label="名稱" label-width="100px">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="slotLabel" label-width="100px">
            <el-input v-model="formData.slotLabel" />
          </el-form-item>
          <el-form-item label="主符文" label-width="100px">
            <el-input v-model="formData.styleName" />
          </el-form-item>
          <el-form-item label="長述" label-width="100px">
            <el-input v-model="formData.longdesc" type="textarea" />
          </el-form-item>
          <el-form-item label="短述" label-width="100px">
            <el-input v-model="formData.shortdesc" type="textarea" />
          </el-form-item>
          <el-form-item label="tip" label-width="100px">
            <el-input v-model="formData.tooltip" type="textarea" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="save">確定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 分頁器 -->
    <Pagination
      v-if="total > 0"
      @pagination="fetchRuneList"
      :limit.sync="pageParams.pagesize"
      :page.sync="pageParams.pagenum"
      :total="total"
    ></Pagination>
  </div>
</template>

<script>
import upload from '@/mixins/upload'
import { getRuneList, deleteRune, createRune, updateRune } from '@/api/rune'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import indexMethod from '@/mixins/indexMethod'
export default {
  name: 'RuneList',
  data() {
    return {
      labelPosition: 'right',
      runeList: [],
      dialogFormVisible: false,
      formData: {},
      pageParams: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  components: { Pagination, SearchBar },
  mixins: [upload, indexMethod],
  mounted() {
    this.fetchRuneList()
  },
  methods: {
    async fetchRuneList() {
      const res = await getRuneList(this.pageParams)
      this.runeList = res.data.data
      this.total = res.data.total
    },

    showAddDialog() {
      this.dialogFormVisible = true

      this.formData = {}
    },
    showUpdateDialog(row) {
      this.dialogFormVisible = true
      this.formData = {
        ...row
      }
      this.id = row._id
    },

    deleteRune(row) {
      this.$confirm(`確定刪除${row.name}嗎？`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          try {
            await deleteRune(row._id)
            // 1、刪除成功後提示
            this.$message.success('刪除成功!')
            this.fetchRuneList()
          } catch (error) {
            this.$message.error('刪除失敗')
          }
        })
        .catch(() => {
          // catch處理的就是點擊取消的邏輯
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    async save() {
      if (!this.formData._id) {
        const res = await createRune(this.formData)
        if (!res) return
        this.$message.success('創建天賦符文成功')
        this.fetchRuneList()
        this.dialogFormVisible = false
      } else {
        const res = await updateRune(this.id, this.formData)
        if (!res) return
        this.$message.success('編輯天賦符文成功')
        this.fetchRuneList()
        this.dialogFormVisible = false
      }
    },

    async searchRune(val) {
      this.pageParams.query = val
      this.pageParams.pagenum = 1
      this.fetchRuneList(this.pageParams)
    }
  }
}
</script>

