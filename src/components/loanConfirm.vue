<template>
  <div class="loan-comforim">
    <div class="loan-info">
      <div class="loan-info-item flex flex-item active">
        <span>贷款金额:</span>
        <span v-html="loanInfo.loanAmount + '元'"></span>
      </div>
      <div class="loan-info-item flex flex-item">
        <span>贷款时间:</span>
        <span v-html="loanInfo.borrowingTime + '天'"></span>
      </div>
    </div>
    <div class="loan-info">
      <div class="loan-info-item item-middle flex flex-item active">
        <span>利息:</span>
        <span v-html="loanInfo.interest + '元'"></span>
      </div>
      <div class="loan-info-item item-middle flex flex-item active">
        <span>综合费用:</span>
        <span v-html="loanInfo.syntheticalFee + '元'"></span>
      </div>
      <div class="loan-info-item item-middle flex flex-item active">
        <span>到账金额:</span>
        <span v-html="loanInfo.realLoanAmount + '元'"></span>
      </div>
      <div class="loan-info-item item-middle flex flex-item">
        <span>应还金额:</span>
        <span v-html="loanInfo.repayTotalAmount + '元'"></span>
      </div>
    </div>
    <div class="loan-info">
      <div class="loan-info-item item-bank flex flex-item active">
        <span>到账账户:</span>
        <span v-html="loanInfo.bankName + '&nbsp;&nbsp;' + loanInfo.accountNumber.substr(loanInfo.accountNumber.length-4,loanInfo.accountNumber.length)"></span>
      </div>
    </div>
    <p class="comfirm-protocol flex flex-item flex-justify">
      <i @click="comfirm" :class="['icon', 'iconfont', 'icon-correct-marked', {'icon-not-chose': isChosed}]"></i>
      <span>我已阅读并同意<span>《用户服务协议》</span></span>
    </p>
    <a class="btn" @click="submit">借款</a>
    <p class="forbid-borrow-stu">禁止学生借款</p>
    <p style="color: red">{{message}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  import buttonItem from 'base/button/button-item'
  import {doPost} from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        loanInfo: {
          loanAmount: '100',
          borrowingTime: '7',
          interest: '1',
          syntheticalFee: '100',
          realLoanAmount: '900',
          repayTotalAmount: '1200',
          bankName: '工商银行',
          accountNumber: '6228000666688889742'
        },
        buttonValue: '借款',
        isChosed: false,
        message: ''
      }
    },
    methods: {
      comfirm: function() {
        this.$data.isChosed = !this.$data.isChosed
      },
      submit: function() {
        let self = this
        let param = this.$data.loanInfo
        doPost(types.BORROW_CONFIRM, param, {
          success: (oData) => {
            console.log('oData', oData)
            console.log(oData)
            self.message = oData.msg
          }
        })
      }
    },
    components: {
      buttonItem
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  @import "~common/stylus/mixin"

  .loan-comforim
    margin-bottom: .3rem
  .loan-info
    background-color: #fff
    margin-top: .1rem
  .loan-info-item,.input-validate-code
    height: 1rem
    font-size: .28rem
    padding-left: .4rem
    span
      color: #525252
      &:last-of-type
        color: #000
        font-size: .3rem
        margin-left: .24rem
  .item-middle
    height: .72rem
    span
      &:last-of-type
        color: #525252
        font-size: .28rem
  .item-bank
    span
      &:last-of-type
        color: #525252
        font-size: .28rem
  .input-validate-code
    background-color: #fff
    margin-top: .1rem
    span
      &:last-of-type
        color: #525252
        margin-left: 0
    input
      width: 2.56rem
      height: .76rem
      padding-left: .1rem
      border-radius: .06rem
      background-color: #eeeff3

  .comfirm-protocol
    font-size: .2rem
    margin-top: .2rem
    margin-bottom: .6rem
    i
      color: green
      font-size: .22rem
      margin-top: -0.02rem
      margin-right: 0.05rem
    span
      span
        color: #008aff
  .btn
    display:block
    width:90%
    margin: 0 auto
    margin-top: .2rem
    background-color: RGB(254,167,0)
    height: .72rem
    border-radius: .06rem
    text-align: center
    line-height: .72rem
    font-size: .3rem
    color: #fff

  .forbid-borrow-stu
    color: #9d9d9d
    font-size: .22rem
    margin-top: .1rem

  .icon-not-chose
    color: lightgrey !important

</style>
