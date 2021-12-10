<template>
  <div id="rune_edit_conatiner">
    <h1>{{ id ? '編輯' : '創建' }}天賦符文</h1>
    <el-form label-width="120px" @submit.native.prevent="save" :model="formData" ref="formData">
      <el-form-item label="主符文名稱">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="圖標">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="formData.icon" :src="formData.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-row :gutter="10">
        <el-col :span="6" v-for="rune in formData.first_rune" :key="rune.id">
          <el-card>
            <el-form-item label="圖標">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="(res) => $set(rune, 'icon', res.data.url)"
              >
                <img v-if="rune.icon" :src="rune.icon" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label="ID">
              <el-input v-model="rune.id"></el-input>
            </el-form-item>
            <el-form-item label="符文名稱">
              <el-input v-model="rune.name"></el-input>
            </el-form-item>
            <el-form-item label="簡述">
              <el-input type="textarea" v-model="rune.longDesc"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" v-model="rune.shortDesc"></el-input>
            </el-form-item>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8" v-for="rune in formData.second_rune" :key="rune.id">
          <el-card>
            <el-form-item label="圖標">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="(res) => $set(rune, 'icon', res.data.url)"
              >
                <img v-if="rune.icon" :src="rune.icon" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="ID">
              <el-input v-model="rune.id"></el-input>
            </el-form-item>
            <el-form-item label="符文名稱">
              <el-input v-model="rune.name"></el-input>
            </el-form-item>
            <el-form-item label="簡述">
              <el-input type="textarea" v-model="rune.longDesc"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" v-model="rune.shortDesc"></el-input>
            </el-form-item>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8" v-for="rune in formData.third_rune" :key="rune.id">
          <el-card>
            <el-form-item label="圖標">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="(res) => $set(rune, 'icon', res.data.url)"
              >
                <img v-if="rune.icon" :src="rune.icon" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="ID">
              <el-input v-model="rune.id"></el-input>
            </el-form-item>
            <el-form-item label="符文名稱">
              <el-input v-model="rune.name"></el-input>
            </el-form-item>
            <el-form-item label="簡述">
              <el-input type="textarea" v-model="rune.longDesc"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" v-model="rune.shortDesc"></el-input>
            </el-form-item>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="6" v-for="rune in formData.fourth_rune" :key="rune.id">
          <el-card>
            <el-form-item label="圖標">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="(res) => $set(rune, 'icon', res.data.url)"
              >
                <img v-if="rune.icon" :src="rune.icon" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="ID">
              <el-input v-model="rune.id"></el-input>
            </el-form-item>
            <el-form-item label="符文名稱">
              <el-input v-model="rune.name"></el-input>
            </el-form-item>
            <el-form-item label="簡述">
              <el-input type="textarea" v-model="rune.longDesc"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" v-model="rune.shortDesc"></el-input>
            </el-form-item>
          </el-card>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getRune, updateRune, createRune } from '@/api/rune'
import upload from '@/mixins/upload'
export default {
  name: 'RuneEdit',
  props: {
    id: {}
  },
  mixins: [upload],
  data() {
    return {
      formData: {}
    }
  },
  methods: {
    afterUpload(res) {
      this.$set(this.formData, 'icon', res.data.url)
      // this.formData.icon = res.url
    },
    async save() {
      let res
      if (this.id) {
        res = await updateRune(this.id, this.formData)
      } else {
        res = await createRune(this.formData)
      }
      this.$router.push('/goods/rune/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetchRune() {
      const res = await getRune(this.id)
      this.formData = res.data
    }
  },

  created() {
    this.id && this.fetchRune()
  }
}
</script>

<style lang="scss">
#rune_edit_conatiner {
  img {
    width: 32px;
    height: 32px;
  }
}
</style>
