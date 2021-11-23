<template>
  <div class="home">
    <div class="myChart" :style="{ width: '800px', height: '400px' }"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

import { hero_lane } from '@/api/dashBoard'
export default {
  name: 'Echarts',
  components: { echarts },
  data() {
    return {
      echartsData: []
    }
  },
  mounted() {
    this.fetchEcharts()
    this.drawEcharts()
  },
  watch: {
    echartsData() {
      this.drawEcharts()
    }
  },
  methods: {
    async fetchEcharts() {
      const res = await hero_lane()
      this.echartsData = res
    },
    drawEcharts() {
      // 準備好的dom，初始化echarts
      const myChart = echarts.init(document.querySelector('.myChart'))
      // 绘制图表
      myChart.setOption({
        color: ['#4BA7F9'],
        title: { text: '英雄路線統計' },
        tooltip: {},
        xAxis: {
          data: ['上路', '打野', '中路', '下路', '輔助']
        },
        yAxis: { name: '數量' },
        series: [
          {
            name: '總數',
            type: 'bar',
            data: this.echartsData.data,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss">
.home {
  position: absolute;
  bottom: 0px;
  left: 0px;
}
</style>
