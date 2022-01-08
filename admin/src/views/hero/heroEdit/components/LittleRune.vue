<template>
  <el-card shadow="never">
    <div slot="header">
      <span>小符文</span>
    </div>
    <el-form-item label="第一層符文" label-width="128px">
      <el-select v-model="runeData.level1_rune">
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
  </el-card>
</template>

<script>
export default {
  name: 'LittleRune',
  props: {
    runeObj: {
      type: Object,
      default: () => {}
    },
    dataRuneList: {
      type: Array,
      default: () => []
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
      }
    }
  },
  watch: {
    dataRuneList: {
      immediate: true,
      handler: function(val) {
        if (!val) return

        const level1_arr = []
        const level2_arr = []
        const level3_arr = []
        val.filter(item => {
          const level1_IdArr = ['5005', '5007', '5008']
          const level2_IdArr = ['5002', '5003', '5008']
          const level3_IdArr = ['5001', '5002', '5003']

          if (level1_IdArr.indexOf(item.ID) > -1) {
            level1_arr.push(item)
          }
          if (level2_IdArr.indexOf(item.ID) > -1) {
            level2_arr.push(item)
          }
          if (level3_IdArr.indexOf(item.ID) > -1) {
            level3_arr.push(item)
          }
        })
        this.level1_runeList = level1_arr
        this.level2_runeList = level2_arr
        this.level3_runeList = level3_arr
      },
      deep: true
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
    }
  }
}
</script>
