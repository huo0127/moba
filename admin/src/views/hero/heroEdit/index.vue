<template>
  <div class="about">
    <h1 class="title">{{ id ? '編輯' : '創建' }}英雄</h1>
    <div class="heroEditConatiner">
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-tabs value="basic" type="border-card">
          <!-- 基本訊息 -->
          <el-tab-pane label="基本訊息" name="basic">
            <el-form-item label="名稱" style="margin-top: 1rem">
              <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="路線">
              <el-select v-model="model.categories" multiple>
                <el-option
                  v-for="item of heroCateList"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="頭像">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="(res) => $set(model, 'avatar', res.data.data.url)"
                :before-upload="beforeAvatarUpload"
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
                :on-success="(res) => $set(model, 'banner', res.data.data.url)"
                :before-upload="beforeAvatarUpload"
              >
                <div class="bannerContainer">
                  <img v-if="model.banner" :src="model.banner" class="banner" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>
            </el-form-item>
          </el-tab-pane>

          <!-- 英雄造型 -->
          <el-tab-pane label="英雄造型" name="skins">
            <HintButton title="創建造型" type="primary" icon="el-icon-plus" @click="model.skins.push({})"></HintButton>
            <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
              <el-col :span="8" v-for="(skin, i) in model.skins" :key="i">
                <el-card shadow="never">
                  <el-form-item label="名稱" label-width="130px">
                    <el-input v-model="skin.name"></el-input>
                  </el-form-item>
                  <el-form-item label="造型圖片" label-width="130px">
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadUrl"
                      :headers="getAuthHeaders()"
                      :show-file-list="false"
                      :on-success="(res) => $set(skin, 'img', res.data.data.url)"
                      :before-upload="beforeAvatarUpload"
                    >
                      <div class="bannerContainer">
                        <img v-if="skin.img" :src="skin.img" class="banner" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </div>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label-width="130px">
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
            <HintButton title="創建技能" type="primary" icon="el-icon-plus" @click="model.skills.push({})"></HintButton>
            <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
              <el-col :span="12" v-for="(item, i) in model.skills" :key="i">
                <el-card shadow="never">
                  <el-form-item label="按鍵名稱">
                    <el-input v-model="item.keyName"></el-input>
                  </el-form-item>
                  <el-form-item label="名稱">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item label="加點順序">
                    <el-input v-model="item.skillOrder"></el-input>
                  </el-form-item>
                  <el-form-item label="圖標">
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadUrl"
                      :headers="getAuthHeaders()"
                      :show-file-list="false"
                      :on-success="(res) => $set(item, 'icon', res.data.data.url)"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="item.icon" :src="item.icon" class="avatar" />
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
                      :on-success="(res) => $set(item, 'video', res.data.data.url)"
                      :before-upload="beforeVideoUpload"
                    >
                      <div class="videoContainer">
                        <video :src="item.video" v-if="item.video" controls class="video" />
                        <i v-else class="el-icon-upload avatar-uploader-icon"></i>
                      </div>
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

          <!-- 進階攻略 -->
          <el-tab-pane label="進階攻略">
            <div style="margin-top: 1rem">
              <el-form-item label="起手">
                <el-select v-model="model.startItems" multiple filterable>
                  <el-option v-for="item of itemList" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
              </el-form-item>
            </div>
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
          <!-- 被誰克制 -->
          <el-tab-pane label="進階攻略 - 被誰克制" name="counters">
            <HintButton
              title="創建英雄"
              type="primary"
              icon="el-icon-plus"
              @click="model.counters.push({})"
            ></HintButton>
            <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
              <el-col :span="6" v-for="(item, i) in model.counters" :key="i">
                <el-card shadow="never">
                  <el-form-item label="英雄" label-width="50px">
                    <el-select filterable v-model="item.hero">
                      <el-option
                        v-for="hero in heroes"
                        :key="hero._id"
                        :value="hero._id"
                        :label="hero.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label-width="60px">
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
          <el-tab-pane label="進階攻略 - 天賦符文" name="runes">
            <el-row :gutter="20">
              <el-col :span="8">
                <!-- 主符文 -->
                <el-card shadow="never">
                  <span>主符文</span>
                  <el-form-item label="主符文" label-width="128px">
                    <el-select v-model="model.primary_rune.rune" @change="handle_get_first_runes">
                      <el-option
                        v-for="rune of primaryRuneList"
                        :key="rune._id"
                        :label="rune.name"
                        :value="rune._id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="第一層符文" label-width="128px">
                    <el-select v-model="model.primary_rune.rune_first">
                      <el-option
                        v-for="rune of rune_first"
                        :key="rune._id"
                        :label="rune.name"
                        :value="rune._id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="第二層符文" label-width="128px">
                    <el-select v-model="model.primary_rune.rune_second">
                      <el-option
                        v-for="rune of rune_second"
                        :key="rune._id"
                        :label="rune.name"
                        :value="rune._id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="第三層符文" label-width="128px">
                    <el-select v-model="model.primary_rune.rune_third">
                      <el-option
                        v-for="rune of rune_third"
                        :key="rune._id"
                        :label="rune.name"
                        :value="rune._id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="第四層符文" label-width="128px">
                    <el-select v-model="model.primary_rune.rune_fourth">
                      <el-option
                        v-for="rune of rune_fourth"
                        :key="rune._id"
                        :label="rune.name"
                        :value="rune._id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-card>
              </el-col>
              <el-col :span="8">
                <!-- 副符文 -->
                <el-card shadow="never">
                  <span>副符文</span>
                  <el-form-item label="副符文" label-width="128px">
                    <el-select v-model="model.secondary_rune.rune" @change="handle_get_secondary_runes">
                      <el-option
                        v-for="rune of secondaryRuneList"
                        :key="rune._id"
                        :label="rune.name"
                        :value="rune._id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="第一層符文" label-width="128px">
                    <el-select v-model="model.secondary_rune.rune_first" @change="handle_get_secondary_secondRunes">
                      <el-option
                        v-for="rune of relatedSecondaryRuneList"
                        :key="rune._id"
                        :label="rune.name"
                        :value="rune._id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="第二層符文" label-width="128px">
                    <el-select v-model="model.secondary_rune.rune_second">
                      <el-option
                        v-for="rune of relatedSecondarySecondRuneList"
                        :key="rune._id"
                        :label="rune.name"
                        :value="rune._id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-card>
              </el-col>
              <el-col :span="8">
                <!-- 小符文 -->
                <el-card shadow="never">
                  <span>小符文</span>
                  <el-form-item label="第一層符文" label-width="128px">
                    <el-select v-model="model.little_rune.rune_first">
                      <el-option
                        v-for="rune of littleFirstRuneList"
                        :key="rune._id"
                        :label="rune.name"
                        :value="rune._id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="第二層符文" label-width="128px">
                    <el-select v-model="model.little_rune.rune_second">
                      <el-option
                        v-for="rune of littleSecondRuneList"
                        :key="rune._id"
                        :label="rune.name"
                        :value="rune._id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="第三層符文" label-width="128px">
                    <el-select v-model="model.little_rune.rune_third">
                      <el-option
                        v-for="rune of littleThirdRuneList"
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
        <div style="margin-top: 1rem">
          <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
            <el-button @click="$router.push('/heroes/list')">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { updateHero, createHero, getHero, getHeroList } from '@/api/hero'
import { getItemList } from '@/api/item'
import { getCateList } from '@/api/category'
import { getSpellList } from '@/api/spell'
import {
  get_primary_rune,
  get_related_rune,
  get_secondary_rune,
  get_related_second_rune,
  get_little_first_rune,
  get_little_second_rune,
  get_little_third_rune
} from '@/api/rune'

import upload from '@/mixins/upload'
import rune from '@/mixins/rune'

export default {
  name: 'HeroEdit',
  props: {
    id: {}
  },

  mixins: [upload, rune],

  data() {
    return {
      heroCateList: null,
      itemList: [],
      heroes: [],
      spellList: [],
      // 主符文
      primaryRuneList: [],
      relatedRuneList: [],
      // 副符文
      secondaryRuneList: [],
      relatedSecondaryRuneList: [],
      relatedSecondarySecondRuneList: [],
      // 小符文
      littleFirstRuneList: [],
      littleSecondRuneList: [],
      littleThirdRuneList: [],

      // 英雄訊息
      model: {
        name: '',
        avatar: '',
        skills: [],
        counters: [],
        spells: [],
        skins: [],

        primary_rune: {
          rune: null,
          rune_first: null,
          rune_second: null,
          rune_third: null,
          rune_fourth: null
        },

        secondary_rune: {
          rune: null,
          rune_first: null,
          rune_second: null
        },

        little_rune: {
          rune_first: null,
          rune_second: null,
          rune_third: null
        }
      }
    }
  },

  mounted() {
    this.fetch_primary_rune()
    this.fetch_little_first_rune()
    this.fetch_little_second_rune()
    this.fetch_little_third_rune()
    this.getItemList()
    this.getCateList()
    this.getHeroList()
    this.getSpellList()
    this.id && this.getHero()
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
      this.model = Object.assign({}, this.model, res.data.data)
    },
    async getCateList() {
      const res = await getCateList()
      for (const cate of res.data.data) {
        if (cate.name === '英雄分類') {
          this.heroCateList = cate.children
          break
        }
      }
    },
    async getItemList() {
      const res = await getItemList()
      this.itemList = res.data.data
    },
    async getHeroList() {
      const res = await getHeroList()
      this.heroes = res.data.data
    },
    async getSpellList() {
      const res = await getSpellList()
      this.spellList = res.data.data
    },

    // 一上來就拿到主符文
    async fetch_primary_rune() {
      const res = await get_primary_rune()
      this.primaryRuneList = res.data.data
    },

    // 選取主符文後加載
    async handle_get_first_runes(runeId) {
      if (runeId) {
        // 每個重新選就清空已選的符文
        this.$set(this.model.primary_rune, 'rune_first', '')
        this.$set(this.model.primary_rune, 'rune_second', '')
        this.$set(this.model.primary_rune, 'rune_third', '')
        this.$set(this.model.primary_rune, 'rune_fourth', '')
        this.$set(this.model.secondary_rune, 'rune', '')
        this.$set(this.model.secondary_rune, 'rune_first', '')
        this.$set(this.model.secondary_rune, 'rune_second', '')

        // 獲取相關符文
        const res = await get_related_rune(runeId)
        this.relatedRuneList = res.data.data

        //  獲取副符文
        const secondaryRes = await get_secondary_rune(runeId)
        this.secondaryRuneList = secondaryRes.data.data
      }
    },
    async handle_get_secondary_runes(runeId) {
      if (runeId) {
        this.$set(this.model.secondary_rune, 'rune_first', '')
        this.$set(this.model.secondary_rune, 'rune_second', '')
        const res = await get_related_second_rune(runeId)
        this.relatedSecondaryRuneList = res.data.data
      }
    },
    async handle_get_secondary_secondRunes(runeId) {
      const data = this.relatedSecondaryRuneList.filter(rune => rune._id === runeId)
      const slotLabel = data[0].slotLabel
      const result = this.relatedSecondaryRuneList.filter(rune => rune.slotLabel !== slotLabel)
      this.relatedSecondarySecondRuneList = result
    },
    async fetch_little_first_rune() {
      const res = await get_little_first_rune()
      this.littleFirstRuneList = res.data.data
    },
    async fetch_little_second_rune() {
      const res = await get_little_second_rune()
      this.littleSecondRuneList = res.data.data
    },
    async fetch_little_third_rune() {
      const res = await get_little_third_rune()
      this.littleThirdRuneList = res.data.data
    }
  }
}
</script>
