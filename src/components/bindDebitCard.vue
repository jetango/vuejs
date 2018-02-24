<template>
  <div class="bind-debit-card">
    <div class="input-item flex flex-item active focus" @click="binCarsChoose()">
      <span class="flex-grow">银行卡类型：</span>
      <span>{{bankInfo.bankName ? bankInfo.bankName : '请选择'}}</span>
      <i class="iconfont icon-117"></i>
    </div>
    <div class="input-item flex flex-item active">
      <span>银行卡号：</span>
      <div class="input-bg flex flex-item flex-grow">
        <input v-model="bankInfo.bankAccount" type="tel" placeholder="请输入银行卡" maxlength="20">
      </div>
    </div>
    <div class="input-item flex flex-item active">
      <span>姓&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
      <div class="input-bg flex flex-item flex-grow">
        <input v-model="bankInfo.accountName" type="text" placeholder="请输入您的姓名">
      </div>
    </div>
    <div class="input-item flex flex-item active">
      <span>手机号：</span>
      <div class="input-bg flex flex-item flex-grow">
        <input v-model="bankInfo.reservedPhone" type="tel" placeholder="请输入您的银行预留手机号" maxlength="11">
      </div>
    </div>
    <div class="input-item flex flex-item active">
      <span>验证码：</span>
      <div class="input-bg flex flex-item flex-grow">
        <input v-model="bankInfo.smsCode" type="tel" class="input-validate-cord flex-grow" placeholder="请输入验证码">
        <span v-if="!isSend" @click="sendValidateCode" class="input-validate">获取验证码</span>
        <span v-if="isSend" class="input-validate is-send">{{delayTime}}s重新获取</span>
      </div>
    </div>
    <p class="comfirm-protocol flex flex-item flex-justify text-gary" @click="agreeProtocols()">
      <i :class="{'icon-not-chose': isChosed}" class="iconfont icon-correct-marked"></i>
      <span>我已阅读并同意<span @click.stop="checkServicesProtocols">《用户服务协议》</span></span>
    </p>
    <div @click="submit()" class="button button-primary">提交</div>
    <div class="footer" :class="{'input-footer':isInput}">
      <p class="product-name">银码头</p>
      <p class="loan-notice flex flex-item flex-justify">
        <i class="icon iconfont icon-yirenzheng"></i>
        <span>国安级数据加密防护</span>
      </p>
    </div>
  </div>
</template>

<script style="text/ecmascript-6">
  import FooterNotice from 'base/footerNotice/footer-notice'
  import {
    doPost,
    popup,
    endPage,
    toast,
    navigate, eeLogUBT
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  import Picker from 'better-picker'
  import {
    pageIdentity, bins
  } from 'common/js/constants'
  export default {
    data() {
      return {
        isSend: false,
        delayTime: 0,
        bankInfo: {
          accountName: '',
          bankAccount: '',
          reservedPhone: '',
          smsCode: '',
          bankName: ''
        },
        submitStatus: true,
        isInput: false,
        isChosed: false,
        binText: []
      }
    },
    methods: {
      sendValidateCode: function() {
        let phone = this.bankInfo.reservedPhone
        if (!/^1\d{10}$/.test(phone)) {
          popup('', null, '请输入手机号码！')
          return
        }
        doPost(types.SMSCODE, {
          mobile: phone,
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
        // 获取验证码
        eeLogUBT('BankCard.Action.ValidCode', 'click')
      },
      submit: function() {
        let reg = new RegExp('^[0-9]*$')
        if (this.isChosed) {
          popup(null, null, '请同意用户服务协议！')
          return
        }
        if (!this.bankInfo.bankName) {
          popup(null, null, '请选择银行卡类型！')
          return false
        }
        if (this.bankInfo.accountName === '') {
          popup(null, null, '请输入姓名！')
          return false
        } else if (this.bankInfo.bankAccount === '') {
          popup(null, null, '请输入银行卡号！')
          return false
        } else if (!/^1\d{10}$/.test(this.bankInfo.reservedPhone)) {
          popup(null, null, '请正确输入手机号！')
          return false
        } else if (this.bankInfo.smsCode === '') {
          popup(null, null, '请输入验证码！')
          return false
        } else if (!reg.test(this.bankInfo.bankAccount)) {
          popup(null, null, '银行卡格式不对，请重新输入！')
          return false
        }
        let {bankAccount} = this.bankInfo
        if (this.selectedBin) {
          let binCodes = bins[this.selectedBin].bin
          let isExist = binCodes.some((code) => {
            return bankAccount.indexOf(code) === 0
          })
          if (!isExist) {
            popup(null, null, '银行卡格式不对，请重新输入！')
            return false
          }
        }

        let param = this.bankInfo
        if (this.submitStatus) {
          this.submitStatus = false
          doPost(types.BANK, param, {
            success: (oData) => {
              this.submitStatus = true
              endPage({url: pageIdentity.BANK_LIST, param: ''}, 'BANK_LIST', '-1')
            },
            error: (oData) => {
              this.submitStatus = true
              popup(null, null, oData.msg || '绑定银行卡失败，请稍后再试！')
            }
          })
        }

        eeLogUBT('BankCard.Action.Submit', 'click')
      },
      agreeProtocols() {
        this.isChosed = !this.isChosed
      },
      checkServicesProtocols: function() {
        navigate('AUTOREPAY_PROTOCOL', '用户服务协议', {url: pageIdentity.AUTOREPAY_PROTOCOL})
      },
      binCarsChoose() {
        this.binPicker.show()
      },
      _handBins() {
        let binText = []
        for (let key in bins) {
          // if (['zhongxin', 'zhongguo', 'nongye', 'jianshe', 'guangda', 'gongshang', 'xinye'].indexOf(key) > -1) {
          if (['zhaoshang', 'youju'].indexOf(key) === -1) {
            binText.push({
              value: key,
              text: bins[key].name
            })
          }
        }
        this.binText = binText
      },
      _initBinPicker() {
        let self = this
        this.binPicker = new Picker({
          'data': [self.binText],
          'selectedIndex': [0]
        })
        this.binPicker.on('picker.select', (val, index) => {
          this.selectedBin = val[0]
          this.bankInfo.bankName = bins[val[0]].name
        })
      }
    },
    created() {
      let {from} = this.$route.query
      this.from = from
      this._handBins()
      this._initBinPicker()
    },
    components: {
      FooterNotice
    },
    mounted: function() {
      let componentHeight = document.querySelector('.bind-debit-card').offsetHeight
      let buttonHeight = document.querySelector('.button').offsetHeight
      let buttonTop = document.querySelector('.button').offsetTop
      let footerHeight = document.querySelector('.footer').offsetHeight
      var marginTop = componentHeight - buttonHeight - buttonTop - footerHeight
      document.querySelector('.footer').style.marginTop = marginTop + 'px'
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"

  .bind-debit-card
    padding-top: .1rem
    position: absolute
    background-color: #fff
    width: 100%
    height: 100%
    .focus
      &:active
        background: #e1e1e1
  .input-item
    height: 1rem
    font-size: .3rem
    color: #525252
    padding-right: .4rem
    span
      margin-left: .4rem
      min-width: 1.05rem
    div
      border-radius: .06rem
      height: .8rem
      margin-left: .1rem
      input
        color: #000
        padding-left: .2rem
        width: 100%
        outline: none
        border: 0
      span
        display:block
        min-width: 1.8rem
        height: .72rem
        margin-right: .05rem
        line-height: .72rem
        text-align: center
        color: #008aff
        font-size: .28rem
        border-radius: .06rem

  .input-validate
    margin-left: 0 !important

  .is-send
    background-color: #b6b6b6 !important

  .button
    margin .4rem 0.4rem 1rem
    background-color: #ffa800
    color: #fff
  .icon-not-chose
    color: lightgrey !important
  .comfirm-protocol
    font-size: .2rem
    margin-top: 1rem
    margin-bottom: .6rem
    i
      color: green
      font-size: .22rem
      margin-top: -0.04rem
      margin-right: 0.05rem
    span
      span
        color: #008aff

  .footer
    width: 100%
    .product-name
      text-align: center
      font-size: .3rem
      color: #8d959c

  .loan-notice
    height: .5rem
    font-size: .2rem
    i
      color: green
      font-size: .34rem
      margin-top: -.01rem

</style>
