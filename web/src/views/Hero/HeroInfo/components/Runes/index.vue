<template>
  <div class="rune_container">
    <m-card plain title="推薦符文設置" class="text-center">
      <!-- 啟迪 -->
      <div class="talent_container d-flex jc-around ai-end">
        <div>
          <div>
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/GlacialAugment.png" alt="" />
          </div>
          <div>
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/GlacialAugment.png" alt="" />
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/UnsealedSpellbook.png" alt="" />
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/FirstStrike.png" alt="" />
          </div>
          <div>
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/HextechFlashtraption.png" alt="" />
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/MagicalFootwear.png" alt="" />
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/PerfectTiming.png" alt="" />
          </div>
          <div>
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/FuturesMarket.png" alt="" />
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/MinionDematerializer.png" alt="" />
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/BiscuitDelivery.png" alt="" />
          </div>
          <div>
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/CosmicInsight.png" alt="" />
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/ApproachVelocity.png" alt="" />
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/TimeWarpTonic.png" alt="" />
          </div>
        </div>
        <div>
          <div>
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/ws.png" alt="" />
          </div>
          <div>
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/Pokeshield.png" alt="" />
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/ManaflowBand.png" alt="" />
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/6361.png" alt="" />
          </div>
          <div>
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/Transcendence.png" alt="" />
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/CelerityTemp.png" alt="" />
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/AbsoluteFocus.png" alt="" />
          </div>
          <div>
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/Scorch.png" alt="" />
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/Waterwalking.png" alt="" />
            <img src="https://game.gtimg.cn/images/lol/act/img/rune/GatheringStorm.png" alt="" />
          </div>
        </div>
        <div class="small_rune flex-column d-flex ai-center pb-2">
          <img :src="model.little_rune.rune_first.icon" alt="" />
          <img :src="model.little_rune.rune_second.icon" alt="" />
          <img :src="model.little_rune.rune_third.icon" alt="" />
        </div>
      </div>
    </m-card>
  </div>
</template>

<script>
import { getRunes } from '@/api/rune'
export default {
  name: 'Runes',
  inheritAttrs: false,
  props: {
    model: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      primaryRunes: []
    }
  },
  methods: {
    async fetchPrimaryRune() {
      const { rune, rune_first, rune_second, rune_third, rune_fourth } = this.model.primary_rune
      const res = await getRunes(rune._id, rune_first._id, rune_second._id, rune_third._id, rune_fourth._id)
      // const res = await getRunes(this.model.primary_rune.rune._id)
      console.log(res)
    }
  },
  created() {
    this.fetchPrimaryRune()
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.rune_container {
  .talent_container {
    border-top: 1px solid map-get($colors, 'light-1');
    padding-top: 1rem;
    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 0.9rem;
      margin-bottom: 0.4rem;
    }
  }
  .small_rune {
    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-bottom: 0.5rem;
    }
  }
}
</style>