<template>
  <div>
    <div class="bg-white px-3">
      <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
        <div
          class="nav-item"
          v-for="(title, i) in swiperBar"
          :class="{ active: active === i }"
          :key="i"
          @click="$refs.heroInfoSwiper.$swiper.slideTo(i)"
        >
          <div class="nav-link">{{ title.title }}</div>
        </div>
      </div>
    </div>
    <swiper
      :options="options"
      ref="heroInfoSwiper"
      @slide-change="() => (active = $refs.heroInfoSwiper.$swiper.realIndex)"
    >
      <swiper-slide>
        <div>
          <div class="pt-2 px-3 bg-white">
            <!-- skills -->
            <div class="skills bg-white">
              <div class="d-flex jc-around">
                <img
                  class="icon"
                  @click="currentSkillIndex = i"
                  :class="{ active: currentSkillIndex === i }"
                  :src="item.icon"
                  v-for="(item, i) in model.skills"
                  :key="item.name"
                />
              </div>
              <div v-if="currentSkill">
                <div class="d-flex pt-4 pb-3">
                  <h3 class="m-0">{{ currentSkill.name }}</h3>
                  <span class="text-grey-1 ml-4" v-if="currentSkill.delay">
                    冷却值: {{ currentSkill.delay }} 消耗: {{ currentSkill.cost }}
                  </span>
                </div>
                <p>{{ currentSkill.description }}</p>
                <video class="skill-video" autoplay muted loop :src="currentSkill.video"></video>
              </div>
            </div>
            <!-- skins -->
            <div class="skin">
              <div class="title">
                <h2>{{ model.name }} × SKINS</h2>
              </div>
              <div class="thumb-example">
                <!-- swiper1 -->
                <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
                  <swiper-slide class="mb-1" v-for="(skin, i) in model.skins" :key="i">
                    <img class="w-100" :src="skin.img" alt="" />
                  </swiper-slide>
                </swiper>
                <!-- swiper2 Thumbs -->
                <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
                  <swiper-slide v-for="(skin, i) in model.skins" :key="i">
                    <div class="skinItem">
                      <img class="w-100" :src="skin.img" alt="" />
                      <div class="skinNameContainer">
                        <span class="skinName">{{ skin.name }}</span>
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="strategy_conatiner d-flex jc-around ai-center">
          <div class="item_container">
            <m-card plain title="出裝" class="hero-items">
              <div class="fs-xl">起手</div>
              <div class="d-flex jc-start">
                <div class="px-1 py-1" v-for="item in model.startItems" :key="item.name">
                  <img :src="item.iconPath" class="icon" />
                </div>
              </div>
              <div class="fs-xl">推薦</div>
              <div class="d-flex jc-start">
                <div class="px-1 py-1" v-for="item in model.items" :key="item.name">
                  <img :src="item.iconPath" class="icon" />
                </div>
              </div>
              <div class="fs-xl">鞋子</div>
              <div class="d-flex jc-start">
                <div class="px-1 py-1" v-for="item in model.shoes" :key="item.name">
                  <img :src="item.iconPath" class="icon" />
                </div>
              </div>
            </m-card>
          </div>
          <div>
            <div class="counter_hero_container">
              <m-card plain title="難以對抗英雄">
                <div class="d-flex jc-around">
                  <div v-for="item in model.counters" :key="item.name" class="px-2">
                    <img :src="item.hero.avatar" alt="" />
                  </div>
                  <div class="clear"></div>
                </div>
              </m-card>
            </div>
            <div class="spell_container">
              <m-card plain title="召喚師技能">
                <div class="d-flex jc-center">
                  <div v-for="item in model.spells" :key="item.name" class="px-2">
                    <img :src="item.icon" alt="" />
                  </div>
                </div>
              </m-card>
            </div>
            <div class="skill_order_container">
              <m-card plain title="技能加點順序">
                <div class="d-flex jc-between">
                  <div v-for="item in skillsOrder" :key="item.name" class="skill_order_img_container">
                    <img :src="item.icon" alt="" />
                    <span class="key text-white fs-lg">{{ item.keyName }}</span>
                  </div>
                </div>
              </m-card>
            </div>
          </div>
        </div>
        <Runes :model="model"></Runes>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import Runes from '../Runes'
export default {
  name: 'HeroInfoSwiper',
  props: ['model'],
  components: { Runes },
  data() {
    return {
      active: 0,
      currentSkillIndex: 0,
      swiperBar: [{ title: '認識英雄' }, { title: '進階攻略' }],

      options: {
        autoHeight: true
      },

      swiperOptionTop: {
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10
      },
      swiperOptionThumbs: {
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10, // 縮略圖之間的間隙大小
        centeredSlides: true, // 大圖對應的縮略圖位置顯示在中間
        slidesPerView: 5, // 每一頁顯示下方縮略圖的數量，auto ：自動顯示所有數量；輸入number（如1、2、3等）則是手動定義顯示的數量
        touchRatio: 0.2, // 觸控比例，可理解為拖動縮略圖的距離，默認值為1
        slideToClickedSlide: true // 點擊其他縮略圖可跳轉
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper
      const swiperThumbs = this.$refs.swiperThumbs.$swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  },

  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex]
    },

    // 技能加點順序
    skillsOrder() {
      return this.model.skills.filter(item => item.skillOrder).sort((a, b) => a.skillOrder - b.skillOrder)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
.strategy_conatiner {
  img {
    width: 40px;
    height: 40px;
  }
}
.counter_hero_container {
  img {
    border-radius: 50%;
  }
}
.skill_order_container {
  .skill_order_img_container {
    position: relative;

    .key {
      position: absolute;
      right: 0;
      bottom: 0.3rem;
      background-color: #000;
      color: #fff;
      text-align: center;
      width: 13px;
      height: 13px;
      line-height: 13px;
      font-weight: 300;
      font-size: 12px;
    }
  }
}
</style>