<template>
  <m-card class="mb-2" :icon="icon" :title="title" :list="list" v-on="$listeners" v-bind="$attrs">
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{ active: active === i }"
        v-for="(category, i) in categories"
        :key="i"
        @click="toggleNav(i, category.name)"
      >
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper ref="list" :options="{ autoHeight: true }" @slide-change="() => (active = $refs.list.$swiper.realIndex)">
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :list="list"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String },
    title: { type: String },
    categories: { type: Array, required: true },
    list: { type: Array, required: true }
  },

  data() {
    return {
      active: 0,
      category: ''
    }
  },
  methods: {
    toggleNav(index, category) {
      if (this.active == index) return
      this.active = index
      this.category = category
      this.$emit('fetchCategory', this.category)
      this.$refs.list.$swiper.slideTo(index)
    }
  }
}
</script>
