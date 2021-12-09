<template>
  <div>
    <el-cascader-panel :options="options"></el-cascader-panel>
  </div>
</template>

<script>
import { getRuneList } from '@/api/rune'
export default {
  name: 'RuneList',
  data() {
    return {
      runeList: []
    }
  },
  mounted() {
    this.fetchRuneList()
  },
  methods: {
    async fetchRuneList() {
      const res = await getRuneList()
      this.runeList = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
