<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-edit">
          <svg-icon icon-class="edit" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">文章</div>
          <count-to :start-val="0" :end-val="total.article" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-list">
          <svg-icon icon-class="list" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">分類</div>
          <count-to :start-val="0" :end-val="total.category" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-hero">
          <svg-icon icon-class="card-hero" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">英雄</div>
          <count-to :start-val="0" :end-val="total.hero" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-goods">
          <svg-icon icon-class="goods" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">裝備</div>
          <count-to :start-val="0" :end-val="total.item" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-rune">
          <svg-icon icon-class="rune" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">天賦符文</div>
          <count-to :start-val="0" :end-val="total.rune" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-spell">
          <svg-icon icon-class="spell" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">招喚師技能</div>
          <count-to :start-val="0" :end-val="total.spell" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { totalCount } from '@/api/dashBoard'
import CountTo from 'vue-count-to'
export default {
  data() {
    return {
      total: {
        ads: 0,
        item: 0,
        hero: 0,
        category: 0,
        article: 0,
        rune: 0,
        spell: 0
      }
    }
  },
  components: {
    CountTo
  },
  created() {
    this.totalCount()
  },
  methods: {
    async totalCount() {
      const res = await totalCount()
      const item = res.data
      // :end-val必須是Number，後端傳過來的是json格式，所以必須轉換一下
      for (const key in item) {
        this.total = item[key]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-edit {
        background: #36a3f7;
      }
      .icon-hero {
        background: #f4516c;
      }
      .icon-goods {
        background: #34bfa3;
      }
      .icon-list {
        background: #ffe293;
      }
      .icon-rune {
        background: #fe8e6b;
      }
      .icon-spell {
        background: #dd85e6;
      }
    }

    .icon-edit {
      color: #36a3f7;
    }
    .icon-hero {
      color: #f4516c;
    }
    .icon-goods {
      color: #34bfa3;
    }
    .icon-list {
      color: #ffe293;
    }
    .icon-rune {
      color: #fe8e6b;
    }
    .icon-spell {
      color: #dd85e6;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }
  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
