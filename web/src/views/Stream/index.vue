<template>
  <div id="streamContainer">
    <StreamTopbar></StreamTopbar>
    <div class="gameContainer" v-for="game in gameInformation" :key="game.id">
      <img :src="game.img" alt="" />
      <div class="game_name flex-1">
        <div>
          {{ game.name }}
        </div>
        <div class="game_follow">10.9萬位觀眾．3230萬位追隨者</div>
      </div>
    </div>
    <div id="StreamerListContainer">
      <div class="streamerContainer" v-for="streamer in streamList" :key="streamer.id">
        <div class="streamerBorder bg-white">
          <router-link :to="`/streamer/${streamer.user_name}/${streamer.user_id}`">
            <img :src="streamer.stream_thumbnail_url" alt="" class="streamerThumbnail w-100" />
            <div class="streamerTitle text-dark ml-3 mt-2">{{ streamer.title }}</div>
            <div class="username m-1 text-dark-1 ml-3 mt-2">{{ streamer.user_name }}</div>
            <div class="ml-3 mb-2">{{ streamer.game_name }}</div>
            <div class="viewerCount">{{ streamer.stream_viewer_count }} 位觀眾</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStreamList, getGameInformation } from '@/api/stream'
import StreamTopbar from '@/components/StreamTopbar'

export default {
  name: 'Stream',
  data() {
    return {
      streamList: [],
      gameInformation: []
    }
  },
  components: { StreamTopbar },

  methods: {
    async fetchStreamList() {
      const res = await getStreamList()

      const dataStreamList = []
      for (const key in res.data) {
        dataStreamList.push({
          id: res.data[key].id,
          user_id: res.data[key].user_id,
          user_name: res.data[key].user_name,
          title: res.data[key].title,
          game_name: res.data[key].game_name,
          stream_thumbnail_url: res.data[key].thumbnail_url.replace('{width}', '440').replace('{height}', '248'),
          stream_viewer_count: res.data[key].viewer_count
        })
      }
      this.streamList = [...this.streamList, ...dataStreamList]
    },

    async fetchGameInformation() {
      const res = await getGameInformation()

      const dataGameInformation = []
      for (const key in res.data) {
        dataGameInformation.push({
          name: res.data[key].name,
          img: res.data[key].box_art_url.replace('{width}', '80').replace('{height}', '107')
        })
      }
      this.gameInformation = [...this.gameInformation, ...dataGameInformation]
    }
  },
  mounted() {
    this.fetchGameInformation()
    this.fetchStreamList()
  }
}
</script>

<style lang="scss">
#streamContainer {
  background-color: #f9f9f9;
  .gameContainer {
    display: flex;
    align-items: center;
    margin: 1.5rem;
    .game_name {
      margin-left: 1rem;
      font-size: 1.3rem;
      font-weight: 600;
      line-height: 1.5;
      .game_follow {
        font-size: 1.2rem;
        font-weight: normal;
      }
    }
  }
  .streamerContainer {
    padding: 0 0.5rem;
    position: relative;
    .streamerBorder {
      border: 1px solid rgba(0, 0, 0, 0.1);
      margin-bottom: 0.5rem;
      a {
        text-decoration: none;
      }

      .streamerTitle {
        font-size: 14px;
        font-weight: 600;
      }
      .viewerCount {
        position: absolute;
        bottom: 30%;
        color: white;
        margin-left: 1rem;
        margin-bottom: 0.4rem;
      }
    }
  }
}
</style>
