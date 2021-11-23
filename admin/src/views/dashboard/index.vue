<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <panel-group />
      <echarts />
    </div>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import Echarts from './components/Echarts'
export default {
  name: 'Dashboard',
  components: { PanelGroup, Echarts },
  data() {
    return {}
  },
  methods: {}
}
</script>

