<template>
  <div>
    <el-card>
      <el-button style="margin-bottom: 1rem" type="primary" icon="el-icon-plus" @click="showAddDialog"
        >創建分類</el-button
      >
      <tree-table
        :data="cateList"
        show-index
        index-text="序號"
        :columns="columns"
        :expand-type="false"
        :selection-type="false"
        border
      >
        <template slot="operate" slot-scope="scope">
          <HintButton type="warning" title="編輯" icon="el-icon-edit" @click="editCateClick(scope.row)"></HintButton>
          <HintButton type="danger" title="刪除" icon="el-icon-delete" @click="remove(scope.row)"></HintButton>
        </template>
      </tree-table>
    </el-card>

    <el-dialog :title="model._id ? '修改分類' : '創建品牌'" :visible.sync="dialogFormVisible">
      <el-form ref="model" :model="model">
        <el-form-item label="分類名稱" prop="name">
          <el-input v-model="model.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="選擇" v-if="model.parent || !model._id">
          <el-cascader
            :props="cateProps"
            :options="cateList"
            v-model="model.parent"
            clearable
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">確定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TreeTable from 'vue-table-with-tree-grid'
import { createCate, updateCate, deleteCate, getCateList } from '@/api/category'

export default {
  name: 'CategoryEdit',
  components: { TreeTable },
  data() {
    return {
      model: {
        name: ''
      },
      // 分類列表數據
      cateList: [],
      cateProps: {
        checkStrictly: true,
        expandTrigger: 'hover',
        value: '_id',
        label: 'name',
        children: 'children',
        emitPath: false
      },
      columns: [
        {
          label: '分類名稱',
          prop: 'name',
          align: 'center',
          headerAlign: 'center'
        },
        {
          label: '操作',
          type: 'template',
          template: 'operate',
          align: 'center',
          headerAlign: 'center'
        }
      ],
      id: '',
      dialogFormVisible: false
    }
  },
  methods: {
    // 獲取分類列表
    async getCateList() {
      const res = await getCateList()
      const data = res
      // 处理分類数据
      for (const item1 of data) {
        // 第一層
        if (item1.children && item1.children.length === 0) {
          item1.children = null
          continue
        }

        for (const item2 of item1.children) {
          // 第二層
          if (item2.children && item2.children.length === 0) {
            item2.children = null
            continue
          }

          for (const item3 of item2.children) {
            // 第三層
            item3.children = null
            item3.disabled = true
          }
        }
      }

      this.cateList = data
    },

    handleChange() {
      // console.log(this.model.parent);
    },

    // 創建分類
    showAddDialog() {
      this.dialogFormVisible = true
      this.model = {
        name: ''
      }
    },

    // 編輯分類
    async editCateClick(row) {
      this.dialogFormVisible = true
      this.model = { ...row }
      this.id = row._id
    },

    async save() {
      if (!this.model._id) {
        const res = await createCate(this.model)
        if (!res) return
        this.$message.success('創建分類成功')
        this.getCateList()
        this.dialogFormVisible = false
      } else {
        const res = await updateCate(this.id, this.model)
        if (!res) return
        this.$message.success('編輯分類成功')
        this.getCateList()
        this.dialogFormVisible = false
      }
    },

    // 删除分類
    async remove(row) {
      try {
        await this.$confirm(`是否確定要删除分類 ${row.name}`, '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        if (row.children && row.children.length > 0) return this.$message.error('無法删除包含子分類的父级分類')

        const res = await deleteCate(row._id)
        if (!res) return
        this.$message.success('删除分類成功')
        this.getCateList()
      } catch (error) {
        this.$message.info('已取消删除')
      }
    }
  },
  created() {
    this.getCateList()
  }
}
</script>

<style scoped>
</style>
