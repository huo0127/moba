<template>
  <div id="observer"></div>
</template>

<script>
export default {
  data() {
    return {
      observer: null
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        console.log(entry)
        this.$emit('intersect')
      }
    })
    this.observer.observe(this.$el)
  }
}
</script>

<style lang="scss" scoped>
</style>