<template>
  <div class="share-friends">
    <div class="bg-1 item">
      <p>您的好友198****2334</p>
    </div>
    <div class="bg-2 item">
      <div class="input-area">
        <div class="input-bg flex flex-item flex-grow">
          <input v-model="params.accountNumber" type="text" name="mobile" placeholder="请输入您的手机号" />
        </div>
        <div class="input-bg flex flex-item flex-grow">
          <input v-model="params.smsCode" type="text" name="validate" placeholder="请输入验证码" />
          <div v-show="!isSend" class="btn-css" @click="getValidate">短信验证</div>
          <div v-show="isSend" class="btn-css is-send">{{delayTime}}S后重新获取</div>
        </div>
        <div class="input-bg flex flex-item flex-grow">
          <input v-model="password" type="password" name="mobile" placeholder="设置密码（6-10位字母数字组合）" />
        </div>
      </div>
    </div>
    <div class="bg-3 item">
      <div class="btn-box" @click="register">
        下载领现金
      </div>
    </div>
    <web-toast v-if="toast.showToast" :toast="toast"></web-toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    doPost
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  import WebToast from 'base/toast/toast'
  import md5 from 'js-md5'

  export default {
    data() {
      return {
        params: {
          fatherNo: null,
          accountNumber: null,
          smsCode: null,
          password: null
        },
        password: null,
        isSend: false,
        delayTime: 30,
        toast: {
          showTitle: '',
          showToast: false
        }
      }
    },
    methods: {
      register: function() {
        if (!this.params.accountNumber) {
          this.toast = {
            showTitle: '请输入手机号',
            showToast: true
          }
          return false
        }
        if (!this.params.smsCode) {
          this.toast = {
            showTitle: '请输入验证码',
            showToast: true
          }
          return false
        }
        if (!this.password) {
          this.toast = {
            showTitle: '请输入密码',
            showToast: true
          }
          return false
        }
        if (this.password) {
          let isMatch = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(this.password)
          if (!isMatch) {
            this.toast = {
              showTitle: '密码必须是6-10位字母+数字组合',
              showToast: true
            }
            return false
          }
        }
        this.params.password = md5(this.password)
        doPost(types.INVITE_REGISTER, this.params, {
          success: (res) => {
            sessionStorage.setItem('registerSuccess', 'ok')
            this.isRegister = false
          },
          error: (res) => {
            this.toast = {
              showTitle: res.msg || '网络繁忙，请稍后访问',
              showToast: true
            }
          }
        })
      },
      getValidate: function() {
        let phone = this.params.accountNumber
        if (!/^1\d{10}$/.test(phone)) {
          this.toast = {
            showTitle: '请填写手机号',
            showToast: true
          }
          return false
        }
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
        doPost(types.SMSCODE, {
          accountNumber: phone
        }, {
          success: (oData) => {
            this.toast = {
              showTitle: '验证码发送成功，请注意查收',
              showToast: true
            }
          },
          error: (oData) => {
            this.toast = {
              showTitle: oData.msg || '校验码发送失败，请稍后再试！',
              showToast: true
            }
          }
        })
      }
    },
    components: {
      WebToast
    },
    mounted: function() {
      this.params.fatherNo = this.$route.query.fatherNo
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .share-friends
    max-width: 640px
    margin: 0 auto
    .item
      width: 100%
      position: relative
    .bg-1
      height: 3.09rem
      background: url('~common/image/share01.jpg') no-repeat center
      background-size: 100% 100%
      p
        color: #fff
        font-size: .28rem
        position: absolute
        left: 0
        right: 0
        text-align: center
        top: .85rem
    .bg-2
      height: 4rem
      background: url('~common/image/share02.jpg') no-repeat center
      background-size: 100% 100%
      padding-top: .2rem
    .bg-3
      height: 3.3rem
      background: url('~common/image/share03.jpg') no-repeat center
      background-size: 100% 100%
      .btn-box
        height: 1.2rem
        line-height: 1rem
        text-align: center
        position: absolute
        left: .4rem
        right: .4rem
        font-size: .28rem
        color: #fff
        background: url('~common/image/theme_btn.png') no-repeat center
        background-size: 100% 100%

  .input-area
    margin: 0 .4rem
    background-color: #ffffff
    padding: .4rem 0 .2rem 0
    border-radius: .1rem
    img
      display: block
      margin: 0 auto
      width: 1.19rem
      height: 1.19rem
    
    .register-success
      font-size: .36rem
      color: #00cd05
      text-align: center
      margin-top: .25rem

    .register-success-small
      font-size: .28rem
      color: #00cd05
      text-align: center
      margin-top: .1rem
      margin-bottom: .9rem

    .input-bg
      margin: 0 .3rem
      background-color: #eeeff3
      height: .8rem
      border-radius: .06rem
      margin-bottom: .2rem
      position: relative
      input
        background-color: #eeeff3
        color: #000
        padding-left: .2rem
        outline: none
        border: 0
        font-size: .28rem
        height: .6rem
        width: 100%

      .btn-css
        position: absolute
        right: .05rem
        top: .05rem
        height: .7rem
        width: 2rem
        border-radius: .06rem
        color: #ffffff
        background-color: #89cd40
        text-align: center
        line-height: .7rem
        font-size: .26rem
</style>
