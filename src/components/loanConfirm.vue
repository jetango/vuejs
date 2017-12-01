<template>
  <div class="loan-comforim">
    <div class="loan-info">
      <div class="loan-info-item flex flex-item active">
        <span>借款金额：</span>
        <span v-text="loanInfo.loanAmount + '元'"></span>
      </div>
      <div class="loan-info-item flex flex-item">
        <span>借款时间：</span>
        <span v-text="loanInfo.borrowTime + '天'"></span>
      </div>
    </div>
    <div class="loan-info">
      <div class="loan-info-item item-middle flex flex-item active">
        <span>利息：</span>
        <span v-text="loanInfo.interest + '元'"></span>
      </div>
      <div class="loan-info-item item-middle flex flex-item active">
        <span>综合费用：</span>
        <span v-text="loanInfo.syntheticalFee + '元'"></span>
      </div>
      <div class="loan-info-item item-middle flex flex-item active">
        <span>到账金额：</span>
        <span v-text="loanInfo.realLoanAmount + '元'"></span>
      </div>
      <div class="loan-info-item item-middle flex flex-item">
        <span>应还金额：</span>
        <span v-text="loanInfo.repayTotalAmount + '元'"></span>
        <a class="flex flex-item flex-grow" @click="seeDetail">
          查看明细
          <i class="icon iconfont icon-117"></i>
        </a>
      </div>
    </div>
    <div class="loan-info">
      <div class="flex flex-item flex-grow">
        <div class="loan-info-item item-bank flex flex-item flex-grow" @click="choseBankCard">
          <span>到账账户：</span>
          <span class="flex-grow bank-none" v-if="!bankCard.flag">请选择到账银行卡</span>
          <span v-html="bankCard.bankName+'&nbsp;&nbsp;'+bankCard.bankAccount.substring(bankCard.bankAccount.length-4,bankCard.bankAccount.length)" class="flex-grow" v-if="bankCard.flag"></span>
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
      <i @click="agreeProtocols" :class="{'icon-not-chose': isChosed}" class="iconfont icon-correct-marked"></i>
      <span>我已阅读并同意<span @click="checkServicesProtocols">《用户服务协议》</span></span>
    </p>
    <a class="button button-primary" @click="submit">借款</a>
    <p class="forbid-borrow-stu">禁止学生借款</p>
    <alert-item v-if="checkDetailFlag" :loanDetail="loanInfo" v-on:listenChildEvent="closeAlert"></alert-item>
  </div>
</template>
<script type="text/ecmascript-6">
  import AlertItem from 'base/alertItem/alert-item'
  import {doPost, popup, navigate} from 'common/js/drivers'
  import * as types from 'config/api-type'
  import {pageIdentity} from 'common/js/constants'
  export default {
    data() {
      return {
        loanInfo: {
          loanAmount: '',
          borrowTime: '',
          interest: '',
          syntheticalFee: '',
          realLoanAmount: '',
          repayTotalAmount: '',
          annualizedRate: '',
          bankList: []
        },
        bankCard: {
          bankName: '',
          bankAccount: '',
          flag: false
        },
        isChosed: false,
        checkDetailFlag: false,
        params: {}
      }
    },
    created: function() {
      let {productCode, loanAmount, borrowTime} = this.$route.query
      this.params = {productCode, loanAmount, borrowTime}
    },
    mounted() {
      this.init()
    },
    methods: {
      init: function() {
        let {bankName, bankAccount} = this.$route.query
        if (bankName || bankAccount) { // 已经选择过到账账户
          this.bankCard = {
            bankName: bankName,
            bankAccount: bankAccount,
            flag: true
          }
        }
        doPost(types.BORROW, this.params, {
          success: (oData) => {
            this.loanInfo = oData.data
            if (oData.data.bankList.length !== 0 && !bankName && !bankAccount) { // 刚进入页面的时候，请求接口拿到数据，获取用户到账账户，默认显示
              let payCard = oData.data.bankList[0]
              this.bankCard = payCard
              this.bankCard.flag = true
            }
          },
          error: (oData) => {
            popup(null, null, oData.msg || '信息获取失败，请稍后再试！')
          }
        })
      },
      agreeProtocols: function() {
        this.isChosed = !this.isChosed
      },
      submit: function() {
        let self = this
        if (this.isChosed) {
          popup(null, null, '请同意用户服务协议')
          return
        }
        if (!self.bankCard.bankAccount) {
          popup(null, null, '请选择银行卡')
          return
        }
        let param = this.loanInfo
        let {
          productCode
        } = this.params
        param.productCode = productCode
        param.bankName = self.bankCard.bankName
        param.bankAccount = self.bankCard.bankAccount
        param.mobile = self.$route.query.mobile
        doPost(types.BORROW_CONFIRM, param, {
          success: (oData) => {
            let param = `orderNo=${oData.data.orderNo}`
            navigate('LOAN_RESULT', '借款结果', {url: pageIdentity.LOAN_RESULT, param}, null, 'ROOT')
          },
          error: (oData) => {
            popup(null, null, oData.msg || '提交失败，请稍后再试')
          }
        })
      },
      choseBankCard: function() {
        let self = this
        navigate('CHOOSE_BANK', '选择银行卡', {url: pageIdentity.CHOOSE_BANK}, {
          success: function(oData) {
            if (oData.status === '0') {
              let {bankName, bankAccount} = oData.data
              self.bankCard = {
                bankName: bankName,
                bankAccount: bankAccount,
                flag: true
              }
            }
          },
          error: function(oData) {
            popup(null, null, oData.msg || '请正确选择银行卡')
          }
        })
      },
      seeDetail: function() {
        setTimeout(() => {
          this.checkDetailFlag = true
        }, 100)
      },
      closeAlert: function(isOpen) {
        this.checkDetailFlag = isOpen
      },
      checkServicesProtocols: function() {
        navigate('SERVICES_PROTOCOLS', '用户服务协议', {url: pageIdentity.SERVICES_PROTOCOLS})
      }
    },
    components: {
      AlertItem
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"

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
    position: relative
    span
      &:last-of-type
        color: #525252
        font-size: .28rem
    a
      position: absolute
      right: .4rem
      height: .72rem
      color: #0079ff !important
      top: 0
      i
        color: #0079ff
        font-size: .25rem
        margin-top: -.03rem


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
      margin-top: -0.04rem
      margin-right: 0.05rem
    span
      span
        color: #008aff

  .button
    width:90%
    margin: 0 auto
    margin-top: .2rem

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
