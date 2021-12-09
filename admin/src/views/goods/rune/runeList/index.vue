<template>
  <div>
    <h1>天賦符文列表</h1>
    <el-card>
      <el-table :data="runeList" border stripe>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="天賦名稱" width="width" />
        <el-table-column prop="icon" label="圖標">
          <template slot-scope="scope">
            <img :src="scope.row.icon" style="height: 3rem" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="width">
          <template slot-scope="{ scope, row }">
            <HintButton
              title="編輯"
              type="warning"
              icon="el-icon-edit"
              @click="$router.push(`/goods/rune/edit/${row._id}`)"
            ></HintButton>
            <HintButton title="刪除" type="danger" icon="el-icon-delete" @click="remove(scope.row)"></HintButton>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import upload from '@/mixins/upload'
import { getRuneList } from '@/api/rune'
export default {
  name: 'RuneList',
  data() {
    return {
      runeList: [],
      dialogFormVisible: false,
      formData: {}
    }
  },
  mixins: [upload],
  mounted() {
    this.fetchRuneList()
  },
  methods: {
    async fetchRuneList() {
      const res = await getRuneList()
      this.runeList = res
    },

    async remove(row) {
      this.$confirm(`確定刪除${row.name}嗎？`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          try {
            await deleteSpell(row._id)
            // 1、刪除成功後提示
            this.$message.success('刪除成功!')
            this.getSpellList()
          } catch (error) {
            this.$message.error('刪除失敗')
          }
        })
        .catch(() => {
          // catch處理的就是點擊取消的邏輯
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
