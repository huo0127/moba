<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-Back text-blue" @click="back"></div>
      <strong class="flex-1 text-blue pl-2">{{ model.title }}</strong>
      <div class="text-grey fs-xs">{{ model.updatedAt | date }}</div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu1"></i>
        <strong class="text-blue fs-lg ml-1">相關資訊</strong>
      </div>
      <div class="pt-2">
        <router-link
          class="py-1"
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="item in model.related"
          :key="item._id"
          >{{ item.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getArticle } from '@/api/home'
export default {
  filters: {
    date(val) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
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
    // id(){
    //   this.fetch()
    // }
  },
  methods: {
    async fetch() {
      // const res = await this.$http.get(`articles/${this.id}`)
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
