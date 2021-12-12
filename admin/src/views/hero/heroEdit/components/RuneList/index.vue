<template>
  <div>
    <el-form-item label="天賦符文">
      <el-select v-model="runeList" multiple filterable>
        <el-option v-for="rune in runeList" :key="rune._id" :label="rune.name" :value="rune._id"></el-option>
      </el-select>
    </el-form-item>
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
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
