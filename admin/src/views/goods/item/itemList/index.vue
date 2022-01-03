<template>
  <div>
    <h1 class="title">裝備列表</h1>
    <el-card shadow="never">
      <SearchBar @search="searchItem"></SearchBar>

      <div class="tableItem">
        <el-table :data="itemList" border stripe>
          <el-table-column type="index" label="序號" :index="indexMethod"></el-table-column>
          <el-table-column prop="name" label="裝備名稱" align="center"></el-table-column>
          <el-table-column prop="plaintext" label="簡述"> </el-table-column>
          <el-table-column prop="icon" label="圖標">
            <template slot-scope="scope">
              <img :src="scope.row.iconPath" class="tableAvatar" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template slot-scope="scope">
              <HintButton
                title="編輯"
                type="warning"
                icon="el-icon-edit"
                @click="$router.push(`/goods/item/edit/${scope.row._id}`)"
              ></HintButton>
              <HintButton title="删除" type="danger" icon="el-icon-delete" @click="remove(scope.row)"></HintButton>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 分頁器 -->
    <Pagination
      v-if="total > 0"
      @pagination="getItemList"
      :limit.sync="pageParams.pagesize"
      :page.sync="pageParams.pagenum"
      :total="total"
    ></Pagination>
  </div>
</template>

<script>
import { getItemList, deleteItem } from '@/api/item'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import indexMethod from '@/mixins/indexMethod'
export default {
  data() {
    return {
      itemList: [],
      pageParams: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  components: { Pagination, SearchBar },
  mixins: [indexMethod],
  methods: {
    async getItemList() {
      const res = await getItemList(this.pageParams)
      this.itemList = res.data.data
      this.total = res.data.total
    },
    async remove(row) {
      this.$confirm(`是否確定要删除分類 "${row.name}"`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await deleteItem(row._id)
          if (!res) return
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 刪除回第一頁
          this.getItemList((this.pageParams.pagenum = 1))
        })
        .catch(() => {
          this.$message.info('已取消刪除')
        })
    },
    async searchItem(val) {
      this.pageParams.query = val
      this.pageParams.pagenum = 1
      this.getItemList(this.pageParams)
    }
  },
  created() {
    this.getItemList()
  }
}
</script>
