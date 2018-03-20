<template>
  <div class="repayment-way">
    <div class="pay-amount">
      <span>本次支付金额：</span>
      <span v-html="payAmount + '元'"></span>
    </div>
    <div class="pay-way-list">
      <div class="list-item flex flex-item active" v-for="item in payWays" :key="item.name" @click="chosePayWay(item)">
        <div class="app-bg" :class="item.className"></div>
        <p class="pay-title flex-grow">{{item.name}}</p>
        <div class="select-bg">
          <img v-show="item.isChose" src="~common/image/tueijian_icon_003.png">
        </div>
      </div>
    </div>
    <div class="button-box">
      <a class="button button-primary" @click="confirmPay">确认</a>
    </div>
    <form method="post" action="https://wap.lianlianpay.com/authpay.htm">
      <input type="hidden" name="req_data" value=''>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
  import {alipay, weChatPay, navigate, eeLogUBT, doPost, log, popup} from 'common/js/drivers'
  // import * as types from 'config/api-type'
  import {pageIdentity} from 'common/js/constants'
  // import { Base64 } from 'js-base64'
  import * as types from 'config/api-type'

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
            className: 'lianlian-bg',
            name: '连连支付',
            key: 'lianlian',
            isChose: false
          }, {
            className: 'helibao-bg',
            name: '合利宝快捷支付',
            key: 'helibao',
            isChose: false
          }
          // , {
          //   className: 'pay-logo-union',
          //   name: '银联',
          //   key: 'union',
          //   isChose: false
          // }
        ],
        payKey: 'alipay',
        param: null,
        key: '',
        lianlianRequestData: ''
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
        let {amount, flag, type, loanAmount, borrowPeriods} = param
        if (this.key === 'EVALUATE_INFO') {
          eeLogUBT('AssessmentPayPage.Action.Pay', 'click', {payType: this.payKey})
          if (this.payKey === 'alipay') {
            alipay({successUrl: 'EVALUATE_FLOW', title: '评估流程', key: this.key, param}, {
              success() {
              }
            })
          } else if (this.payKey === 'wechat') {
            weChatPay({successUrl: 'EVALUATE_FLOW', title: '评估流程', key: this.key, param}, {
              success() {
              }
            })
          } else if (this.payKey === 'helibao') {
            let para = `amount=${amount}&flag=${flag}`
            if (type && type !== '') {
              para += '&type=' + type
            }
            if (loanAmount && loanAmount !== '') {
              para += '&loanAmount=' + loanAmount
            }
            if (borrowPeriods && borrowPeriods !== '') {
              para += '&borrowPeriods=' + borrowPeriods
            }
            navigate('HELIBAO_PAY', '合利宝快捷支付', {url: pageIdentity.HELIBAO_PAY, param: para}, null)
          } else if (this.payKey === 'lianlian') {
            let urlParam = `amount=${amount}&flag=${flag}`
            if (type && type !== '') {
              urlParam += '&type=' + type
            }
            if (loanAmount && loanAmount !== '') {
              urlParam += '&loanAmount=' + loanAmount
            }
            if (borrowPeriods && borrowPeriods !== '') {
              urlParam += '&borrowPeriods=' + borrowPeriods
            }
            let para = {
              subject: '连连支付',
              flag: flag,
              amount: amount,
              loanAmount: loanAmount,
              borrowPeriods: borrowPeriods,
              type: type,
              urlParam: urlParam
            }
            doPost(types.WAP_PAY, para, {
              success: (oData) => {
                let formEl = document.getElementsByTagName('form')[0]
                formEl.getElementsByTagName('input')[0].value = oData.data
                formEl.submit()
              },
              error: (oData) => {
                log('', oData)
                popup('', '', oData.msg || '支付提交失败')
              }
            })
          }
        } else if (this.key === 'AUDIT_INFO') {
          eeLogUBT('RecommendPayPage.Action.Pay', 'click', {payType: this.payKey})
          if (this.payKey === 'alipay') {
            alipay({successUrl: 'AUDIT_FLOW', title: '审核流程', key: this.key, param}, {
              success() {
              }
            })
          } else if (this.payKey === 'wechat') {
            weChatPay({successUrl: 'AUDIT_FLOW', title: '审核流程', key: this.key, param}, {
              success() {
              }
            })
          } else if (this.payKey === 'helibao') {
            let para = `amount=${amount}&flag=${flag}`
            if (type && type !== '') {
              para += '&type=' + type
            }
            if (loanAmount && loanAmount !== '') {
              para += '&loanAmount=' + loanAmount
            }
            if (borrowPeriods && borrowPeriods !== '') {
              para += '&borrowPeriods=' + borrowPeriods
            }
            navigate('HELIBAO_PAY', '合利宝快捷支付', {url: pageIdentity.HELIBAO_PAY, param: para}, null)
          } else if (this.payKey === 'lianlian') {
            let urlParam = `amount=${amount}&flag=${flag}`
            if (type && type !== '') {
              urlParam += '&type=' + type
            }
            if (loanAmount && loanAmount !== '') {
              urlParam += '&loanAmount=' + loanAmount
            }
            if (borrowPeriods && borrowPeriods !== '') {
              urlParam += '&borrowPeriods=' + borrowPeriods
            }
            let para = {
              subject: '连连支付',
              flag: flag,
              amount: amount,
              loanAmount: loanAmount,
              borrowPeriods: borrowPeriods,
              type: type,
              urlParam: urlParam
            }
            doPost(types.WAP_PAY, para, {
              success: (oData) => {
                let formEl = document.getElementsByTagName('form')[0]
                formEl.getElementsByTagName('input')[0].value = oData.data
                formEl.submit()
              },
              error: (oData) => {
                log('', oData)
                popup('', '', oData.msg || '支付提交失败')
              }
            })
          }
        }
        // let para = {
        //   subject: '连连支付',
        //   flag: 1,
        //   amount: 0.01,
        //   loanAmount: 2000,
        //   borrowPeriods: 3,
        //   type: 2
        // }
        // doPost(types.WAP_PAY, para, {
        //   success: (oData) => {
        //     document.getElementsByTagName('form')[0].getElementsByTagName('input')[0].value = oData.data
        //     console.log(oData.data)
        //     document.getElementsByTagName('form')[0].submit()
        //   },
        //   error: (oData) => {
        //     log('', oData)
        //     popup('', '', oData.msg || '支付提交失败')
        //   }
        // })
      }
    },
    created() {
      let {data, amount, key} = this.$route.query
      this.payAmount = amount
      this.param = decodeURIComponent(data)
      this.key = key
      if (key === 'AUDIT_INFO') {
        eeLogUBT('RecommendPayPage.Load.Goin', 'goin')
      } else if (key === 'EVALUATE_INFO') {
        eeLogUBT('AssessmentPayPage.Load.Goin', 'goin')
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
      background: url('~common/image/haunkuan_fangshi_icon_002.png') no-repeat
      background-size: 100% 100%
    .pay-logo-wechat
      background: url('~common/image/haunkuan_fangshi_icon_003.png') no-repeat
      background-size: 100% 100%
    .pay-logo-union
      background: url('~common/image/haunkuan_fangshi_icon_001.png') no-repeat
      background-size: 100% 100%
    .lianlian-bg
      background: url('~common/image/lianlian_icon.png') no-repeat
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
