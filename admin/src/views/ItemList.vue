<template>
  <div>
    <h1>物品列表</h1>
    <el-card>
      <el-row>
        <el-col :span="6">
          <el-input maxlength="8" clearable placeholder="請輸入裝備名稱" v-model="itemQuery"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button style="margin-left: 20px" type="primary" icon="el-icon-search" @click="searchHero">搜索</el-button>
        </el-col>
      </el-row>

      <el-table :data="itemList" border stripe>
        <el-table-column type="index" label="序號" width="60" align="center"></el-table-column>
        <el-table-column prop="name" label="物品名稱" align="center"></el-table-column>
        <el-table-column prop="plaintext" label="簡述"> </el-table-column>
        <el-table-column prop="icon" label="圖標" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.iconPath" style="height: 3rem" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">編輯</el-button>
            <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分頁器 -->
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
import { getItemList, deleteItem } from '@/api/admin/item'
export default {
  data() {
    return {
      itemList: [],
      pageParams: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      itemQuery: ''
    }
  },
  methods: {
    async getItemList() {
      const res = await getItemList(this.pageParams)
      this.itemList = res.data.data
      this.total = res.data.total
    },
    remove(row) {
      this.$confirm(`是否確定要删除分類 "${row.name}"`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deleteItem(row._id)
        if (!res) return
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getItemList()
      })
    },
    handleSizeChange(pagesize) {
      this.pageParams.pagesize = pagesize
      this.getItemList()
    },
    handleCurrentChange(pagenum) {
      this.pageParams.pagenum = pagenum
      this.getItemList()
    },
    async searchHero() {
      this.pageParams.query = this.itemQuery
      this.pageParams.pagenum = 1
      this.getItemList(this.pageParams)
    }
  },
  created() {
    this.getItemList()
  }
}
</script>

