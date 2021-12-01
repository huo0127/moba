<template>
  <div>
    <m-list-card icon="menu1" title="新聞資訊" :categories="newsCats">
      <template #items="{ category }">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
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
import dayjs from 'dayjs'
import { getNewsList } from '@/api/home'
export default {
  name: 'News',
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
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
      this.newsCats = res.data
    }
  }
}
</script>

