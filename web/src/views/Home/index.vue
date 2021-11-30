<template>
  <div class="content">
    <div class="swiper-background">
      <!-- 加上v-if就可輪播 -->
      <swiper v-if="adList.length" :options="swiperOption">
        <swiper-slide v-for="(ad, i) in adList" :key="i">
          <a :href="ad.url">
            <div class="svg">
              <svg
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 908 318"
                width="312"
                height="100"
              >
                <path d="M886.1,1L907,21.9V317H1V1H886.1" stroke="#f9f9f9" fill="none"></path>
              </svg>
            </div>
            <div class="pt-1">
              <img style="width: 300px" :src="ad.image" alt="" />
            </div>
          </a>
        </swiper-slide>
        <div class="swiper-pagination pagination-home text-right" slot="pagination"></div>
      </swiper>
    </div>
    <!-- end of swiper -->
    <hero></hero>
  </div>
</template>

<script>
import { getAds } from '@/api/home/ad'
import Hero from './components/Hero'
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          // 小圓點
          el: '.pagination-home',
          clickable: true
        },
        speed: 700,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true,
        observeParents: true,
        observer: true
      },
      adList: []
    }
  },
  components: { Hero },

  methods: {
    async fetchAdList() {
      const res = await getAds()
      const data = res.data
      for (const item of data) {
        const data = item.items
        this.adList = data
      }
    }
  },
  mounted() {
    this.fetchAdList()
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/_variables.scss';

.swiper-background {
  background-image: url('https://cdngarenanow-a.akamaihd.net/games/lol/2020/LOLwebsite/img/blurred1.jpg');
  max-width: 100%;
  background-size: contain;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  .swiper-container {
    margin: 0 1.5rem;
    .swiper-wrapper {
      .swiper-slide {
        text-align: center;
        padding-top: 2rem;
        padding-bottom: 2rem;
        .svg {
          left: 1rem;
          position: absolute;
          z-index: 10;
        }
      }
    }
    .pagination-home {
      .swiper-pagination-bullet {
        opacity: 1;
        border-radius: 0.1538rem;
        background: map-get($colors, 'white');
        &.swiper-pagination-bullet-active {
          background: map-get($colors, 'info');
        }
      }
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
