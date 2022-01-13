<template>
  <div>
    <m-list-card
      :categories="heroCats"
      :list="heroList"
      @fetchCategory="fetchCategory"
      @getSearchValue="getSearchValue"
      :placeholder="placeholder"
    >
      <template #items="{ list }">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem; z-index: 10">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%"
            v-for="(hero, i) in list"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" style="border: 2px solid #000; border-radius: 6px" />
            <div style="white-space: nowrap">{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import { getHeroList, getHeroLane } from '@/api/hero'
export default {
  name: 'HeroList',
  data() {
    return {
      value: '',
      heroCats: [],
      heroList: [],
      heroLane: '全部',
      placeholder: '搜索英雄'
    }
  },
  mounted() {
    this.fetchHeroLane()
  },

  methods: {
    async fetchHeroLane() {
      const res = await getHeroLane()
      this.heroCats = res.data.data
      this.fetchHeroList()
    },

    async fetchHeroList() {
      const res = await getHeroList({ heroLane: this.heroLane, query: this.value })
      this.heroList = res.data.data
    },

    fetchCategory(val) {
      this.heroLane = val
      this.fetchHeroList()
    },

    getSearchValue(val) {
      // 避免重複查詢
      if (val === this.value) return
      this.value = val
      this.fetchHeroList(val)
    }
  }
}
</script>
