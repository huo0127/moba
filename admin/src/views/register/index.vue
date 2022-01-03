<template>
  <div class="login-container">
    <el-card header="註冊" class="login-card">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" status-icon>
        <el-form-item label="用戶名" prop="username">
          <el-input v-model="ruleForm.username" ref="username" v-focus></el-input>
        </el-form-item>

        <el-form-item label="密碼" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" status-icon></el-input>
        </el-form-item>

        <el-form-item label="確認密碼" prop="checkPassword">
          <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off" status-icon></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <div class="goLoginContainer">
          已經註冊了嗎 ？
          <router-link to="/login" class="goLogin"> 前往登入頁 </router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { register } from '@/api/adminUser'
export default {
  data() {
    // 對登入的用戶名進行驗證
    const validateUsername = (rule, value, callback) => {
      const regUsername = /^[-_a-zA-Z0-9]{5,16}$/
      if (regUsername.test(value)) return callback()
      callback(new Error('請輸入合法的用户名'))
    }
    const validatePass = (rule, value, callback) => {
      if (this.ruleForm.password !== '') {
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
      ruleForm: {
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

  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          try {
            await register(this.ruleForm)
            this.$message.success('註冊成功，前往登入頁面')
            this.$router.push('/login')
          } catch (error) {
            this.$message.error('註冊失敗')
          }
        } else {
          return false
        }
      })
    },

    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>
