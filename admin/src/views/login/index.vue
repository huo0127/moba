<template>
  <div class="login-container">
    <el-card header="登入" class="login-card">
      <el-form @keyup.native.enter="login" :model="loginForm" ref="loginForm" :rules="loginRules" status-icon>
        <el-form-item label="用户名" prop="username">
          <el-input ref="username" type="text" v-model="loginForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密碼" prop="password" status-icon>
          <el-input
            type="password"
            ref="password"
            v-model="loginForm.password"
            name="password"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="handleLogin">登入</el-button>
        </el-form-item>
        <div>
          請直接登入，無法登入？
          <router-link to="/register"> 註冊 </router-link>
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
      if (value.length < 5) {
        callback(new Error('用戶名長度不能小於5'))
      } else {
        callback()
      }
    }
    // 對登入的密碼進行驗證
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密碼長度不能小於6'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }
    }
  },

  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) {
          this.$message.error('請輸入正確格式的用戶名或密碼')
        }
        const res = await login(this.loginForm)
        localStorage.token = res.data.token
        this.$router.push('/')
        this.$message.success('登入成功')
      })
    }
  }
}
</script>

<style>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>
