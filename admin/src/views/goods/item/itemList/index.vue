<template>
  <div>
    <h1 class="title">裝備列表</h1>
    <el-card shadow="never">
      <el-row>
        <el-col :span="6">
          <el-input maxlength="8" clearable placeholder="請輸入裝備名稱" v-model="itemQuery"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button style="margin-left: 20px" type="primary" icon="el-icon-search" @click="searchItem">搜索</el-button>
        </el-col>
      </el-row>

      <div class="tableItem">
        <el-table :data="itemList" border stripe>
          <el-table-column type="index" label="序號" :index="indexMethod"></el-table-column>
          <el-table-column prop="name" label="裝備名稱" align="center"></el-table-column>
          <el-table-column prop="plaintext" label="簡述"> </el-table-column>
          <el-table-column prop="icon" label="圖標">
            <template slot-scope="scope">
              <img :src="scope.row.iconPath" style="height: 3rem" />
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
import indexMethod from '@/mixins/indexMethod'
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
  components: { Pagination },
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
      }).then(async() => {
        const res = await deleteItem(row._id)
        if (!res) return
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 刪除回第一頁
        this.getItemList((this.pageParams.pagenum = 1))
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
    async searchItem() {
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

