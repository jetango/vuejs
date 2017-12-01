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
    <div class="button-box">
      <a class="button button-primary" @click="payLoan">确认还款</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {doPost, popup, weChatPay, alipay, navigate} from 'common/js/drivers'
  import * as types from 'config/api-type'
  import {unionpayPath} from 'common/js/constants'
  import { Base64 } from 'js-base64'

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
              let bankAccount = element.bankAccount
              this.staticPayWay.unshift({
                iconClass: 'icon-140',
                payWayName: element.bankName + '&nbsp;&nbsp;' + bankAccount.substring(bankAccount.length - 4, bankAccount.length),
                bankAccount: bankAccount,
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
        let {type, bankAccount} = this.confirmPayWay
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
          let {payAmount, billNo, orderNo, userId} = this.$route.query
          let param = `orderNo=${orderNo}&userId=${userId}&billNo=${billNo}&payAmount=${payAmount}`
          let url = `${unionpayPath}?${Base64.encode(param)}`
          navigate('UNIONPAY', '中国银联', {url: url, param: '', type: 'TARGET'}, null)
        } else if (bankAccount) {
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
    margin: 0 auto
  .button-box
    padding: 1rem .4rem

</style>
