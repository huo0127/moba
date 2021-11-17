<template>
  <div>
    <h1>英雄列表</h1>
    <el-card>
      <el-row>
        <el-col :span="6">
          <el-input maxlength="8" clearable placeholder="請輸入英雄名稱" v-model="heroQuery"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button style="margin-left: 20px" type="primary" icon="el-icon-search" @click="searchHero">搜索</el-button>
        </el-col>
      </el-row>
      <el-table :data="heroList" border stripe>
        <el-table-column type="index" width="240"></el-table-column>
        <el-table-column prop="name" label="名稱"></el-table-column>
        <el-table-column prop="name" label="位置">
          <template slot-scope="scope">
            <span>
              {{ scope.row.categories.map((item) => item.name).join(' / ') }}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="avatar" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" class="hero-image" />
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="$router.push(`/heroes/edit/${scope.row._id}`)">編輯</el-button>
            <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParams.pagenum"
        :page-sizes="[5, 8, 10, 15]"
        :page-size="pageParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getHeroList, deleteHero } from '@/api/admin/hero'
export default {
  data() {
    return {
      heroList: [],
      pageParams: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      heroQuery: ''
    }
  },
  created() {
    this.getHeroList()
  },
  methods: {
    async getHeroList() {
      const res = await getHeroList(this.pageParams)
      this.heroList = res.data.data
      this.total = res.data.total
    },

    remove(row) {
      this.$confirm(`是否確定要删除分類 "${row.name}"`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deleteHero(row._id)
        if (!res) return
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getHeroList()
      })
    },
    handleSizeChange(pagesize) {
      this.pageParams.pagesize = pagesize
      this.getHeroList()
    },
    handleCurrentChange(pagenum) {
      this.pageParams.pagenum = pagenum
      this.getHeroList()
    },
    async searchHero() {
      this.pageParams.query = this.heroQuery
      this.pageParams.pagenum = 1
      this.getHeroList(this.pageParams)
    }
  }
}
</script>
<style>
.hero-image {
  border: 1px solid #000;
  width: 48px;
  height: 48px;
}

.el-pagination {
  margin-top: 15px;
  text-align: center;
}
.el-table {
  margin-top: 15px;
}
.el-card {
  position: relative;
  margin-top: 15px;
  padding: 5px 15px;
}
.el-table tr td,
.el-table tr th {
  text-align: center !important;
  font-size: 13px !important;
}
</style>