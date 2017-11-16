<template>
  <div class="repayment-way">
    <div class="pay-amount">
      <span>本次还款金额:</span>
      <span v-html="payAmount + '元'"></span>
    </div>
    <div class="pay-way-list">
      <div v-for="item in staticPayWay" :key="item.isChose" class="list-item flex flex-item active">
        <i class="iconfont" :class="item.iconClass"></i>
        <p class="flex-grow" v-html="item.payWayName"></p>
        <i @click="chosepayment(item)" :class="['icon', 'iconfont', 'icon-correct-marked', {'chosed': item.isChose} ]"></i>
      </div>
    </div>
    <a class="btn" @click="payLoan">确认还款</a>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        payAmount: '800',
        staticPayWay: [{
          iconClass: 'icon-140',
          payWayName: '借款账户招商银行尾号2563',
          isChose: true
        }, {
          iconClass: 'icon-house',
          payWayName: '微信支付',
          isChose: false
        }, {
          iconClass: 'icon-102',
          payWayName: '支付宝',
          isChose: false
        }, {
          iconClass: 'icon-161',
          payWayName: '银联',
          isChose: false
        }],
        confirmPayWay: {
          payWayName: '借款账户招商银行尾号2563',
          isChose: true
        }
      }
    },
    methods: {
      payLoan: function() {
        console.log(JSON.stringify(this.confirmPayWay))
      },
      chosepayment: function(res) {
        this.staticPayWay.forEach(element => {
          if (res.payWayName === element.payWayName) {
            element.isChose = true
            this.confirmPayWay = element
          } else {
            element.isChose = false
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  

  .pay-amount
    height: 1rem
    line-height: 1rem
    padding-left: .4rem

  .pay-way-list
    background-color: #fff

  .list-item
    height: 1rem
    padding: 0 .4rem
    i
      margin-top: -.1rem
      &:first-of-type
        margin-right: .15rem
        font-size: .6rem 

      &:last-of-type
        color: lightgrey
        font-size: .4rem
    p
      font-size: .28rem
      color: #000000

  .chosed
    color: green !important

  .btn
    display:block
    width:90%
    margin: 0 auto
    margin-top: 1.5rem
    background-color: RGB(254,167,0)
    height: .72rem
    border-radius: .06rem
    text-align: center
    line-height: .72rem
    font-size: .3rem
    color: #fff

</style>