<template>
  <div>
    <h1 class="title">英雄列表</h1>
    <el-card shadow="never">
      <el-row>
        <el-col :span="6">
          <el-input maxlength="8" clearable placeholder="請輸入英雄名稱" v-model="heroQuery"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button style="margin-left: 20px" type="primary" icon="el-icon-search" @click="searchHero">搜索</el-button>
        </el-col>
      </el-row>
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
              <img :src="scope.row.avatar" class="hero-image" />
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
import indexMethod from '@/mixins/indexMethod'
export default {
  name: 'HeroList',
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
  components: { Pagination },
  mixins: [indexMethod],
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
        this.getHeroList((this.pageParams.pagenum = 1))
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
