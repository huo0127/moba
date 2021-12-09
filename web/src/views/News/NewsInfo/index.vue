<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-Back text-blue" @click="back"></div>
      <strong class="flex-1 text-blue pl-2">{{ model.title }}</strong>
      <div class="text-grey fs-xs">{{ model.updatedAt | date }}</div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>
  </div>
</template>

<script>
import date from '@/mixins/date'
import { getArticle } from '@/api/news'
export default {
  name: 'NewsInformation',
  mixins: [date],
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null
    }
  },
  watch: {
    id: 'fetch'
  },
  methods: {
    async fetch() {
      const res = await getArticle(this.id)
      this.model = res.data
    },
    back() {
      this.$router.go(-1)
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
.page-article {
  .icon-Back {
    font-size: 1.6923rem;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
