<template>
  <div class="runeListContainer">
    <h1 class="title">天賦符文列表</h1>
    <el-card shadow="never">
      <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">新建天賦符文</el-button>
      <div style="margin-top: 1.3rem">
        <el-row>
          <SearchBar @search="searchRune" :placeholder="placeholder"></SearchBar>
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
      <el-dialog
        :title="formData._id ? '編輯天賦符文' : '創建天賦符文'"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <el-form ref="formData" :model="formData" :label-position="labelPosition" :rules="rules">
          <el-form-item label="圖標" prop="icon">
            <UploadImage v-model="formData.icon" @getUploadImage="getUploadImage"></UploadImage>
          </el-form-item>
          <el-form-item label="名稱" prop="name">
            <el-input v-model="formData.name" ref="name" />
          </el-form-item>
          <el-form-item label="ID" prop="ID">
            <el-input v-model="formData.ID" />
          </el-form-item>
          <el-form-item label="slotLabel" prop="slotLabel">
            <el-input v-model="formData.slotLabel" />
          </el-form-item>
          <el-form-item label="主符文" prop="styleName">
            <el-input v-model="formData.styleName" />
          </el-form-item>
          <el-form-item label="長述" prop="longdesc">
            <el-input v-model="formData.longdesc" type="textarea" />
          </el-form-item>
          <el-form-item label="短述" prop="shortdesc">
            <el-input v-model="formData.shortdesc" type="textarea" />
          </el-form-item>
          <el-form-item label="tip" prop="tooltip">
            <el-input v-model="formData.tooltip" type="textarea" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
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
import { getRuneList, deleteRune, createRune, updateRune } from '@/api/rune'
import UploadImage from '@/components/UploadImage'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'

export default {
  name: 'RuneList',
  data() {
    const checkRuneId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請輸入天賦符文ID'))
      } else if (!Number.isInteger(value)) {
        callback(new Error('天賦符雯ID必須是數字'))
      } else {
        callback()
      }
    }
    return {
      placeholder: '請輸入您想查詢的符文',
      labelPosition: 'top',
      runeList: [],
      dialogFormVisible: false,
      formData: {
        icon: '',
        name: '',
        ID: '',
        slotLabel: '',
        styleName: '',
        longdesc: '',
        shortdesc: '',
        tooltip: ''
      },
      pageParams: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0,

      // 驗證
      rules: {
        name: [{ required: true, message: '請輸入符文天賦名稱', trigger: 'blur' }],
        ID: [{ required: true, validator: checkRuneId, trigger: 'blur' }]
      }
    }
  },
  components: { Pagination, SearchBar, UploadImage },

  mounted() {
    this.fetchRuneList()
  },

  methods: {
    async fetchRuneList() {
      const res = await getRuneList(this.pageParams)
      this.runeList = res.data.data
      this.total = res.data.total
    },

    showUpdateDialog(row) {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.formData = {
          ...row
        }
        this.id = row._id
      })
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
    save() {
      this.$refs.formData.validate(async valid => {
        if (valid) {
          try {
            if (this.formData._id) {
              await updateRune(this.id, this.formData)
            } else {
              await createRune(this.formData)
            }
            this.$message.success(this.formData._id ? '編輯天賦符文成功' : '創建天賦符文成功')
            this.dialogFormVisible = false
            this.fetchRuneList()
          } catch (err) {
            this.$message.error(this.formData._id ? '編輯天賦符文失敗' : '創建天賦符文失敗')
          }
        } else {
          return false
        }
      })
    },

    indexMethod(index) {
      // this.pageParams.pagenum當前頁    this.pageParams.pagesize一頁展示行數
      return index + 1 + (this.pageParams.pagenum - 1) * this.pageParams.pagesize
    },

    async searchRune(val) {
      this.pageParams.query = val
      this.pageParams.pagenum = 1
      this.fetchRuneList(this.pageParams)
    },

    getUploadImage(val) {
      this.formData.iconPath = val
    },

    showAddDialog() {
      this.dialogFormVisible = true
      this.formData = {}
      this.$nextTick(() => {
        this.$refs.formData.clearValidate()
      })
    },

    handleClose() {
      this.dialogFormVisible = false
      this.formData = {}
      this.$nextTick(() => {
        this.$refs.formData.clearValidate()
      })
    }
  }
}
</script>

