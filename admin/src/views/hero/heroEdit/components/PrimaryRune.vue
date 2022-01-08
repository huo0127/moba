<template>
  <el-card shadow="never">
    <div slot="header">
      <span>主符文</span>
    </div>
    <el-form-item label="第一層符文" label-width="128px">
      <el-select v-model="runeData.level1_rune" @change="clearRune">
        <el-option v-for="rune of level1_runeList" :key="rune._id" :label="rune.name" :value="rune._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="第二層符文" label-width="128px">
      <el-select v-model="runeData.level2_rune">
        <el-option v-for="rune of level2_runeList" :key="rune._id" :label="rune.name" :value="rune._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="第三層符文" label-width="128px">
      <el-select v-model="runeData.level3_rune">
        <el-option v-for="rune of level3_runeList" :key="rune._id" :label="rune.name" :value="rune._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="第四層符文" label-width="128px">
      <el-select v-model="runeData.level4_rune">
        <el-option v-for="rune of level4_runeList" :key="rune._id" :label="rune.name" :value="rune._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="第五層符文" label-width="128px">
      <el-select v-model="runeData.level5_rune">
        <el-option v-for="rune of level5_runeList" :key="rune._id" :label="rune.name" :value="rune._id"></el-option>
      </el-select>
    </el-form-item>
  </el-card>
</template>

<script>
export default {
  name: 'PrimaryRune',
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
      level4_runeList: [],
      level5_runeList: [],

      runeData: {
        level1_rune: '',
        level2_rune: '',
        level3_rune: '',
        level4_rune: '',
        level5_rune: ''
      }
    }
  },

  watch: {
    dataRuneList: {
      immediate: true,
      handler: function(val) {
        if (!val) return
        // 沒有數據的話會只有 id值
        this.level1_runeList = val.filter(item => item.styleName === '' && Number(item.ID) > 6000)
        this.level2_runeList = val
        this.level3_runeList = val
        this.level4_runeList = val
        this.level5_runeList = val
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
          this.runeData.level4_rune = val.level4_rune
          this.runeData.level5_rune = val.level5_rune
        }
      },
      deep: true
    },

    'runeData.level1_rune': {
      handler: function(val) {
        this.$EventBus.$emit('getRune', val)

        const level1_rune = this.dataRuneList.filter(item => item._id === val)
        const primary_rune = this.dataRuneList.filter(item => item.styleName === level1_rune[0].name)
        const data_level2_rune = primary_rune.filter(item => item.slotLabel === '基石')
        this.level2_runeList = data_level2_rune

        const level3_arr = []
        const level4_arr = []
        const level5_arr = []
        primary_rune.filter(item => {
          const level3_slotLabelArr = ['預謀', '寶物', '巧具', '英武', '蠻力']
          const level4_slotLabelArr = ['追蹤', '卓越', '未來', '傳說', '抵抗']
          const level5_slotLabelArr = ['狩獵', '威能', '超越', '戰鬥', '生機']
          if (level3_slotLabelArr.indexOf(item.slotLabel) > -1) {
            level3_arr.push(item)
          }
          if (level4_slotLabelArr.indexOf(item.slotLabel) > -1) {
            level4_arr.push(item)
          }
          if (level5_slotLabelArr.indexOf(item.slotLabel) > -1) {
            level5_arr.push(item)
          }
        })
        this.level3_runeList = level3_arr
        this.level4_runeList = level4_arr
        this.level5_runeList = level5_arr
      }
    },
    deep: true
  },

  methods: {
    // 每次重選都清空
    clearRune() {
      this.$set(this.runeData, 'level2_rune', '')
      this.$set(this.runeData, 'level3_rune', '')
      this.$set(this.runeData, 'level4_rune', '')
      this.$set(this.runeData, 'level5_rune', '')
    }
  }
}
</script>
