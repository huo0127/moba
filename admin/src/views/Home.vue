<template>
  <div class="home">
    <div class="myChart" :style="{ width: '800px', height: '400px' }"></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
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
      const res = await this.$http.get('echarts')
      this.echartsData = res.data
    },
    drawEcharts() {
      // 準備好的dom，初始化echarts
      const myChart = this.$echarts.init(document.querySelector('.myChart'))
      // 绘制图表
      myChart.setOption({
        color: ['#5470C6'],
        title: { text: '後臺數據總數' },
        tooltip: {},
        xAxis: {
          data: ['廣告', '文章', '分類', '英雄', '裝備']
        },
        yAxis: { name: '數量' },
        series: [
          {
            name: '總數',
            type: 'bar',
            data: this.echartsData,
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
