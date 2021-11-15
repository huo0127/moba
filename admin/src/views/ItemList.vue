<template>
  <div>
    <el-card>
      <h1 style="margin-bottom: 2rem">物品列表</h1>
      <el-table :data="items" border stripe v-infinite-scroll>
        <el-table-column type="index" label="序號" width="60" align="center"></el-table-column>
        <el-table-column prop="name" label="物品名稱" align="center"></el-table-column>
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
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/items')
      this.items = res.data
    },
    load() {
      this.count += 2
    },

    remove(row) {
      this.$confirm(`是否確定要删除分類 "${row.name}"`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await this.$http.delete(`rest/items/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetch()
      })
    }
  },
  created() {
    this.fetch()
  }
}
</script>

