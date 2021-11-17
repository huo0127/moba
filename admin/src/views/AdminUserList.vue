<template>
  <div>
    <h1>管理員列表</h1>
    <el-card>
      <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">新增用戶</el-button>
      <el-table :data="userList">
        <el-table-column type="index" label="序號" />
        <el-table-column prop="username" label="用戶名" width="width" />
        <el-table-column label="操作" width="width">
          <template slot-scope="{ row, $index }">
            <el-button type="warning" icon="el-icon-edit" @click="showUpdateDialog(row)">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="remove(row)">刪除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="formData._id ? '修改品牌' : '新增品牌'" :visible.sync="dialogFormVisible">
      <el-form ref="formData" :model="formData" :rules="rules">
        <el-form-item label="用戶名" prop="username">
          <el-input v-model="formData.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input v-model="formData.password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">確定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, createUser, deleteUser, updateUser } from '@/api/admin/adminUser'
export default {
  name: 'AdminUserList',
  data() {
    return {
      userList: [],
      total: 0,
      dialogFormVisible: false, // 這個數據決定了dialog是否顯示
      // imageUrl: '', // upload組件內部的數據，有可能不用
      formData: {
        // tmForm就是我們收集成功的那個品牌對象
        // 用來收集數據
        username: '', // 收集品牌名稱
        password: '' // 收集品牌logo圖片路徑
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const res = await getUserList()
      this.userList = res.data
    },

    // 點擊添加按鈕彈出添加品牌的dialog對話框
    showAddDialog() {
      this.dialogFormVisible = true
      // 把tmForm內的數據清空，如果不清空，添加數據點取消，再點添加，數據還存在。
      this.formData = {
        username: '', // 收集品牌名稱
        password: '' // 收集品牌logo圖片路徑
      }
    },
    // 點擊修改彈出修改品牌的dialog
    showUpdateDialog(row) {
      this.dialogFormVisible = true
      this.formData = {
        ...row
      }
      this.id = row._id
    },
    async save() {
      if (!this.formData._id) {
        const res = await createUser(this.formData)
        if (!res) return
        this.$message.success('新建用戶成功')
        this.getUserList()
        this.dialogFormVisible = false
      } else {
        const res = await updateUser(this.id, this.formData)
        if (!res) return
        this.$message.success('編輯用戶成功')
        this.getUserList()
        this.dialogFormVisible = false
      }
    },
    // 點擊刪除按鈕，刪除對應品牌
    deleteUser(row) {
      this.$confirm(`確定刪除${row.username}嗎？`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          try {
            await deleteUser(row._id)
            // 1、刪除成功後提示
            this.$message.success('刪除成功!')
            this.getUserList()
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
    }
  }
}
</script>
