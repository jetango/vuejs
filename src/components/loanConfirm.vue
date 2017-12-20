<template>
  <div class="loan-comforim">
    <div class="loan-info">
      <div class="loan-info-item flex flex-item active focus" @click="loanAmountClicked()">
        <span>借款金额：</span>
        <span class="flex-grow">{{loanInfo.loanAmount || 0}}元</span>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="loan-info-item flex flex-item active focus" @click="loanDayClicked()">
        <span>借款时间：</span>
        <span class="flex-grow">{{loanInfo.borrowTime || 0}}天</span>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="loan-info-item flex flex-item active focus" @click="loanPurposeClicked()">
        <span>借款用途：</span>
        <span class="flex-grow">{{loanInfo.loanPurpose}}</span>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="loan-info-item flex flex-item active hidden">
        <span>优惠券：</span>
        <span class="flex-grow gray-text">无可抵用券</span>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="loan-info-item item-bank flex flex-item flex-grow active focus" @click="choseBankCard()">
        <span>到账账户：</span>
        <span class="flex-grow bank-none" v-if="!bankCard.flag">请选择到账银行卡</span>
        <span v-html="bankCard.bankName+'&nbsp;&nbsp;'+bankCard.bankAccount.substring(bankCard.bankAccount.length-4,bankCard.bankAccount.length)" class="flex-grow" v-if="bankCard.flag"></span>
        <i class="icon iconfont icon-117"></i>
      </div>
      <div class="loan-info-item flex flex-item active focus" @click="chooseVip()">
        <span>会员：</span>
        <span class="flex-grow">{{loanInfo.expireTime ? '到期' + loanInfo.expireTime : (vipData.type ? '' : '请选择')}}<span class="selected-vip">{{vipData.type ? '已选择' + vipData.typeDescribe : ''}}</span></span>
        <i class="iconfont icon-117"></i>
      </div>
      <!-- <div class="loan-info-item flex flex-item">
        <span>验证码：</span>
        <span class="flex-grow"><input class="identify-code-input"  v-model="loanInfo.msgCode" type="tel" placeholder="短信验证码" maxlength="6"></span>
        <div v-if="!isSend" class="identify-code-btn" @click="sendValidateCode()">发送验证码</div>
        <div v-if="isSend" class="identify-code-btn">{{delayTime}}s重新获取</div>
      </div> -->
    </div>
    <div class="loan-info">
      <div class="loan-info-item item-middle flex flex-item active">
        <span>利息：</span>
        <span>{{loanInfo.interest || 0}}元</span>
      </div>
      <div class="loan-info-item item-middle flex flex-item">
        <span>应还金额：</span>
        <span>{{loanInfo.repayTotalAmount || 0}}元</span>
        <a class="flex flex-item flex-grow" @click="seeDetail()">
          查看明细
          <i class="icon iconfont icon-117"></i>
        </a>
      </div>
    </div>
    <p class="comfirm-protocol flex flex-item flex-justify">
      <span @click="agreeProtocols" class="text-gary">
        <i :class="{'icon-not-chose': isChosed}" class="iconfont icon-correct-marked"></i>我已阅读并同意
        <span @click.stop="checkServicesProtocols">《用户服务协议》</span>
      </span>
    </p>
    <p class="forbid-borrow-stu">禁止学生借款</p>
    <a class="button button-primary" @click="submit(null)">借款</a>
    <alert-item v-if="checkDetailFlag" :loanDetail="loanInfo" v-on:listenChildEvent="closeAlert"></alert-item>
    <captcha v-if="captchaShow" v-on:listenChildEvent="closeCaptcha"></captcha>
  </div>
</template>
<script type="text/ecmascript-6">
  import AlertItem from 'base/alertItem/alert-item'
  import Captcha from 'base/captcha/captcha'
  import {doPost, popup, navigate, eeLogUBT, toast, log} from 'common/js/drivers'
  import * as types from 'config/api-type'
  import {pageIdentity, loanPurposeStatus} from 'common/js/constants'
  import Picker from 'better-picker'

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
          bankList: [],
          loanPurpose: '',
          memberExpireDay: '',
          expireTime: '',
          mobile: '',
          productCode: '',
          msgCode: '',
          p2pId: ''
        },
        bankCard: {
          bankName: '',
          bankAccount: '',
          flag: false
        },
        amountList: [],
        dayList: [],
        isChosed: false,
        checkDetailFlag: false,
        params: {},
        isSend: false,
        delayTime: 0,
        vipData: {},
        captchaShow: false
      }
    },
    created: function() {
      let {productCode, mobile} = this.$route.query
      this.params = {productCode, mobile}
      this.loanInfo.productCode = productCode
      this.loanInfo.mobile = mobile
    },
    mounted() {
      this.init()
      this._initLoanPurpose()
      eeLogUBT('LoanPage.Load.Goin', 'goin')
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
            let {dayList, amountList, interestRate, memberExpireDay, expireTime} = oData.data
            this.dayList = dayList
            this.amountList = amountList
            this._initDayPicker()
            this._initAmountPicker()
            this.loanInfo.borrowTime = dayList[0].value
            this.loanInfo.loanAmount = amountList[0].value
            this.loanInfo.interestRate = interestRate // 日利率
            this.loanInfo.memberExpireDay = memberExpireDay // 过期天数
            this.loanInfo.expireTime = expireTime // 过期时间
            this._resetData()
            // this.loanInfo = oData.data
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
      sendValidateCode() {
        let {mobile} = this.loanInfo
        if (!/^1\d{10}$/.test(mobile)) {
          popup('', null, '请输入手机号码！')
          return
        }
        doPost(types.SMSCODE, {
          mobile: mobile,
          smsType: '1'
        }, {
          success: (oData) => {
            toast('验证码已发送，请注意查收！')
            this.isSend = true
            this.delayTime = 59
            let timer = setInterval(() => {
              if (this.delayTime === 1) {
                this.isSend = false
                this.delayTime = 0
                clearInterval(timer)
              }
              this.delayTime--
            }, 1000)
          },
          error: (oData) => {
            popup(null, null, oData.msg || '校验码发送失败，请稍后再试！')
          }
        })
      },
      agreeProtocols: function() {
        this.isChosed = !this.isChosed
      },
      closeCaptcha(oData) {
        this.loanInfo.msgCode = oData.code
        if (!this.loanInfo.msgCode) {
          popup(null, null, '请输入验证码！')
          return
        }
        this.captchaShow = false
        this.submit(true)
      },
      submit: function(p2pSendFlag) {
        let self = this
        if (this.isChosed) {
          popup(null, null, '请同意用户服务协议！')
          return
        }
        if (!this.loanInfo.loanPurpose) {
          popup(null, null, '请选择借款用途！')
          return
        }
        if (!self.bankCard.bankAccount) {
          popup(null, null, '请选择银行卡！')
          return
        }
        if (!this.loanInfo.memberExpireDay) {
          if (!this.vipData.type) {
            popup(null, null, '请购买会员！')
            return
          }
          if (Number(this.vipData.effectTime) < Number(this.loanInfo.borrowTime)) {
            popup(null, null, '您的会员即将到期，为保证您的会员权益请续费！')
            return
          }
        } else {
          if (!this.vipData.type) {
            if (Number(this.loanInfo.memberExpireDay) < Number(this.loanInfo.borrowTime)) {
              popup(null, null, '您的会员即将到期，为保证您的会员权益请续费！')
              return
            }
          } else {
            if ((Number(this.loanInfo.memberExpireDay) + Number(this.vipData.effectTime)) < Number(this.loanInfo.borrowTime)) {
              popup(null, null, '您的会员即将到期，为保证您的会员权益请续费！')
              return
            }
          }
        }

        let {borrowTime, interest, loanPurpose, mobile, productCode, msgCode, loanAmount, annualizedRate, realLoanAmount, repayTotalAmount, p2pId} = this.loanInfo
        let {bankName, bankAccount} = this.bankCard
        let {type, discountFee} = this.vipData
        eeLogUBT('LoanPage.Action.Submit', 'click')
        let param = {borrowTime, interest, loanPurpose, mobile, productCode, loanAmount, annualizedRate, realLoanAmount, repayTotalAmount, bankName, bankAccount, type, memberFee: discountFee}
        if (p2pSendFlag) {
          param.msgCode = msgCode
        }
        if (p2pId) {
          param.p2pId = p2pId
        }
        if (!this.confirmLoading) {
          this.confirmLoading = true
        } else {
          return
        }
        doPost(types.BORROW_CONFIRM, param, {
          success: (oData) => {
            self.confirmLoading = false
            if (oData.data.p2pSendFlag) {
              self.captchaShow = true
              this.loanInfo.p2pId = oData.data.p2pId
            } else {
              self.captchaShow = false
              let param = `orderNo=${oData.data.orderNo}`
              navigate('LOAN_RESULT', '借款结果', {url: pageIdentity.LOAN_RESULT, param}, null, 'ROOT')
            }
          },
          error: (oData) => {
            self.confirmLoading = false
            popup(null, null, oData.msg || '提交失败，请稍后再试')
          }
        })
      },
      choseBankCard: function() {
        let self = this
        eeLogUBT('LoanPage.Action.BankCard', 'click')
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
        eeLogUBT('LoanPage.Action.Alert.Detail', 'click')
        setTimeout(() => {
          this.checkDetailFlag = true
        }, 100)
      },
      closeAlert: function(isOpen) {
        this.checkDetailFlag = isOpen
      },
      checkServicesProtocols: function() {
        eeLogUBT('LoanPage.Action.Agreement', 'click')
        navigate('SERVICES_PROTOCOLS', '用户服务协议', {url: pageIdentity.SERVICES_PROTOCOLS})
      },
      loanPurposeClicked() {
        this.loanPurposePicker.show()
      },
      loanDayClicked() {
        this.dayPicker && this.dayPicker.show()
      },
      loanAmountClicked() {
        this.amountPicker && this.amountPicker.show()
      },
      chooseVip() {
        let self = this
        navigate('VIP', '会员', {url: pageIdentity.VIP}, {
          success(oData) {
            log('', JSON.stringify(oData))
            let {type, discountFee, effectTime, typeDescribe} = oData.data
            console.log(type, discountFee, effectTime, typeDescribe)
            self.vipData = oData.data
          },
          error(oData) {
            popup(null, null, oData.msg || '会员选择失败，请稍后再试！')
          }
        })
      },
      _initLoanPurpose() {
        this.loanPurposePicker = new Picker({
          'data': [loanPurposeStatus],
          'selectedIndex': [0]
        })
        this.loanPurposePicker.on('picker.select', (val, index) => {
          this.loanInfo.loanPurpose = val[0]
        })
      },
      _initDayPicker() {
        let self = this
        this.dayPicker = new Picker({
          'data': [self.dayList],
          'selectedIndex': [0]
        })
        this.dayPicker.on('picker.select', (val, index) => {
          this.loanInfo.borrowTime = val[0]
          this._resetData()
        })
      },
      _initAmountPicker() {
        let self = this
        this.amountPicker = new Picker({
          'data': [self.amountList],
          'selectedIndex': [0]
        })
        this.amountPicker.on('picker.select', (val, index) => {
          this.loanInfo.loanAmount = val[0]
          this._resetData()
        })
      },
      _resetData() {
        let {loanAmount, borrowTime, interestRate} = this.loanInfo
        this.loanInfo.interest = (interestRate * 1000000 * borrowTime * loanAmount) / 100000000
        this.loanInfo.annualizedRate = `${interestRate * 360}`
        this.loanInfo.repayTotalAmount = Number(loanAmount) + Number(this.loanInfo.interest)
      }
    },
    components: {
      AlertItem,
      Captcha
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
    padding-right: .4rem
    &.focus
      &:active
        background: #e1e1e1
    span
      color: #525252
      &:last-of-type
        font-size: .28rem
        margin-left: .24rem
    .identify-code-btn
      color: #0079ff !important
      text-align: center
    .identify-code-input
      width: 100%
      outline: none
    .gray-text
      font-size: .2rem!important
      color: #939393!important

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
        --font-size: .25rem
        margin-top: -.03rem
  .item-bank
    span
      &:last-of-type
        color: #525252
        font-size: .28rem
        margin-right: .1rem

  .comfirm-protocol
    font-size: .2rem
    margin-top: .2rem
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
    font-size: .2rem
    margin-top: .05rem
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

  .selected-vip
    color: #9d9d9d!important

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
