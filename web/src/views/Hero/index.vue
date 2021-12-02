<template>
  <div class="page-hero" v-if="model">
    <div class="top" :style="{ 'background-image': `url(${model.banner})` }">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <h2 class="my-2">{{ model.name }}</h2>
        <div class="fs-sm">{{ model.categories.map((v) => v.name).join(' / ') }}</div>
        <div class="d-flex jc-between pt-2">
          <router-link to="/" tag="span" class="text-grey fs-sm">造型: {{ model.skins.length }} &gt;</router-link>
        </div>
      </div>
    </div>
    <!-- end of top -->
    <div class="counter-hero">
      <div class="hero-item" v-for="item in model.counters" :key="item.name">
        <img style="width: 32px; height: 32px; border-radius: 50%" :src="item.hero.avatar" alt="" />
      </div>
      <div class="clear"></div>
    </div>
    <div>
      <div class="bg-white px-3">
        <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                  <i class="iconfont icon-menu1"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-menu1"></i>
                  英雄介绍视频
                </router-link>
              </div>

              <!-- skills -->
              <div class="skills bg-white mt-4">
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
            </div>

            <div class="item-recommend">
              <m-card plain icon="menu1" title="出裝" class="hero-items">
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
            <div class="skin">
              <div class="title">
                <h2>SKINS</h2>
              </div>
              <thumbsGallery :model="model"></thumbsGallery>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import thumbsGallery from './components/thumbsGallery'
import { getHero } from '@/api/home'
export default {
  props: {
    id: { required: true }
  },
  components: { thumbsGallery },
  data() {
    return {
      model: null,
      currentSkillIndex: 0
    }
  },
  mounted() {
    this.fetch()
  },

  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex]
    }
  },
  methods: {
    async fetch() {
      // const res = await this.$http.get(`heroes/${this.id}`)
      const res = await getHero(this.id)
      this.model = res.data
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/_variables.scss';

.page-hero {
  .top {
    height: 50vw;
    background-size: 100%;
  }

  // float-right不跑版解決方法
  .counter-hero {
    .hero-item {
      float: right;
    }
    .clear {
      clear: both;
    }
  }
  .hero-items {
    img.icon {
      width: 2.4615rem;
      height: 2.4615rem;
      border-radius: 50%;
      border: 1px solid black;
    }
  }

  .skills {
    .skill-video {
      width: 100%;
      height: 100%;
    }
    img.icon {
      width: 5.3846rem;
      height: 5.3846rem;
      border: 3px solid map-get($colors, 'white');
      &.active {
        border-color: map-get($colors, 'primary');
      }
      border-radius: 50%;
    }
  }
  .skin {
    .title {
      text-align: center;
      font-size: 20px;
      margin-bottom: 20px;
      font-style: italic;
    }
  }
}
</style>
