<template>
  <div>
    <h1>文章列表</h1>
    <el-card>
      <el-row>
        <el-col :span="6">
          <el-input maxlength="50" clearable placeholder="請輸入文章名稱" v-model="articleQuery"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button style="margin-left: 20px" type="primary" icon="el-icon-search" @click="searchArticle"
            >搜索</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="articleList">
        <el-table-column type="index" lacel="序號"></el-table-column>
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
        <el-table-column label="日期">
          <template slot-scope="{ row, $index }">
            <span>{{ row.createdAt | date }}</span>
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
import dayjs from 'dayjs'
import { getArticleList, deleteArticle } from '@/api/article'
export default {
  filters: {
    date(val) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  data() {
    return {
      articleList: [],
      pageParams: {
        pageNum: 1,
        pagesize: 5
      },
      total: 0,
      articleQuery: '',
      createAt: ''
    }
  },

  methods: {
    async getArticleList() {
      const res = await getArticleList(this.pageParams)
      this.articleList = res.data.data
      this.total = res.data.total
    },
    remove(row) {
      this.$confirm(`是否確定要删除文章 "${row.name}"`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // const res = await this.$http.delete(`rest/articles/${row._id}`)
        const res = await deleteArticle(row._id)
        if (!res) return
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getArticleList((this.pageParams.pagenum = 1))
      })
    },
    handleSizeChange(pagesize) {
      this.pageParams.pagesize = pagesize
      this.getArticleList()
    },
    handleCurrentChange(pagenum) {
      this.pageParams.pagenum = pagenum
      this.getArticleList()
    },
    async searchArticle() {
      this.pageParams.query = this.articleQuery
      this.pageParams.pagenum = 1
      this.getArticleList(this.pageParams)
    }
  },
  created() {
    this.getArticleList()
  }
}
</script>

