<template>
  <div class="about">
    <h1>{{ id ? '編輯' : '新建' }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="basic" type="border-card">
        <!-- 基本訊息 -->
        <el-tab-pane label="基本訊息" name="basic">
          <el-form-item label="名稱">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="頭像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(res) => $set(model, 'avatar', res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="背景圖片">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(res) => $set(model, 'banner', res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="banner" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="類型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item of heroCateList" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起手">
            <el-select v-model="model.startItems" multiple filterable>
              <el-option v-for="item of itemList" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推薦">
            <el-select v-model="model.items" multiple filterable>
              <el-option v-for="item of itemList" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="鞋子">
            <el-select v-model="model.shoes" multiple filterable>
              <el-option v-for="item of itemList" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <!-- 技能管理 -->
        <el-tab-pane label="技能管理" name="skills">
          <el-button size="small" type="primary" @click="model.skills.push({})">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>
          <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
            <el-col :span="12" v-for="(item, i) in model.skills" :key="i">
              <el-card>
                <el-form-item label="名稱">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="圖標">
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="(res) => $set(item, 'icon', res.url)"
                  >
                    <img v-if="item.icon" :src="item.icon" class="skill" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="冷卻時間(秒)">
                  <el-input v-model="item.delay"></el-input>
                </el-form-item>
                <el-form-item label="消耗">
                  <el-input v-model="item.cost"></el-input>
                </el-form-item>
                <el-form-item label="範圍">
                  <el-input v-model="item.range"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input v-model="item.description" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="影片">
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="(res) => $set(item, 'video', res.url)"
                  >
                    <video :src="item.video" v-if="item.video" controls class="video" />
                    <i v-else class="el-icon-upload avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="danger" @click="model.skills.splice(i, 1)">删除</el-button>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 被誰克制 -->
        <el-tab-pane label="被誰克制" name="counters">
          <el-button size="small" type="primary" @click="model.counters.push({})">
            <i class="el-icon-plus"></i> 添加英雄
          </el-button>
          <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
            <el-col :span="12" v-for="(item, i) in model.counters" :key="i">
              <el-card>
                <el-form-item label="英雄">
                  <el-select filterable v-model="item.hero">
                    <el-option v-for="hero in heroes" :key="hero._id" :value="hero._id" :label="hero.name"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="danger" @click="model.counters.splice(i, 1)">删除</el-button>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 英雄造型 -->
        <el-tab-pane label="英雄造型" name="skins">
          <el-button size="small" type="primary" @click="model.skins.push({})">
            <i class="el-icon-plus"></i> 添加造型
          </el-button>
          <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
            <el-col :span="12" v-for="(skin, i) in model.skins" :key="i">
              <el-card>
                <el-form-item label="名稱">
                  <el-input v-model="skin.name"></el-input>
                </el-form-item>
                <el-form-item label="造型圖片">
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="(res) => $set(skin, 'img', res.url)"
                    :on-error="uploadErrHandler"
                  >
                    <img v-if="skin.img" :src="skin.img" class="banner" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="danger" @click="model.skins.splice(i, 1)">删除</el-button>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateHero, createHero, getHero, getHeroList } from '@/api/admin/hero'
import { getItemList } from '@/api/admin/item'
import { getCateList } from '@/api/admin/category'

export default {
  props: {
    id: {}
  },
  data() {
    return {
      heroCateList: null,
      itemList: [],
      heroes: [],
      // 英雄訊息
      model: {
        name: '',
        avatar: '',
        skills: [],
        counters: []
      }
    }
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await updateHero(this.id, this.model)
      } else {
        res = await createHero(this.model)
      }
      // this.$router.push("/heroes/list");
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async getHero() {
      const res = await getHero(this.id)
      this.model = Object.assign({}, this.model, res.data)
    },
    async getCateList() {
      const res = await getCateList()
      for (const cate of res.data) {
        if (cate.name === '英雄分類') {
          this.heroCateList = cate.children
          break
        }
      }
    },
    async getItemList() {
      const res = await getItemList()
      this.itemList = res.data
    },
    async getHeroList() {
      const res = await getHeroList()
      this.heroes = res.data
    }
  },
  created() {
    this.getItemList()
    this.getCateList()
    this.getHeroList()
    this.id && this.getHero()
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  margin-top: 10px;
}
.banner {
  width: 300px;
  margin-top: 10px;
}
.skill {
  width: 80px;
  margin-top: 10px;
}
.video {
  width: 500px;
  margin-top: 10px;
}
</style>
