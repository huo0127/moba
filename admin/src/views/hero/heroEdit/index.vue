<template>
  <div class="about">
    <h1>{{ id ? '編輯' : '創建' }}英雄</h1>
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
              :on-success="(res) => $set(model, 'avatar', res.data.url)"
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
              :on-success="(res) => $set(model, 'banner', res.data.url)"
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
        </el-tab-pane>
        <!-- 英雄造型 -->
        <el-tab-pane label="英雄造型" name="skins">
          <HintButton title="創建造型" type="primary" icon="el-icon-plus" @click="model.skins.push({})"></HintButton>
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
                    :on-success="(res) => $set(skin, 'img', res.data.url)"
                  >
                    <img v-if="skin.img" :src="skin.img" class="banner" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <HintButton
                    title="刪除造型"
                    icon="el-icon-delete"
                    type="danger"
                    @click="model.skins.splice(i, 1)"
                  ></HintButton>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 技能管理 -->
        <el-tab-pane label="技能管理" name="skills">
          <!-- <el-button size="small" type="primary" @click="model.skills.push({})">
            <i class="el-icon-plus"></i> 創建技能
          </el-button> -->
          <HintButton title="創建技能" type="primary" icon="el-icon-plus" @click="model.skills.push({})"></HintButton>

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
                    :on-success="(res) => $set(item, 'icon', res.data.url)"
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
                    :on-success="(res) => $set(item, 'video', res.data.url)"
                  >
                    <video :src="item.video" v-if="item.video" controls class="video" />
                    <i v-else class="el-icon-upload avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <HintButton
                    title="删除技能"
                    icon="el-icon-delete"
                    type="danger"
                    @click="model.skills.splice(i, 1)"
                  ></HintButton>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 被誰克制 -->
        <el-tab-pane label="被誰克制" name="counters">
          <HintButton title="創建英雄" type="primary" icon="el-icon-plus" @click="model.counters.push({})"></HintButton>
          <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
            <el-col :span="12" v-for="(item, i) in model.counters" :key="i">
              <el-card>
                <el-form-item label="英雄">
                  <el-select filterable v-model="item.hero">
                    <el-option v-for="hero in heroes" :key="hero._id" :value="hero._id" :label="hero.name"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <HintButton
                    title="删除英雄"
                    icon="el-icon-delete"
                    type="danger"
                    @click="model.counters.splice(i, 1)"
                  ></HintButton>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 進階攻略 -->
        <el-tab-pane label="進階攻略">
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
          <el-form-item label="召喚師技能">
            <el-select v-model="model.spells" multiple filterable>
              <el-option v-for="item of spellList" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="天賦符文" name="runes">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-card>
                <span>主符文</span>
                <el-form-item label="主符文">
                  <el-select v-model="model.primary_rune.rune" @change="handle_get_runes">
                    <el-option
                      v-for="rune of primaryRuneList"
                      :key="rune._id"
                      :label="rune.name"
                      :value="rune._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="第一層符文">
                  <el-select v-model="model.primary_rune.rune_first">
                    <el-option
                      v-for="rune of relatedRuneList"
                      :key="rune._id"
                      :label="rune.name"
                      :value="rune._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="第二層符文">
                  <el-select v-model="model.primary_rune.rune_second">
                    <el-option
                      v-for="rune of relatedRuneList"
                      :key="rune._id"
                      :label="rune.name"
                      :value="rune._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="第三層符文">
                  <el-select v-model="model.primary_rune.rune_third">
                    <el-option
                      v-for="rune of relatedRuneList"
                      :key="rune._id"
                      :label="rune.name"
                      :value="rune._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="第四層符文">
                  <el-select v-model="model.primary_rune.rune_fourth">
                    <el-option
                      v-for="rune of relatedRuneList"
                      :key="rune._id"
                      :label="rune.name"
                      :value="rune._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card>
                <span>副符文</span>
                <el-form-item label="副符文">
                  <el-select v-model="model.secondary_rune.rune" @change="handle_get_runes">
                    <el-option
                      v-for="rune of primaryRuneList"
                      :key="rune._id"
                      :label="rune.name"
                      :value="rune._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="第一層符文">
                  <el-select v-model="model.secondary_rune.rune_first">
                    <el-option
                      v-for="rune of relatedRuneList"
                      :key="rune._id"
                      :label="rune.name"
                      :value="rune._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="第二層符文">
                  <el-select v-model="model.secondary_rune.rune_second">
                    <el-option
                      v-for="rune of relatedRuneList"
                      :key="rune._id"
                      :label="rune.name"
                      :value="rune._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card>
                <span>小符文</span>

                <el-form-item label="第一層符文">
                  <el-select v-model="model.little_rune.rune_first">
                    <el-option
                      v-for="rune of primaryRuneList"
                      :key="rune._id"
                      :label="rune.name"
                      :value="rune._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="第二層符文">
                  <el-select v-model="model.little_rune.rune_second">
                    <el-option
                      v-for="rune of primaryRuneList"
                      :key="rune._id"
                      :label="rune.name"
                      :value="rune._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="第三層符文">
                  <el-select v-model="model.little_rune.rune_third">
                    <el-option
                      v-for="rune of primaryRuneList"
                      :key="rune._id"
                      :label="rune.name"
                      :value="rune._id"
                    ></el-option>
                  </el-select>
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
import { updateHero, createHero, getHero, getHeroList } from '@/api/hero'
import { getItemList } from '@/api/item'
import { getCateList } from '@/api/category'
import { getSpellList } from '@/api/spell'
import { get_primary_rune, get_related_rune } from '@/api/rune'
import upload from '@/mixins/upload'

export default {
  name: 'HeroEdit',
  props: {
    id: {}
  },

  mixins: [upload],

  data() {
    return {
      heroCateList: null,
      itemList: [],
      heroes: [],
      spellList: [],
      primaryRuneList: [],
      relatedRuneList: [],
      // 英雄訊息
      model: {
        testVal: '',
        name: '',
        avatar: '',
        skills: [],
        counters: [],
        spells: [],
        skins: [],

        primary_rune: {
          rune: '',
          rune_first: '',
          rune_second: '',
          rune_third: '',
          rune_fourth: ''
        },

        secondary_rune: {
          rune: '',
          rune_first: '',
          rune_second: ''
        },

        little_rune: {
          rune_first: '',
          rune_second: '',
          rune_third: ''
        }
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
      this.$router.push('/heroes/list')
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
      this.itemList = res
    },
    async getHeroList() {
      const res = await getHeroList()
      this.heroes = res
    },
    async getSpellList() {
      const res = await getSpellList()
      this.spellList = res
    },
    async fetch_primary_rune() {
      const res = await get_primary_rune()
      this.primaryRuneList = res
    },
    async handle_get_runes(runeId) {
      if (runeId) {
        const res = await get_related_rune(runeId)
        this.relatedRuneList = res
      }
    }
  },

  created() {
    this.getItemList()
    this.getCateList()
    this.getHeroList()
    this.getSpellList()
    this.fetch_primary_rune()
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
