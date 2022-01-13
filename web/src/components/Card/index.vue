<template>
  <div class="card bg-white p-3 mt-2">
    <div class="card-header">
      <form action="/">
        <van-search :placeholder="placeholder" v-model="value" @search="sendSearchValue" :clearable="clearable" />
      </form>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data() {
    return {
      value: ''
    }
  },
  props: {
    title: { type: String },
    icon: { type: String },
    plain: { type: Boolean },
    clearable: { type: Boolean, default: false },
    placeholder: { type: String }
  },
  watch: {
    value(val) {
      if (val === '') {
        this.sendSearchValue(val)
      }
    }
  },
  methods: {
    sendSearchValue(val) {
      this.$listeners.getSearchValue(val)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.card {
  border-bottom: 1px solid $border-color;
}
</style>
