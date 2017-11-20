<template>
  <div class="bind-debit-card">
    <div class="input-item flex flex-item">
      <span>姓&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
      <div class="input-bg flex flex-item flex-grow">
        <input v-model="bankInfo.accountName" type="text" placeholder="请输入您的姓名">
      </div>
    </div>
    <div class="input-item flex flex-item">
      <span>银行卡:</span>
      <div class="input-bg flex flex-item flex-grow">
        <input v-model="bankInfo.accountNumber" type="text" placeholder="请输入银行卡">
      </div>
    </div>
    <div class="input-item flex flex-item">
      <span>手机号:</span>
      <div class="input-bg flex flex-item flex-grow">
        <input v-model="bankInfo.reservedPhone" type="text" placeholder="请输入您的银行预留手机号">
      </div>
    </div>
    <div class="input-item flex flex-item">
      <span>验证码:</span>
      <div class="input-bg flex flex-item flex-grow">
        <input v-model="bankInfo.smsCode" type="text" class="input-validate-cord flex-grow" placeholder="请输入验证码">
        <span v-if="!isSend" @click="sendValidateCode" class="input-validate">获取验证码</span>
        <span v-if="isSend" class="input-validate is-send">{{delayTime}}后重新获取</span>
      </div>
    </div>
    <div @click="submit" class="button">提交</div>
    <div class="footer">
      <p class="product-name">侬要贷</p>
      <p class="loan-notice flex flex-item flex-justify">
        <i class="icon iconfont icon-yirenzheng"></i>
        <span>银行级数据加密防护</span>
      </p>
    </div>
  </div>
</template>

<script style="text/ecmascript-6">
  import FooterNotice from 'base/footerNotice/footer-notice'
  import {
    doPost,
    popup
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        isSend: false,
        delayTime: 0,
        bankInfo: {
          accountName: '',
          accountNumber: '',
          reservedPhone: '',
          smsCode: ''
        }
      }
    },
    methods: {
      sendValidateCode: function() {
        doPost(types.SMSCODE, {
          accountNumber: '15959369312',
          smsType: '1'
        }, {
          success: (oData) => {
            console.log(oData)
            this.isSend = true
            this.delayTime = 119
            let timer = setInterval(() => {
              if (this.delayTime === 1) {
                this.isSend = false
                this.delayTime = 0
                clearInterval(timer)
              }
              this.delayTime--
            }, 1000)
          }
        })
      },
      submit: function() {
        let reg = new RegExp('^[0-9]*$')
        if (this.bankInfo.accountName === '') {
          popup(null, '请输入姓名')
          return false
        } else if (this.bankInfo.accountNumber === '') {
          popup(null, '请输入银行卡号')
          return false
        } else if (this.bankInfo.reservedPhone === '') {
          popup(null, '请输入手机号')
          return false
        } else if (this.bankInfo.smsCode === '') {
          popup(null, '请输入验证码')
          return false
        } else if (!reg.test(this.bankInfo.accountNumber)) {
          popup(null, '银行卡格式不对，请重新输入')
          return false
        } else if (!reg.test(this.bankInfo.reservedPhone) || this.bankInfo.reservedPhone.length !== 11) {
          popup(null, '手机号输入不对，请重新输入')
          return false
        }
        let param = this.bankInfo
        doPost(types.BANK, param, {
          success: (oData) => {
            console.log(oData)
          }
        })
      }
    },
    components: {
      FooterNotice
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"

  .bind-debit-card
    position: absolute
    background-color: #ffffff
    width: 100%
    height: 100%

  .input-item
    height: .8rem
    font-size: .3rem
    color: #000000
    margin-top: .3rem
    padding-right: .4rem
    span
      margin-left: .4rem
      min-width: 1.05rem
    div
      background-color:#eeeff3
      border-radius: .06rem
      height: .8rem
      margin-left: .1rem
      input
        background-color: #eeeff3
        font-size: .28rem
        color: #000000
        padding: .2rem 0 .2rem .3rem
        width: 100%
        outline: none
      span
        display:block
        min-width: 1.8rem
        height: .7rem
        background-color: #89cd40
        margin-right: .05rem
        line-height: .7rem
        text-align: center
        color: #fff
        font-size: .28rem
        border-radius: .06rem

  .input-validate
    margin-left: 0 !important

  .is-send
    background-color: #b6b6b6 !important

  .button
    margin 1rem .4rem
    background-color: #ffa800
    color: #fff

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #aeaeae;
    padding-top: -.05rem
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #aeaeae;
    padding-top: -.05rem
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #aeaeae;
    padding-top: -.05rem
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #aeaeae;
    padding-top: -.05rem
  }

  .footer
    position: fixed
    bottom: 0
    left: 0
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
