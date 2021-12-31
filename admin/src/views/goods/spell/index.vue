<template>
  <div>
    <h1 class="title">召喚師技能列表</h1>
    <el-card shadow="never">
      <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">創建召喚師技能</el-button>
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

    <el-dialog :title="formData._id ? '編輯召喚師技能' : '創建召喚師技能'" :visible.sync="dialogFormVisible">
      <el-form ref="formData" :model="formData" :label-position="labelPosition">
        <el-form-item label="召喚師技能">
          <el-input v-model="formData.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formData.description" autocomplete="off" type="textarea" />
        </el-form-item>
        <el-form-item label="圖標">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="(res) => $set(formData, 'icon', res.data.data.url)"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formData.icon" :src="formData.icon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { getSpellList, createSpell, deleteSpell, updateSpell } from '@/api/spell'
import upload from '@/mixins/upload'
export default {
  name: 'SpellList',
  data() {
    return {
      labelPosition: 'top',
      spellList: [],
      dialogFormVisible: false,
      formData: {}
    }
  },
  mixins: [upload],
  created() {
    this.getSpellList()
  },
  methods: {
    async getSpellList() {
      const res = await getSpellList()
      this.spellList = res.data.data
    },

    showAddDialog() {
      this.dialogFormVisible = true
      this.formData = {}
    },

    showUpdateDialog(row) {
      this.dialogFormVisible = true
      this.formData = {
        ...row
      }
      this.id = row._id
    },
    async save() {
      if (!this.formData._id) {
        const res = await createSpell(this.formData)
        if (!res) return
        this.$message.success('創建召喚師技能成功')
        this.getSpellList()
        this.dialogFormVisible = false
      } else {
        const res = await updateSpell(this.id, this.formData)
        if (!res) return
        this.$message.success('編輯召喚師技能成功')
        this.getSpellList()
        this.dialogFormVisible = false
      }
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

