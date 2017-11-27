<template>
  <div class="repayment-way">
    <div class="pay-amount">
      <span>本次还款金额：</span>
      <span v-html="payAmount + '元'"></span>
    </div>
    <div class="pay-way-list">
      <div v-for="item in staticPayWay" :key="item.isChose" class="list-item flex flex-item active" @click="chosepayment(item)">
        <i class="iconfont" :class="item.iconClass"></i>
        <p class="flex-grow" v-html="item.payWayName"></p>
        <i :class="{'chosed': item.isChose}" class="iconfont icon-correct-marked"></i>
      </div>
    </div>
    <a class="button button-primary" @click="payLoan">确认还款</a>
  </div>
</template>

<script type="text/ecmascript-6">
  import {doPost, popup, unionPay, weChatPay, alipay} from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        payAmount: '',
        staticPayWay: [{
          iconClass: 'icon-house',
          payWayName: '微信支付',
          type: 'wechat',
          isChose: false
        }, {
          iconClass: 'icon-102',
          payWayName: '支付宝',
          type: 'alipay',
          isChose: false
        }, {
          iconClass: 'icon-161',
          payWayName: '银联',
          type: 'unionPay',
          isChose: false
        }],
        confirmPayWay: {}
      }
    },
    created: function() {
      let {payAmount, billNo} = this.$route.query
      this.payAmount = payAmount || 0
      this.billNo = billNo
      this.init()
    },
    methods: {
      init: function() {
        doPost(types.BANK_LIST, {}, {
          success: (oData) => {
            let payWayList = oData.data
            let len = payWayList.length - 1
            payWayList.reverse().forEach((element, index) => {
              let bankNumber = element.bankNumber
              this.staticPayWay.unshift({
                iconClass: 'icon-140',
                payWayName: element.bankName + '&nbsp;&nbsp;' + bankNumber.substring(bankNumber.length - 4, bankNumber.length),
                bankNumber: bankNumber,
                isChose: (index === len)
              })
            })
            this.confirmPayWay = this.staticPayWay[0]
          },
          error: (oData) => {
            popup(null, null, oData.msg || '获取数据失败，请稍后再试！')
          }
        })
      },
      payLoan: function() {
        let {type, bankNumber} = this.confirmPayWay
        let {payAmount, billNo} = this.$route.query
        if (type === 'wechat') {
          weChatPay({payAmount, billNo}, {
            success: function(oData) {

            },
            error: function(oData) {

            }
          })
        } else if (type === 'alipay') {
          alipay({payAmount, billNo}, {
            success: function(oData) {
            },
            error: function(oData) {

            }
          })
        } else if (type === 'unionPay') {
          unionPay({payAmount, billNo}, {
            success: function(oData) {

            },
            error: function(oData) {

            }
          })
        } else if (bankNumber) {
          // 直接代扣
          doPost()
        }
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

  .button
    width:90%
    margin: 0 auto
    margin-top: 1.5rem

</style>
