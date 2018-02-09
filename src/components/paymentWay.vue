<template>
  <div class="repayment-way">
    <div class="pay-amount">
      <span>本次支付金额：</span>
      <span v-html="payAmount + '元'"></span>
    </div>
    <div class="pay-way-list">
      <div class="list-item flex flex-item active" v-for="item in payWays" :key="item.name" @click="chosePayWay(item)">
        <div :class="item.className"></div>
        <p class="pay-title flex-grow">{{item.name}}</p>
        <div class="select-bg">
          <img v-show="item.isChose" src="~common/image/tueijian_icon_003.png">
        </div>
      </div>
    </div>
    <div class="button-box">
      <a class="button button-primary" @click="confirmPay">确认</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {alipay} from 'common/js/drivers'
  // import * as types from 'config/api-type'
  // import {unionpayPath} from 'common/js/constants'
  // import { Base64 } from 'js-base64'

  export default {
    data() {
      return {
        payAmount: '',
        payWays: [
          {
            className: 'pay-logo-ali',
            name: '支付宝',
            key: 'alipay',
            isChose: true
          }, {
            className: 'pay-logo-wechat',
            name: '微信',
            key: 'wechat',
            isChose: false
          }, {
            className: 'pay-logo-union',
            name: '银联',
            key: 'union',
            isChose: false
          }
        ],
        payKey: 'alipay',
        param: null,
        key: ''
      }
    },
    methods: {
      chosePayWay: function(item) {
        let {key} = item
        this.payKey = key
        this.payWays.forEach(item => {
          if (key === item.key) {
            item.isChose = true
          } else {
            item.isChose = false
          }
        })
      },
      confirmPay() {
        let param = this.param ? JSON.parse(this.param) : ''
        alipay({successUrl: 'EVALUATE_FLOW', title: '评估流程', key: this.key, param}, {
          success() {
          }
        })
      }
    },
    created() {
      let {data, amount, key} = this.$route.query
      this.payAmount = amount
      this.param = decodeURIComponent(data)
      this.key = key
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
    .pay-title
      padding-left: .2rem
    .select-bg
      width: .52rem
      height: .52rem
      background: url('~common/image/tueijian_icon_002.png') no-repeat
      background-size: 100% 100%
      img
        width: .52rem
        height: .52rem
    .pay-logo-ali
      width: .74rem
      height: .74rem
      background: url('~common/image/haunkuan_fangshi_icon_002.png') no-repeat
      background-size: 100% 100%
    .pay-logo-wechat
      width: .74rem
      height: .74rem
      background: url('~common/image/haunkuan_fangshi_icon_003.png') no-repeat
      background-size: 100% 100%
    .pay-logo-union
      width: .74rem
      height: .74rem
      background: url('~common/image/haunkuan_fangshi_icon_001.png') no-repeat
      background-size: 100% 100%

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

  .button
    margin: 0 auto
  .button-box
    padding: 1rem .4rem

</style>
