<template>
  <div>
    <h1 class="title">召喚師技能列表</h1>
    <el-card shadow="never">
      <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">創建召喚師技能</el-button>
      <div class="tableItem">
        <el-table :data="spellList" border stripe>
          <el-table-column type="index" label="序號" />
          <el-table-column prop="name" label="召喚師技能名" width="width" />
          <el-table-column prop="icon" label="圖標">
            <template slot-scope="scope">
              <img :src="scope.row.icon" class="tableAvatar" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <HintButton title="編輯" type="warning" icon="el-icon-edit" @click="showUpdateDialog(row)"></HintButton>
              <HintButton title="刪除" type="danger" icon="el-icon-delete" @click="deleteUser(row)"></HintButton>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog
      :title="formData._id ? '編輯召喚師技能' : '創建召喚師技能'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form ref="formData" :model="formData" :label-position="labelPosition" :rules="rules">
        <el-form-item label="召喚師技能" prop="name">
          <el-input ref="name" v-model="formData.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input ref="description" v-model="formData.description" autocomplete="off" type="textarea" />
        </el-form-item>

        <el-form-item label="圖標" prop="icon">
          <UploadImage v-model="formData.icon" @getUploadImage="getUploadImage"></UploadImage>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="save">確 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSpellList, createSpell, deleteSpell, updateSpell } from '@/api/spell'
import UploadImage from '@/components/UploadImage'
export default {
  name: 'SpellList',
  data() {
    return {
      labelPosition: 'top',
      spellList: [],
      dialogFormVisible: false,
      formData: {
        name: '',
        description: '',
        icon: ''
      },
      rules: {
        name: [{ required: true, message: '請輸入招喚師技能名稱', trigger: 'blur' }]
      }
    }
  },
  components: { UploadImage },
  created() {
    this.getSpellList()
  },
  methods: {
    async getSpellList() {
      const res = await getSpellList()
      this.spellList = res.data.data
    },

    showUpdateDialog(row) {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.formData = {
          ...row
        }
        this.id = row._id
      })
    },

    getUploadImage(val) {
      this.formData.icon = val
    },

    handleClose() {
      this.dialogFormVisible = false
      this.formData = {}
      this.$nextTick(() => {
        this.$refs.formData.clearValidate()
      })
    },

    save() {
      this.$refs.formData.validate(async valid => {
        if (valid) {
          try {
            if (this.formData._id) {
              await updateSpell(this.id, this.formData)
            } else {
              await createSpell(this.formData)
            }
            this.$message.success(this.formData._id ? '編輯招喚師技能成功' : '創建招喚師技能成功')
            this.dialogFormVisible = false
            this.getSpellList()
          } catch (error) {
            this.$message.error(this.formData._id ? '編輯招喚師技能失敗' : '創建招喚師技能失敗')
          }
        } else {
          return false
        }
      })
    },

    deleteUser(row) {
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

