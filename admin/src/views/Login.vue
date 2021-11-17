<template>
  <div class="login-container">
    <el-card header="用戶登入" class="login-card">
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
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { loginReq } from '@/api/admin/login'
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
        const res = await loginReq(this.loginForm)
        if (!res) return

        this.$message.success('登入成功')
        localStorage.token = res.data.token
        this.$router.push('/')
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