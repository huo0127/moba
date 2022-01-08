<template>
  <div class="about">
    <h1 class="title">{{ id ? '編輯' : '創建' }}英雄</h1>
    <div class="heroEditConatiner">
      <el-form label-width="120px" @submit.native.prevent="save" :rules="rules" :model="model" ref="model">
        <el-tabs value="basic" type="border-card" v-model="activeName">
          <!-- 基本訊息 -->
          <el-tab-pane label="基本訊息" name="basic">
            <el-form-item label="名稱" style="margin-top: 1rem" prop="name">
              <el-input v-model="model.name" v-focus></el-input>
            </el-form-item>
            <el-form-item label="路線" prop="categories">
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
              <UploadImage v-model="model.avatar" @getUploadImage="getUploadImage"></UploadImage>
            </el-form-item>
            <el-form-item label="背景圖片">
              <UploadImage v-model="model.banner" @getUploadImage="getBannerImage"></UploadImage>
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
                    <UploadImage v-model="skin.img" @getUploadImage="getSkinImage"></UploadImage>
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
                    <UploadImage v-model="item.icon" @getUploadImage="getSkillImage"></UploadImage>
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
                    <UploadVideo v-model="item.video" @getUploadVideo="getUploadVideo"></UploadVideo>
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
          <el-tab-pane label="進階攻略 - 符文" name="runes">
            <el-row :gutter="20">
              <el-col :span="8">
                <PrimaryRune
                  v-for="runeObj in model.primary_rune"
                  :key="runeObj.id"
                  :runeObj="runeObj"
                  :dataRuneList="runeList"
                  ref="primary"
                ></PrimaryRune>
              </el-col>
              <el-col :span="8">
                <SecondaryRune
                  v-for="runeObj in model.secondary_rune"
                  :key="runeObj.id"
                  :runeObj="runeObj"
                  :dataRuneList="runeList"
                  ref="second"
                ></SecondaryRune>
              </el-col>
              <el-col :span="8">
                <LittleRune
                  v-for="runeObj in model.little_rune"
                  :key="runeObj.id"
                  :runeObj="runeObj"
                  :dataRuneList="runeList"
                  ref="little"
                ></LittleRune>
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
import { getRuneList } from '@/api/rune'
import UploadImage from '@/components/UploadImage'
import UploadVideo from '@/components/UploadVideo'
import PrimaryRune from './components/PrimaryRune.vue'
import SecondaryRune from './components/SecondaryRune.vue'
import LittleRune from './components/LittleRune.vue'

export default {
  name: 'HeroEdit',
  props: {
    id: {}
  },
  components: { UploadImage, UploadVideo, PrimaryRune, SecondaryRune, LittleRune },

  data() {
    return {
      activeName: 'basic',
      heroCateList: '',
      itemList: [],
      heroes: [],
      spellList: [],
      runeList: [],

      // 英雄訊息
      model: {
        name: '',
        avatar: '',
        skills: [],
        counters: [],
        spells: [],
        skins: [],

        primary_rune: [
          {
            level1_rune: '',
            level2_rune: '',
            level3_rune: '',
            level4_rune: '',
            level5_rune: ''
          }
        ],

        secondary_rune: [
          {
            level1_rune: '',
            level2_rune: '',
            level3_rune: ''
          }
        ],

        little_rune: [
          {
            rune_first: '',
            rune_second: '',
            rune_third: ''
          }
        ]
      },

      rules: {
        name: [{ required: true, message: '請輸入英雄名稱', trigger: 'blur' }],
        categories: [{ required: true, message: '請選擇英雄路線', trigger: 'blur' }]
      }
    }
  },

  mounted() {
    this.getItemList()
    this.getCateList()
    this.getHeroList()
    this.getSpellList()
    this.getRuneList()
    this.id && this.getHero()
  },

  methods: {
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

    async getRuneList() {
      const res = await getRuneList()
      this.runeList = res.data.data
    },

    getUploadImage(val) {
      this.model.avatar = val
    },
    getBannerImage(val) {
      this.model.banner = val
    },
    getSkinImage(val) {
      this.model.skins.forEach(skin => {
        skin.img = val
      })
    },
    getSkillImage(val) {
      this.model.skills.forEach(item => {
        item.icon = val
      })
    },
    getUploadVideo(val) {
      this.model.skills.forEach(item => {
        item.video = val
      })
    },

    save() {
      const primaryRuneArr = []
      const secondRuneArr = []
      const littleRuneArr = []
      primaryRuneArr.push(this.$refs.primary[0].runeData)
      secondRuneArr.push(this.$refs.second[0].runeData)
      littleRuneArr.push(this.$refs.little[0].runeData)
      this.model.primary_rune = primaryRuneArr
      this.model.secondary_rune = secondRuneArr
      this.model.little_rune = littleRuneArr
      this.$refs.model.validate(async valid => {
        if (valid) {
          try {
            if (this.id) {
              await updateHero(this.id, this.model)
            } else {
              await createHero(this.model)
            }
            this.$message.success(this.id ? '編輯英雄成功' : '創建英雄成功')
            this.$router.push('/heroes/list')
          } catch (err) {
            this.$message.error(this.id ? '編輯英雄失敗' : '創建英雄失敗')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
