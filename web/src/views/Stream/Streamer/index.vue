<template>
  <div id="streamerContainer">
    <StreamTopbar></StreamTopbar>
    <div class="streamerNameContainer">
      <div class="streamerName">
        <img :src="avatar" alt="" />
        <div>
          <p>{{ streamerName }}</p>
          <p class="">正在播放: {{ gameName }}</p>
        </div>
      </div>
    </div>
    <div class="streamerInfoContainer">
      <!-- Add a placeholder for the Twitch embed -->
      <div id="twitch-embed"></div>
    </div>
  </div>
</template>

<script>
import { getStreamer, getStreamerAvatar } from '@/api/stream'
import StreamTopbar from '@/components/StreamTopbar'
export default {
  name: 'Streamer',
  data() {
    return {
      streamID: 0,
      streamerName: '',
      gameID: '',
      gameName: '',
      streamTitle: '',
      streamViewerCount: 0,
      avatar: ''
    }
  },
  props: ['id'],
  components: { StreamTopbar },
  methods: {
    async fetchStreamerInfomation() {
      const res = await getStreamer(this.id)
      this.streamerName = res.data[0].broadcaster_name
      this.streamID = res.data[0].broadcaster_id
      this.gameID = res.data[0].game_id
      this.gameName = res.data[0].game_name
      this.streamTitle = res.data[0].title
    },

    async fetch() {
      const res2 = await getStreamerAvatar(this.id)
      this.avatar = res2.data[0].profile_image_url
    },

    runTwitchEmbed() {
      var embed = new Twitch.Embed('twitch-embed', {
        width: '100%',
        height: 620,
        channel: this.$route.params.streamer_user_name,
        layout: 'vide-with-chat'
      })
      embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
        var player = embed.getPlayer()
        player.play()
      })
    }
  },
  mounted() {
    this.fetchStreamerInfomation()
    this.fetch()

    const twitchScript = document.createElement('script')
    twitchScript.setAttribute('src', 'https://embed.twitch.tv/embed/v1.js')
    document.head.appendChild(twitchScript)

    setTimeout(() => {
      this.runTwitchEmbed()
    }, 500)
  }
}
</script>

<style lang="scss">
.streamerNameContainer {
  .streamerName {
    display: flex;
    background: white;
    position: absolute;
    top: 39%;
    height: 122px;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 1rem;
    }
  }
}
</style>
