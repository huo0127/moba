<template>
  <div class="userConatiner">
    <h1 class="title">管理員列表</h1>
    <el-card shadow="never">
      <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增用戶</el-button>
      <div class="tableItem">
        <el-table :data="userList" border stripe>
          <el-table-column type="index" label="序號" />
          <el-table-column prop="username" label="用戶名" width="width" />
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <HintButton title="編輯" type="warning" icon="el-icon-edit" @click="showUpdateDialog(row)"></HintButton>
              <HintButton title="刪除" type="danger" icon="el-icon-delete" @click="deleteUser(row)"></HintButton>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog
      width="30%"
      :title="formData._id ? '編輯用戶' : '新增用戶'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form ref="formData" :model="formData" :rules="rules">
        <div style="margin-top: 1rem">
          <el-form-item label="用戶名" prop="username" label-width="150px">
            <el-input ref="username" v-model="formData.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密碼" prop="password" label-width="150px">
            <el-input v-model="formData.password" autocomplete="off" type="password" />
          </el-form-item>

          <el-form-item label="確認密碼" prop="checkPassword" label-width="150px">
            <el-input type="password" v-model="formData.checkPassword" autocomplete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="save">確定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, createUser, deleteUser, updateUser } from '@/api/adminUser'
export default {
  name: 'AdminUserList',
  data() {
    const validateUsername = (rule, value, callback) => {
      const regUsername = /^[-_a-zA-Z0-9]{5,16}$/
      if (regUsername.test(value)) return callback()
      callback(new Error('請輸入合法的用户名'))
    }
    const validatePass = (rule, value, callback) => {
      if (this.formData.password !== '') {
        const regPassword = /^[a-zA-Z0-9]{6,20}/
        if (regPassword.test(value)) return callback()
        callback(new Error('密碼只能是6到20位字母、數字'))
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請再次輸入密碼'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('兩次輸入密碼不一致!!!'))
      } else {
        callback()
      }
    }
    return {
      userList: [],
      dialogFormVisible: false,
      formData: {
        username: '',
        password: '',
        checkPassword: ''
      },
      rules: {
        username: [
          { required: true, message: '請輸入用戶名', trigger: 'blur' },
          { trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '請輸入確認密碼', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const res = await getUserList()
      this.userList = res.data.data
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

    handleClose() {
      this.dialogFormVisible = false
      this.formData = {}
      this.$nextTick(() => {
        this.$refs.formData.clearValidate()
      })
    },

    save() {
      this.$refs.formData.validate(async valid => {
        if (valid) {
          try {
            if (this.formData._id) {
              await updateUser(this.id, this.formData)
            } else {
              await createUser(this.formData)
            }
            this.$message.success(this.formData._id ? '編輯使用者成功' : '創建使用者成功')
            this.dialogFormVisible = false
            this.getUserList()
          } catch (error) {
            this.$message.error(this.formData._id ? '編輯使用者成功' : '創建使用者失敗')
          }
        } else {
          return false
        }
      })
    },

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
