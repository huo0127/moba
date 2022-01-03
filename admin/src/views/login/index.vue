<template>
  <div class="login-container">
    <el-card header="登入" class="login-card">
      <el-form
        :model="loginForm"
        ref="loginForm"
        :rules="loginRules"
        status-icon
        @keyup.enter.native="handleLogin"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input ref="username" type="text" v-model="loginForm.username" v-focus></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input type="password" ref="password" v-model="loginForm.password" name="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="handleLogin">登入</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
        <div class="goLoginContainer">
          請直接登入，無法登入？
          <router-link to="/register" class="goLogin"> 註冊 </router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { login } from '@/api/adminUser'
export default {
  name: 'Login',
  data() {
    // 對登入的用戶名進行驗證
    const validateUsername = (rule, value, callback) => {
      const regUsername = /^[-_a-zA-Z0-9]{5,16}$/
      if (regUsername.test(value)) return callback()
      callback(new Error('請輸入合法的用户名'))
    }
    // 對登入的密碼進行驗證
    const validatePassword = (rule, value, callback) => {
      const regPassword = /^[a-zA-Z0-9]{6,20}/
      if (regPassword.test(value)) return callback()
      callback(new Error('密碼只能是6到20位字母、數字'))
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          {
            required: true,
            message: '請輸入用户名',
            trigger: 'blur'
          },
          { trigger: 'blur', validator: validateUsername }
        ],
        password: [
          {
            required: true,
            message: '請輸入密碼',
            trigger: 'blur'
          },
          { trigger: 'blur', validator: validatePassword }
        ]
      }
    }
  },

  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            const res = await login(this.loginForm)
            localStorage.token = res.data.token
            this.$router.push('/')
            this.$message.success('登入成功')
          } catch (error) {
            this.$message.error('請輸入正確的用戶名或者密碼格式')
          }
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

