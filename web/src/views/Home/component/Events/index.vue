<template>
  <div id="eventsContainer">
    <routerLink
      tag="div"
      :to="`/news/${event._id}`"
      class="eventInfoContainer px-3 py-3"
      v-for="event in eventList"
      :key="event.id"
    >
      <div class="text-center">
        <img :src="event.iconPath" alt="" />
      </div>
      <div class="svg">
        <svg
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
          data-v-7f40d2dc=""
          viewBox="0 0 320 240"
          width="320"
          height="240"
        >
          <path data-v-7f40d2dc="" d="M299.57,1l19.42,19.39V239h-318V1H299.57" stroke="#C2C1C1" fill="none"></path>
        </svg>
      </div>
      <div class="px-3 d-flex">
        <h3 class="fs-xl text-ellipsis">
          {{ event.name }}
        </h3>
      </div>
      <span class="fs-lg text-grey-1 px-3"> {{ event.updatedAt | date }}</span>
    </routerLink>
  </div>
</template>

<script>
import date from '@/mixins/date'
import { getEvents } from '@/api/home'
export default {
  name: 'Events',
  mixins: [date],

  data() {
    return {
      eventList: []
    }
  },
  mounted() {
    this.fetchEventsList()
  },
  methods: {
    async fetchEventsList() {
      const res = await getEvents()
      this.eventList = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.eventInfoContainer {
  position: relative;
  .svg {
    position: absolute;
    z-index: 10;
    top: 0.4rem;
    left: 2rem;
  }
}
</style>