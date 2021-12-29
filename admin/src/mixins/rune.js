export default {
  computed: {
    rune_first () {
      return this.relatedRuneList.filter(rune => rune.slotLabel === '基石')
    },
    rune_second () {
      return this.relatedRuneList.filter(
        rune =>
          rune.slotLabel === '預謀' ||
          rune.slotLabel === '寶物' ||
          rune.slotLabel === '巧具' ||
          rune.slotLabel === '英武'
      )
    },
    rune_third () {
      return this.relatedRuneList.filter(
        rune =>
          rune.slotLabel === '追蹤' ||
          rune.slotLabel === '卓越' ||
          rune.slotLabel === '未來' ||
          rune.slotLabel === '傳說'
      )
    },
    rune_fourth () {
      return this.relatedRuneList.filter(
        rune =>
          rune.slotLabel === '狩獵' ||
          rune.slotLabel === '威能' ||
          rune.slotLabel === '超越' ||
          rune.slotLabel === '戰鬥'
      )
    }
  }
}
