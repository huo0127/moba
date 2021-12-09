<template>
  <div>
    <m-list-card icon="menu1" title="新聞資訊" :categories="newsCats">
      <template #items="{ category }">
        <router-link
          tag="div"
          :to="`/news/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{ news.name }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import date from '@/mixins/date'
import { getNewsList } from '@/api/news'
export default {
  name: 'NewsList',
  mixins: [date],
  data() {
    return {
      newsCats: []
    }
  },

  created() {
    this.fetchNewsCats()
  },
  methods: {
    async fetchNewsCats() {
      const res = await getNewsList()

      // 讓日期降序 sort -1
      for (const key in res.data) {
        const item = res.data[key].newsList
        item.sort(function(a, b) {
          return a.createdAt < b.createdAt ? 1 : -1
        })
      }
      this.newsCats = res.data
    }
  }
}
</script>

