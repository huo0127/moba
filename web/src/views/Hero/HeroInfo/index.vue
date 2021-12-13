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
    <HeroInfoSwiper :model="model"></HeroInfoSwiper>
  </div>
</template>

<script>
import HeroInfoSwiper from './components/HeroInfoSwiper'
import { getHero } from '@/api/hero'
export default {
  name: 'HeroInformation',
  props: {
    id: { required: true }
  },
  components: { HeroInfoSwiper },
  data() {
    return {
      model: null
    }
  },
  mounted() {
    this.fetch()
  },

  methods: {
    async fetch() {
      // const res = await this.$http.get(`heroes/${this.id}`)
      const res = await getHero(this.id)
      this.model = res.data.data.data
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.page-hero {
  .top {
    height: 50vw;
    background-size: 100%;
  }

  // float-right不跑版解決方法
  .counter-hero {
    .hero-item {
      float: right;
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }
    .clear {
      clear: both;
    }
  }
  .hero-items {
    img.icon {
      width: 40px;
      height: 40px;
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
      font-style: italic;
    }
  }
}
</style>
