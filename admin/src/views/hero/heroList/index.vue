<template>
  <div>
    <h1 class="title">英雄列表</h1>
    <el-card shadow="never">
      <SearchBar @search="searchHero" :placeholder="placeholder"></SearchBar>
      <div class="tableItem">
        <el-table :data="heroList" border stripe>
          <el-table-column type="index" :index="indexMethod" label="序號"></el-table-column>
          <el-table-column prop="name" label="名稱"></el-table-column>
          <el-table-column prop="name" label="位置">
            <template slot-scope="scope">
              <span>
                {{ scope.row.categories.map((item) => item.name).join(' / ') }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="avatar" label="頭像">
            <template slot-scope="scope">
              <img :src="scope.row.avatar" class="tableAvatar" />
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <HintButton
                title="編輯"
                type="warning"
                icon="el-icon-edit"
                @click="$router.push(`/heroes/edit/${scope.row._id}`)"
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
      @pagination="getHeroList"
      :limit.sync="pageParams.pagesize"
      :page.sync="pageParams.pagenum"
      :total="total"
    ></Pagination>
  </div>
</template>

<script>
import { getHeroList, deleteHero } from '@/api/hero'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
export default {
  name: 'HeroList',
  data() {
    return {
      placeholder: '請輸入您想查詢的英雄',
      heroList: [],
      pageParams: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  components: { Pagination, SearchBar },
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
      })
        .then(async() => {
          try {
            const res = await deleteHero(row._id)
            if (!res) return
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getHeroList((this.pageParams.pagenum = 1))
          } catch (error) {
            this.$message.error('刪除失敗!')
          }
        })
        .catch(() => {
          this.$message.info('已取消刪除')
        })
    },
    async searchHero(val) {
      this.pageParams.query = val
      this.pageParams.pagenum = 1
      this.getHeroList(this.pageParams)
    },
    indexMethod(index) {
      // this.pageParams.pagenum當前頁    this.pageParams.pagesize一頁展示行數
      return index + 1 + (this.pageParams.pagenum - 1) * this.pageParams.pagesize
    }
  }
}
</script>
