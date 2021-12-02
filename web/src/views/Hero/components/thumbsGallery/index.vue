<template>
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
</template>

<script>
export default {
  props: ['model'],
  data() {
    return {
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
  }
}
</script>
