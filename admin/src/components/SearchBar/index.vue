<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input
          ref="searchValue"
          maxlength="8"
          clearable
          v-model="searchValue"
          @keyup.enter.native="searchInput"
          v-focus
        ></el-input>
      </el-col>
      <el-col :span="3">
        <el-button style="margin-left: 20px" type="primary" icon="el-icon-search" @click="searchInput"></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchValue: ''
    }
  },

  methods: {
    searchInput() {
      this.$emit('search', this.searchValue)
    }
  }
}
</script>
