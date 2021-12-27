<template>
  <div class="login-container">
    <el-card header="註冊" class="login-card">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" status-icon>
        <el-form-item label="用戶名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
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
        <div>
          已經註冊了 ？
          <router-link to="/login"> 前往登入頁 </router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { register } from '@/api/adminUser'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請輸入密碼'))
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('checkPassword')
        }
        callback()
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
          { min: 5, max: 10, message: '長度必須在 5 到 10 個字符' }
        ],
        password: [
          { min: 6, max: 20, message: '長度必須在 6 到 20 個英文字母與數字' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async valid => {
        try {
          await register(this.ruleForm)
          this.$message.success('註冊成功，前往登入頁面')
          this.$router.push('/login')
        } catch (err) {}
      })
    },
    resetForm() {
      this.$refs.registerForm.resetFields()
    }
  }
}
</script>
<style lang="scss">
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>
