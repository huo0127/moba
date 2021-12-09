<template>
  <div>
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem; z-index: 10">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" style="border: 2px solid #000" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import { getHeroList } from '@/api/hero'
export default {
  name: 'Hero',
  data() {
    return {
      heroCats: []
    }
  },
  mounted() {
    this.fetchHeroList()
  },

  methods: {
    async fetchHeroList() {
      const res = await getHeroList()
      this.heroCats = res.data
    }
  }
}
</script>
