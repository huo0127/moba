<template>
  <el-container style="height: 100vh">
    <el-header style="text-align: right; font-size: 12px">
      <div class="logo-title">
        <h2>英雄聯盟後台管理系統</h2>
        <el-button @click="logout">登出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-openeds="['1']" unique-opened :default-active="$route.path">
          <el-submenu index="1">
            <template slot="title"> <i class="el-icon-message"></i>内容管理</template>
            <el-menu-item-group>
              <template slot="title">物品</template>
              <el-menu-item index="/items/create">新建物品</el-menu-item>
              <el-menu-item index="/items/list">物品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">英雄</template>
              <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
              <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">文章</template>
              <el-menu-item index="/articles/create">新建文章</el-menu-item>
              <el-menu-item index="/articles/list">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"> <i class="el-icon-message"></i>運營管理 </template>
            <el-menu-item-group>
              <template slot="title">廣告位</template>
              <el-menu-item index="/ads/list">廣告位列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"> <i class="el-icon-message"></i>系统設置 </template>
            <el-menu-item-group>
              <template slot="title">分類</template>
              <el-menu-item index="/categories/list">分類列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">管理員</template>

              <el-menu-item index="/admin_users/list">管理員列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { logoutReq } from '@/api/admin/login'
export default {
  methods: {
    logout() {
      this.$confirm('是否確定登出?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        localStorage.token = ''
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(#e0e3f1, #252a40);
  color: #eee;
}
.el-aside {
  color: #333;
}
.logo-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>