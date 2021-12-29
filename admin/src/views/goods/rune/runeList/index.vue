<template>
  <div>
    <h1>天賦符文列表</h1>
    <el-card>
      <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">新建天賦符文</el-button>
      <el-row>
        <el-col :span="6">
          <el-input maxlength="8" clearable placeholder="請輸入符文" v-model="runeQuery"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button style="margin-left: 20px" type="primary" icon="el-icon-search" @click="searchRune">搜索</el-button>
        </el-col>
      </el-row>

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
    </el-card>
    <el-dialog :title="formData._id ? '編輯天賦符文' : '創建天賦符文'" :visible.sync="dialogFormVisible">
      <el-form ref="formData" :model="formData">
        <el-form-item label="圖標">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="(res) => $set(formData, 'icon', res.data.url)"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formData.icon" :src="formData.icon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="ID">
          <el-input v-model="formData.ID" />
        </el-form-item>
        <el-form-item label="名稱">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item v-if="formData.slotLabel" label="slotLabel">
          <el-input v-model="formData.slotLabel" />
        </el-form-item>
        <el-form-item v-if="formData.styleName" label="主符文">
          <el-input v-model="formData.styleName" />
        </el-form-item>
        <el-form-item v-if="formData.longdesc" label="長述">
          <el-input v-model="formData.longdesc" type="textarea" />
        </el-form-item>
        <el-form-item v-if="formData.shortdesc" label="短述">
          <el-input v-model="formData.shortdesc" type="textarea" />
        </el-form-item>
        <el-form-item label="tip">
          <el-input v-model="formData.tooltip" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">確定</el-button>
      </div>
    </el-dialog>
    <!-- 分頁器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageParams.pagenum"
      :page-sizes="[5, 8, 10, 15]"
      :page-size="pageParams.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import upload from '@/mixins/upload'
import { getRuneList, deleteRune, createRune, updateRune } from '@/api/rune'
import indexMethod from '@/mixins/indexMethod'
export default {
  name: 'RuneList',
  data() {
    return {
      runeList: [],
      dialogFormVisible: false,
      formData: {},
      pageParams: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      runeQuery: ''
    }
  },
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

    handleSizeChange(pagesize) {
      this.pageParams.pagesize = pagesize
      this.fetchRuneList()
    },
    handleCurrentChange(pagenum) {
      this.pageParams.pagenum = pagenum
      this.fetchRuneList()
    },
    async searchRune() {
      this.pageParams.query = this.runeQuery
      this.pageParams.pagenum = 1
      this.fetchRuneList(this.pageParams)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
