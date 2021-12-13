<template>
  <div>
    <button @click="dataToParent">傳資料給父層</button>
  </div>
</template>

<script>
export default {
  name: 'RuneList',
  data() {
    return {
      textB1: 'B1'
    }
  },

  methods: {
    dataToParent() {
      this.$emit('emit-data', this.textB1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
