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
      <div class="flex flex-item flex-grow">
        <div class="loan-info-item item-bank flex flex-item flex-grow active">
          <span>到账账户:</span>
          <span @click="choseBankCard" class="flex-grow bank-none" v-if="!bankCard.flag">请选择到账银行卡</span>
          <span @click="choseBankCard" v-html="bankCard.bankName+'&nbsp;&nbsp;'+bankCard.accountNumber.substring(bankCard.accountNumber.length-4,bankCard.accountNumber.length)" class="flex-grow" v-if="bankCard.flag"></span>
        </div>
        <img class="icon-back" src="~common/image/ICON_Communal_sanjiao_2x_001.png">
      </div>
      <!-- <div class="loan-info-item flex flex-item active">
        <span>手机号:</span>
        <span class="phone-item">15959369312</span>
      </div>
      <div class="loan-info-item input-validate flex flex-item">
        <span>手机号:</span>
        <span></span>
        <input type="text" placeholder="请输入验证码">
        <div>获取验证码</div>
      </div> -->
    </div>
    <p class="comfirm-protocol flex flex-item flex-justify">
      <i @click="comfirm" :class="['icon', 'iconfont', 'icon-correct-marked', {'icon-not-chose': isChosed}]"></i>
      <span>我已阅读并同意<span>《用户服务协议》</span></span>
    </p>
    <a class="btn" @click="submit">借款</a>
    <p class="forbid-borrow-stu">禁止学生借款</p>
  </div>
</template>
<script type="text/ecmascript-6">
  import buttonItem from 'base/button/button-item'
  import {
    doPost
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        loanInfo: {
          loanAmount: '',
          borrowingTime: '',
          interest: '',
          syntheticalFee: '',
          realLoanAmount: '',
          repayTotalAmount: '',
          bankAccount: []
        },
        bankCard: {
          bankName: '',
          accountNumber: '',
          flag: false
        },
        isChosed: false
      }
    },
    created: function() {
      let param = {
        userId: '123456',
        financeProductId: '1681688',
        loanAmount: '1000',
        borrowingTime: '7'
      }
      if (sessionStorage.getItem('payCard')) { // 已经选择过到账账户
        let payCard = JSON.parse(sessionStorage.getItem('payCard'))
        this.bankCard = payCard
        this.bankCard.flag = true
      }
      doPost(types.BORROW, param, {
        success: (oData) => {
          this.loanInfo = oData.data
          if (oData.data.bankList.length !== 0 && !sessionStorage.getItem('payCard')) { // 刚进入页面的时候，请求接口拿到数据，获取用户到账账户，默认显示
            let payCard = oData.data.bankList[0]
            this.bankCard = payCard
            this.bankCard.flag = true
          }
        }
      })
    },
    methods: {
      comfirm: function() {
        this.isChosed = !this.isChosed
      },
      submit: function() {
        let self = this
        if (this.isChosed) {
          alert('请同意用户服务协议')
          return
        }
        let param = this.$data.loanInfo
        doPost(types.BORROW_CONFIRM, param, {
          success: (oData) => {
            self.message = oData.msg
            if (oData.status === 0) {
              this.$router.push('loan-result')
            }
          }
        })
      },
      choseBankCard: function() {
        this.$router.push('bank-list')
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
    
  .loan-info-item
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
        text-align: right
        margin-right: .1rem

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
    margin-top: .15rem
    text-align: center

  .icon-not-chose
    color: lightgrey !important

  .icon-back
    width: .12rem
    height: .2rem
    margin-right: .4rem

  .bank-none
    color: #008aff !important

  .phone-item
    font-size: .28rem !important
    color: #525252 !important

  .input-validate
    input 
      width: 2.4rem
      border-radius: .06rem
      height: .76rem
      background-color: #eeeff3
      padding-left: .2rem
      outline: none
    div
      margin-right: .35rem
      width: 1.76rem
      background-color: #89cd40
      height: .76rem
      border-radius: .06rem
      text-align: center
      line-height .76rem
      margin-left: .1rem
      color: #fff

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
    color: #aeaeae
  } 
  input:-moz-placeholder, textarea:-moz-placeholder { 
    color: #aeaeae
  } 
  input::-moz-placeholder, textarea::-moz-placeholder { 
    color: #aeaeae
  } 
  input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
    color: #aeaeae
  } 

</style>
