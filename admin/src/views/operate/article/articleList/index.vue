<template>
  <div>
    <h1 class="title">文章列表</h1>
    <el-card shadow="never">
      <SearchBar @search="searchArticle"></SearchBar>

      <div class="tableItem">
        <el-table :data="articleList" @sort-change="sortChange" border stripe>
          <el-table-column type="index" label="序號" :index="indexMethod"> </el-table-column>
          <el-table-column prop="name" label="分類">
            <template slot-scope="scope">
              <span>
                {{ scope.row.categories.map((item) => item.name).join(' / ') }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="標題"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <HintButton
                title="編輯"
                type="warning"
                icon="el-icon-edit"
                @click="$router.push(`/operate/article/edit/${scope.row._id}`)"
              ></HintButton>
              <HintButton title="删除" type="danger" icon="el-icon-delete" @click="remove(scope.row)"></HintButton>
            </template>
          </el-table-column>
          <el-table-column label="日期" prop="createdAt" sortable="custom">
            <template slot-scope="{ row, $index }">
              <span>{{ row.createdAt | date }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 分頁器 -->
    <Pagination
      v-if="total > 0"
      @pagination="getArticleList"
      :limit.sync="pageParams.pagesize"
      :page.sync="pageParams.pagenum"
      :total="total"
    ></Pagination>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getArticleList, deleteArticle } from '@/api/article'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'

export default {
  name: 'ArticleList',
  filters: {
    date(val) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  components: { Pagination, SearchBar },

  data() {
    return {
      articleList: [],
      queryTotal: 0,

      // 分頁、升序或降序
      pageParams: {
        pagenum: 1,
        pagesize: 5,
        prop: '',
        order: ''
      },
      total: 0,
      createdAt: ''
    }
  },

  created() {
    this.getArticleList()
  },

  methods: {
    indexMethod(index) {
      // this.pageParams.pagenum當前頁    this.pageParams.pagesize一頁展示行數
      return index + 1 + (this.pageParams.pagenum - 1) * this.pageParams.pagesize
    },
    // 觸發升序或降序
    sortChange(column, prop, order) {
      if (column.prop == null || column.order == null) {
        this.pageParams.prop = ''
        this.pageParams.order = ''
      } else {
        this.pageParams.prop = column.prop
        this.pageParams.order = column.order
      }
      this.getArticleList()
    },

    async getArticleList() {
      const res = await getArticleList(this.pageParams)
      this.total = res.data.total
      this.articleList = res.data.data
    },

    remove(row) {
      this.$confirm(`是否確定要删除文章 "${row.name}"`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await deleteArticle(row._id)
          if (!res) return
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getArticleList((this.pageParams.pagenum = 1))
        })
        .catch(() => {
          // catch處理的就是點擊取消的邏輯
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    async searchArticle(val) {
      this.pageParams.query = val
      this.pageParams.pagenum = 1
      this.getArticleList(this.pageParams)
    }
  }
}
</script>

