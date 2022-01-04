<template>
  <div class="categoryContainer">
    <h1 class="title">分類列表</h1>
    <el-card shadow="never">
      <div style="padding-bottom: 0.8rem">
        <el-button style="margin-bottom: 1rem" type="primary" icon="el-icon-plus" @click="dialogFormVisible = true"
          >創建分類</el-button
        >
      </div>
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

    <el-dialog
      width="30%"
      :title="model._id ? '修改分類' : '創建分類'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form ref="model" :model="model" :rules="rules" :label-position="labelPosition">
        <div class="createCatsName">
          <el-form-item label="分類名稱" prop="name" label-width="150px">
            <el-input ref="name" v-model="model.name" autocomplete="off" />
          </el-form-item>
        </div>

        <el-form-item label="選擇分類" v-if="model.parent || !model._id" label-width="150px" prop="parent">
          <el-cascader :props="cateProps" :options="cateList" v-model="model.parent" clearable></el-cascader>
        </el-form-item>
      </el-form>

      <div class="categoryBtn">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="save">確定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TreeTable from 'vue-table-with-tree-grid'
import { createCate, updateCate, deleteCate, getCateList } from '@/api/category'

export default {
  name: 'CategoryList',
  components: { TreeTable },
  data() {
    return {
      model: {
        name: '',
        parent: ''
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
      dialogFormVisible: false,
      labelPosition: 'right',
      rules: {
        name: [{ required: true, message: '請輸入分類名稱', trigger: 'blur' }],
        parent: [{ required: true, message: '請選擇分類名稱', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 獲取分類列表
    async getCateList() {
      const res = await getCateList()
      const data = res.data.data
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

    // 編輯分類
    async editCateClick(row) {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.model = { ...row }
        this.id = row._id
      })
    },

    handleClose() {
      this.dialogFormVisible = false
      this.model = {}
      this.$nextTick(() => {
        this.$refs.model.clearValidate()
      })
    },

    save() {
      this.$refs.model.validate(async valid => {
        if (valid) {
          try {
            if (this.model._id) {
              await updateCate(this.id, this.model)
            } else {
              await createCate(this.model)
            }
            this.$message.success(this.model._id ? '編輯分類成功' : '創建分類成功')
            this.dialogFormVisible = false
            this.getCateList()
          } catch (error) {}
        } else {
          return false
        }
      })
    },

    // 删除分類
    remove(row) {
      this.$confirm(`是否確定要删除分類 ${row.name}`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          if (row.children && row.children.length > 0) return this.$message.error('無法删除包含子分類的父级分類')
          const res = await deleteCate(row._id)
          if (!res) return
          this.$message.success('删除分類成功')
          this.getCateList()
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

