<template>
  <div id="Home">
    <Ads></Ads>
    <Events></Events>
  </div>
</template>

<script>
import Events from './component/Events'
import Ads from './component/Ads'
export default {
  name: 'Home',
  components: { Events, Ads }
}
</script>
