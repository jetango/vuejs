<template>
  <div class="coupon">
    <div class="coupon-item flex flex-item" v-for="(item, index) in couponList" :key="item.couponEndDate">
      <span v-if="index === 0" class="flex-grow">优惠券仅限在评估时抵扣评估费使用</span>
      <div v-if="index !== 0" class="c-content flex-grow">
        <p><span>￥</span><span>{{item.couponPrice}}</span>优惠券</p>
        <p>{{item.couponEndDate}}日内有效</p>
      </div>
    </div>
    <no-data v-show="couponList !== null && couponList.length === 0" :title="title"></no-data>
  </div>
</template>

<script type="text/ecmascript-6">
  import NoData from 'base/noData/noData'
  export default {
    data() {
      return {
        couponList: [
          {
            couponPrice: '0'
          }, {
            couponPrice: 8,
            couponEndDate: '2018-06-23'
          }, {
            couponPrice: 2,
            couponEndDate: '2018-06-25'
          }, {
            couponPrice: 2,
            couponEndDate: '2018-06-28'
          }
        ],
        title: '暂无优惠券'
      }
    },
    components: {
      NoData
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .coupon-item
    margin-top: .1rem
    height: 1rem
    background-color: #fff
    padding: 0 .4rem
    span
      font-size: .28rem

    .c-content
      font-size: .28rem
      p
        color: #525252
        span
          color: #ff7800
          &:last-of-type
            font-size: .48rem
        &:last-of-type
          font-size: .2rem
          color: #a4a4a4
          margin-top: .05rem

</style>