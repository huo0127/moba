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
    <swiper ref="heroInfoSwiper" @slide-change="() => (active = $refs.heroInfoSwiper.$swiper.realIndex)">
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
                    <img class="w-100" style="" :src="skin.img" alt="" />
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="strategy_conatiner d-flex jc-around">
          <div class="item_container">
            <m-card plain title="出裝" class="hero-items">
              <div class="fs-xl">起手</div>
              <div class="d-flex jc-start mt-2">
                <div class="mr-1 mb-1" v-for="item in model.startItems" :key="item.name">
                  <img :src="item.iconPath" class="icon" />
                </div>
              </div>
              <div class="fs-xl">推薦</div>
              <div class="d-flex jc-start mt-2">
                <div class="mr-1 mb-1" v-for="item in model.items" :key="item.name">
                  <img :src="item.iconPath" class="icon" />
                </div>
              </div>
              <div class="fs-xl">鞋子</div>
              <div class="d-flex jc-start mt-2">
                <div class="mr-1 mb-1" v-for="item in model.shoes" :key="item.name">
                  <img :src="item.iconPath" class="icon" />
                </div>
              </div>
            </m-card>
          </div>
          <div class="pt-4">
            <div class="counter_hero_container">
              <m-card plain title="難以對抗英雄">
                <div class="d-flex jc-around">
                  <div v-for="item in model.counters" :key="item.name">
                    <img :src="item.hero.avatar" alt="" />
                  </div>
                  <div class="clear"></div>
                </div>
              </m-card>
            </div>
            <div class="spell_container">
              <m-card plain title="召喚師技能">
                <div class="d-flex jc-center">
                  <div v-for="item in model.spells" :key="item.name">
                    <img class="mr-3" :src="item.icon" alt="" />
                  </div>
                </div>
              </m-card>
            </div>
          </div>
        </div>
        <div class="rune_container">
          <m-card plain title="推薦符文設置" class="text-center">
            <div class="talent_container d-flex jc-around ai-end">
              <div>
                <div>
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                </div>
                <div>
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                </div>
                <div>
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                </div>
                <div>
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                </div>
                <div>
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                </div>
              </div>
              <div>
                <div>
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                </div>
                <div>
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                </div>
                <div>
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                  <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                </div>
                <div>
                  <img
                    src="https://opgg-static.akamaized.net/images/lol/perk/8401.png?image=q_auto:best&v=1637122822"
                    alt=""
                  />
                  <img
                    src="https://opgg-static.akamaized.net/images/lol/perk/8401.png?image=q_auto:best&v=1637122822"
                    alt=""
                  />
                  <img
                    src="https://opgg-static.akamaized.net/images/lol/perk/8401.png?image=q_auto:best&v=1637122822"
                    alt=""
                  />
                </div>
              </div>
              <div class="small_rune flex-column d-flex ai-center pb-2">
                <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
                <img src="https://game.gtimg.cn/images/lol/act/img/spell/Summoner_flash.png" alt="" />
              </div>
            </div>
          </m-card>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HeroInfoSwiper',
  props: ['model'],
  data() {
    return {
      currentSkillIndex: 0,
      active: 0,
      swiperBar: [{ title: '認識英雄' }, { title: '進階攻略' }],

      swiperOptionTop: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10
      },
      swiperOptionThumbs: {
        loop: true, // 是否可回圈
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

.rune_container {
  .talent_container {
    border-top: 1px solid map-get($colors, 'light-1');
    padding-top: 1rem;
    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 1.2rem;
      margin-bottom: 0.4rem;
    }
  }
  .small_rune {
    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-bottom: 0.5rem;
    }
  }
}
</style>