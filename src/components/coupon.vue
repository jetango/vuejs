<template>
  <div class="coupon">
    <!-- <div class="coupon-item flex flex-item">
      <span class="flex-grow">不使用优惠券</span>
      <div class="chose-bg">
        <img src="~common/image/tueijian_icon_003.png">
      </div>
    </div> -->
    <div class="coupon-item flex flex-item" v-for="(item, index) in couponList" :key="item.couponEndDate" @click="choseCoupon(item)">
      <span v-if="index === 0" class="flex-grow">不使用优惠券</span>
      <div v-if="index !== 0" class="c-content flex-grow">
        <p><span>￥</span><span>{{item.couponPrice}}</span>优惠券</p>
        <p>{{item.couponEndDate}}日内有效</p>
      </div>
      <div class="chose-bg">
        <img v-show="item.isChose" src="~common/image/tueijian_icon_003.png">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        couponList: [
          {
            couponPrice: '0',
            isChose: true
          }, {
            couponPrice: 8,
            couponEndDate: '2018-06-23',
            isChose: false
          }, {
            couponPrice: 2,
            couponEndDate: '2018-06-25',
            isChose: false
          }, {
            couponPrice: 2,
            couponEndDate: '2018-06-28',
            isChose: false
          }
        ],
        choseItem: null
      }
    },
    methods: {
      choseCoupon: function(item) {
        let choseItem = item
        this.couponList.forEach(item => {
          if (item === choseItem) {
            item.isChose = true
            this.choseItem = item
          } else {
            item.isChose = false
          }
        })
      }
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