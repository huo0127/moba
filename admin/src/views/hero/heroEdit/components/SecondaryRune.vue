<template>
  <el-card shadow="never">
    <div slot="header">
      <span>副符文</span>
    </div>
    <el-form-item label="第一層符文" label-width="128px">
      <el-select v-model="runeData.level1_rune" @change="clearRune">
        <el-option v-for="rune of level1_runeList" :key="rune._id" :label="rune.name" :value="rune._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="第二層符文" label-width="128px">
      <el-select v-model="runeData.level2_rune" @change="clear_level3_rune">
        <el-option v-for="rune of level2_runeList" :key="rune._id" :label="rune.name" :value="rune._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="第三層符文" label-width="128px">
      <el-select v-model="runeData.level3_rune">
        <el-option v-for="rune of level3_runeList" :key="rune._id" :label="rune.name" :value="rune._id"></el-option>
      </el-select>
    </el-form-item>
  </el-card>
</template>

<script>
export default {
  name: 'SecondaryRune',
  props: {
    runeObj: {
      type: Object,
      default: () => {}
    },
    dataRuneList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      level1_runeList: [],
      level2_runeList: [],
      level3_runeList: [],

      runeData: {
        level1_rune: '',
        level2_rune: '',
        level3_rune: ''
      },

      primary_level1: ''
    }
  },

  watch: {
    dataRuneList: {
      immediate: true,
      handler: function(val) {
        if (!val) return

        this.$EventBus.$on('getRune', rune => {
          this.primary_level1 = rune
          this.$set(this.runeData, 'level1_rune', '')
          this.$set(this.runeData, 'level2_rune', '')
          this.$set(this.runeData, 'level3_rune', '')
        })
        this.level1_runeList = val.filter(
          item => item.styleName === '' && Number(item.ID) > 6000 && item._id !== this.primary_level1
        )
        // 沒有數據的話會只有 id值
        this.level2_runeList = val
        this.level3_runeList = val
      }
    },
    runeObj: {
      immediate: true,
      handler: function(val) {
        if (!val) {
          this.runeData = {}
        } else {
          this.runeData.level1_rune = val.level1_rune
          this.runeData.level2_rune = val.level2_rune
          this.runeData.level3_rune = val.level3_rune
        }
      },
      deep: true
    },
    primary_level1: {
      handler: function(val) {
        this.level1_runeList = this.dataRuneList.filter(
          item => item.styleName === '' && Number(item.ID) > 6000 && item._id !== val
        )
      }
    },

    'runeData.level1_rune': {
      handler: function(val) {
        if (val == '') {
          return
        } else {
          const second_rune = this.dataRuneList.filter(item => item._id === val)
          this.level2_runeList = this.dataRuneList.filter(
            item => item.styleName === second_rune[0].name && item.slotLabel !== '基石'
          )
        }
      },
      deep: true
    },

    'runeData.level2_rune': {
      handler: function(val) {
        if (val == '') {
          return
        } else {
          const level2_rune = this.level2_runeList.filter(item => item._id === val)
          this.level3_runeList = this.level2_runeList.filter(item => item.slotLabel !== level2_rune[0].slotLabel)
        }
      },
      deep: true
    }
  },

  methods: {
    // 每次重選都清空
    clearRune() {
      this.$set(this.runeData, 'level2_rune', '')
      this.$set(this.runeData, 'level3_rune', '')
    },
    clear_level3_rune() {
      this.$set(this.runeData, 'level3_rune', '')
    }
  }
}
</script>

