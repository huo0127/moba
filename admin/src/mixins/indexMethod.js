export default {
  methods: {
    indexMethod (index) {
      // this.pageParams.pagenum當前頁    this.pageParams.pagesize一頁展示行數
      return index + 1 + (this.pageParams.pagenum - 1) * this.pageParams.pagesize
    },
  }
}
