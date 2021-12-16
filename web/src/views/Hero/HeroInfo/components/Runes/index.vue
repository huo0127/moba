<template>
  <div class="rune_container">
    <m-card plain title="推薦符文設置" class="text-center">
      <div class="talent_container d-flex jc-between ai-end">
        <div class="primaryRuneContainer">
          <div>
            <img :src="model.primary_rune.rune.icon" alt="" />
          </div>
          <div class="floorRuneContainer">
            <div class="py-1">
              <div
                :class="{ runeLength: firstRune.length > 3 }"
                class="px-2"
                v-for="rune in firstRune"
                :key="rune.ID"
                style="display: inline-block"
              >
                <img :src="rune.icon" alt="" :class="{ active: primary_rune.rune_first.ID !== rune.ID }" />
              </div>
            </div>
            <div class="py-1">
              <div class="px-2" v-for="rune in secondRune" :key="rune.ID" style="display: inline-block">
                <img :src="rune.icon" alt="" :class="{ active: primary_rune.rune_second.ID !== rune.ID }" />
              </div>
            </div>
            <div class="py-1">
              <div class="px-2" v-for="rune in thirdRune" :key="rune.ID" style="display: inline-block">
                <img :src="rune.icon" alt="" :class="{ active: primary_rune.rune_third.ID !== rune.ID }" />
              </div>
            </div>
            <div class="py-1">
              <div class="px-2" v-for="rune in fourthRune" :key="rune.ID" style="display: inline-block">
                <img :src="rune.icon" alt="" :class="{ active: primary_rune.rune_fourth.ID !== rune.ID }" />
              </div>
            </div>
          </div>
        </div>

        <div class="secondaryRuneContainer">
          <div class="py-1">
            <img :src="model.secondary_rune.rune.icon" alt="" />
          </div>
          <div class="floorRuneContainer">
            <div class="py-1">
              <div
                v-for="rune in secondary_rune_firstRune"
                :key="rune.ID"
                style="display: inline-block; flex-wrap: wrap"
                class="px-2"
              >
                <img
                  :src="rune.icon"
                  alt=""
                  :class="{
                    active: secondary_rune.rune_first.ID !== rune.ID && secondary_rune.rune_second.ID !== rune.ID
                  }"
                />
              </div>
            </div>
            <div class="py-1">
              <div
                v-for="rune in secondary_rune_secondRune"
                :key="rune.ID"
                style="display: inline-block; flex-wrap: wrap"
                class="px-2"
              >
                <img
                  :src="rune.icon"
                  alt=""
                  :class="{
                    active: secondary_rune.rune_first.ID !== rune.ID && secondary_rune.rune_second.ID !== rune.ID
                  }"
                />
              </div>
            </div>
            <div class="py-1">
              <div
                v-for="rune in secondary_rune_thirdRune"
                :key="rune.ID"
                style="display: inline-block; flex-wrap: wrap"
                :class="{ runeLength: secondary_rune_thirdRune.length > 3 }"
                class="px-2"
              >
                <img
                  :src="rune.icon"
                  alt=""
                  :class="{
                    active: secondary_rune.rune_first.ID !== rune.ID && secondary_rune.rune_second.ID !== rune.ID
                  }"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="small_rune flex-column d-flex ai-center pb-2 ml-1">
          <img :src="model.little_rune.rune_first.icon" alt="" />
          <div style="width: 1px; height: 20px; background-color: #e5e5e5"></div>
          <img :src="model.little_rune.rune_second.icon" alt="" />
          <div style="width: 1px; height: 20px; background-color: #e5e5e5"></div>

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
      firstRune: [],
      secondRune: [],
      thirdRune: [],
      fourthRune: [],
      secondary_rune_firstRune: [],
      secondary_rune_secondRune: [],
      secondary_rune_thirdRune: [],
      runeLength: false
    }
  },
  methods: {
    async fetchPrimaryRune() {
      const { rune, rune_first, rune_second, rune_third, rune_fourth } = this.model.primary_rune

      const res = await getRunes(
        rune._id,
        rune_first._id,
        rune_second._id,
        rune_third._id,
        rune_fourth._id,
        this.model.secondary_rune.rune._id
      )
      this.firstRune = res.data.data.firstRune
      this.secondRune = res.data.data.secondRune
      this.thirdRune = res.data.data.thirdRune
      this.fourthRune = res.data.data.fourthRune
      this.secondary_rune_firstRune = res.data.data.secondary_firstRune
      this.secondary_rune_secondRune = res.data.data.secondary_secondRune
      this.secondary_rune_thirdRune = res.data.data.secondary_thirdRune
    }
  },

  computed: {
    primary_rune() {
      return this.model.primary_rune
    },
    secondary_rune() {
      return this.model.secondary_rune
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
    }
    .floorRuneContainer {
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: map-get($colors, 'black');
      }
      .runeLength {
        padding-left: 0.25rem;
        padding-right: 0.25rem;
      }
      .active {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        filter: grayscale(100%);
        filter: gray;
        opacity: 0.5;
        background: map-get($colors, 'grey-3');
      }
    }
  }
  .small_rune {
    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;

      background: map-get($colors, 'black');
    }
  }
}
</style>