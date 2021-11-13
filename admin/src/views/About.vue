<template>
  <div class="about">
    <h2>about</h2>
    <ul v-for="(item, index) in items" :key="index">
      <li>
        {{ avatar }}
        {{ name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: {
        name: ann,
        avatar: [{ skins: 'http://www.google.com' }]
      }
    }
  }
}
</script>