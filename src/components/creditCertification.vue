<template>
  <div class="credit-certification">
    <!-- <div class="credit-item flex flex-item">
            <span class="flex-grow">芝麻认证</span>
            <span v-if="creditStatus.zmxyFlag" :class="{'credit': creditStatus.zmxyFlag}">{{creditStatus.zmxyTextName}}</span>
            <span v-if="!creditStatus.zmxyFlag" @click="sesameCertification">{{creditStatus.zmxyTextName}}</span>
            <i class="icon iconfont icon-117"></i>
          </div> -->
    <div @click="tbCertification" class="credit-item flex flex-item focus">
      <span class="flex-grow">淘宝认证</span>
      <span v-if="creditStatus.tbFlag" :class="{'credit': creditStatus.tbFlag}">{{creditStatus.tbTextName}}</span>
      <span v-if="!creditStatus.tbFlag">{{creditStatus.tbTextName}}</span>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div @click="phoneCertification" class="credit-item flex flex-item focus">
      <span class="flex-grow">手机运营商认证</span>
      <span v-if="creditStatus.mobileFlag" :class="{'credit': creditStatus.mobileFlag}">{{creditStatus.mobileTextName}}</span>
      <span v-if="!creditStatus.mobileFlag">{{creditStatus.mobileTextName}}</span>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div @click="gxbCertification" class="credit-item flex flex-item focus">
      <span class="flex-grow">公信宝认证</span>
      <span v-if="creditStatus.gxbFlag" :class="{'credit': creditStatus.gxbFlag}">{{creditStatus.gxbTextName}}</span>
      <span v-if="!creditStatus.gxbFlag">{{creditStatus.gxbTextName}}</span>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div class="text-center tip">
      <div class="line"></div>
      <span>至少认证一项</span>
    </div>
    <div class="footer" :class="{'input-footer':isInput}">
      <p class="product-name">银码头</p>
      <p class="loan-notice flex flex-item flex-justify">
        <i class="icon iconfont icon-yirenzheng"></i>
        <span>国安级数据加密防护</span>
      </p>
    </div>
    <!-- <div class="credit-item flex flex-item">
            <span class="flex-grow">网银认证</span>
            <span v-if="creditStatus.onlineBankFlag" :class="{'credit': creditStatus.onlineBankFlag}">{{creditStatus.onlineBankName}}</span>
            <span v-if="!creditStatus.onlineBankFlag">{{creditStatus.onlineBankName}}</span>
            <i class="icon iconfont icon-117"></i>
          </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import FooterNotice from 'base/footerNotice/footer-notice'
  import {
    certification,
    sesameCertification,
    doPost,
    popup, eeLogUBT, gxbCertification
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        creditStatus: {
          zmxyFlag: false,
          zmxyTextName: null,
          mobileFlag: false,
          mobileTextName: null,
          tbFlag: false,
          tbTextName: null,
          gxbFlag: false,
          gxbTextName: null
        },
        isInput: false
      }
    },
    created: function() {
      this.init()
    },
    components: {
      FooterNotice
    },
    mounted() {
      eeLogUBT('CreditAuth.Load.Goin', 'goin')
      let componentHeight = document.querySelector('.credit-certification').offsetHeight
      let buttonHeight = document.querySelector('.tip').offsetHeight
      let buttonTop = document.querySelector('.tip').offsetTop
      let footerHeight = document.querySelector('.footer').offsetHeight
      var marginTop = componentHeight - buttonHeight - buttonTop - footerHeight
      document.querySelector('.footer').style.marginTop = marginTop + 'px'
    },
    methods: {
      init: function() {
        doPost(types.SCORE_FETCH, {}, {
          success: (data) => {
            let status = data.data
            let showInfo = {
              // zmxyFlag: !!Number.parseInt(status.zmxyFlag),
              // zmxyTextName: status.zmxyFlag === '1' ? '已认证' : '去认证',
              mobileFlag: !!Number.parseInt(status.mobileFlag),
              mobileTextName: status.mobileFlag === '1' ? '已认证' : '去认证',
              tbFlag: !!Number.parseInt(status.tbFlag),
              tbTextName: status.tbFlag === '1' ? '已认证' : '去认证',
              gxbFlag: !!Number.parseInt(status.gxbFlag),
              gxbTextName: status.gxbFlag === '1' ? '已认证' : '去认证'
            }
            this.creditStatus = showInfo
          }
        })
      },
      sesameCertification: function() {
        sesameCertification({
          success: (data) => {
            if (data && data.status === '0') {
              doPost(types.SCORE, {
                zmxyFlag: '1'
              }, {
                success: (data) => {
                  this.creditStatus.zmxyFlag = true
                  this.creditStatus.zmxyTextName = '已认证'
                },
                error: (data) => {
                  popup(null, null, data.msg || '认证服务器异常，请稍后再试！')
                }
              })
            } else {
              popup(null, null, '认证服务器异常，请稍后再试！')
            }
          },
          error: (data) => {
            popup(null, null, '认证服务器异常，请稍后再试！')
          }
        })
      },
      phoneCertification: function() {
        if (this.creditStatus.mobileFlag) {
          return
        }
        eeLogUBT('CreditAuth.Action.Operator', 'click')
        let self = this
        certification({type: 'carrier'}, {
          success: (data) => {
            if (data && data.status === '0') {
              doPost(types.SCORE, {
                mobileFlag: '1'
              }, {
                success: (data) => {
                  self.creditStatus.mobileFlag = true
                  self.creditStatus.mobileTextName = '已认证'
                },
                error: (data) => {
                  popup(null, null, data.msg || '认证服务器异常，请稍后再试！')
                }
              })
            } else {
              popup(null, null, '认证服务器异常，请稍后再试！')
            }
          },
          error: (data) => {
            popup(null, null, '认证服务器异常，请稍后再试！')
          }
        })
      },
      tbCertification: function() {
        if (this.creditStatus.tbFlag) {
          return
        }
        eeLogUBT('CreditAuth.Action.Taobao', 'click')
        certification({type: 'taobao'}, {
          success: (data) => {
            if (data && data.status === '0') {
              doPost(types.SCORE, {
                tbFlag: '1'
              }, {
                success: (data) => {
                  this.creditStatus.tbFlag = true
                  this.creditStatus.tbTextName = '已认证'
                },
                error: (data) => {
                  popup(null, null, data.msg || '认证服务器异常，请稍后再试！')
                }
              })
            } else {
              popup(null, null, '认证服务器异常，请稍后再试！')
            }
          },
          error: (data) => {
            popup(null, null, '认证服务器异常，请稍后再试！')
          }
        })
      },
      gxbCertification() { // 公信宝认证
        if (this.creditStatus.gxbFlag) {
          return
        }
        let self = this
        doPost(types.GXB_TOKEN, {}, {
          success(oData) {
            let returnUrl = 'https://h5android.nongyaodai.com/#/gxb-pass'
            if (oData && oData.status === '0') {
              let url = `https://prod.gxb.io/v2/auth?returnUrl=${encodeURIComponent(returnUrl)}&token=${oData.data}&loginType=loginForm`
              gxbCertification({url: url}, {
                success() {
                  self.init()
                }
              })
            } else {
              popup(null, null, '获取信息失败，请重试！')
            }
          },
          error(oData) {
            popup(null, null, oData.msg || '获取信息失败，请重试！')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .credit-certification
    position: absolute;
    width: 100%;
    height: 100%;

  .credit-item
    height: 1rem
    background-color: #fff
    padding: 0 .4rem
    margin-top: .1rem
    &.focus
      &:active
        background: #e1e1e1
    span
      display: block
      font-size: .3rem
      color: #000000
      &:last-of-type
        color: #525252

    .icon-117
      color: #525252
      margin-top: -.03rem
      margin-left: .02rem

  .credit
    color: #2ec200 !important

  .tip
    margin-top: 1rem
    font-size: .22rem
    color: #9d9d9d
    position: relative
    .line
      position: absolute
      left: .4rem
      right: .4rem
      height: 1px
      top: 50%
      background-color: #9d9d9d
      -webkit-transform: scaleY(.5)
      transform: scaleY(.5)
    > span
      position: relative
      background: #f6f6f6
      padding: 0 0.1rem

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
