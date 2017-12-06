<template>
  <div class="credit-certification">
    <!-- <div class="credit-item flex flex-item">
            <span class="flex-grow">芝麻认证</span>
            <span v-if="creditStatus.zmxyFlag" :class="{'credit': creditStatus.zmxyFlag}">{{creditStatus.zmxyTextName}}</span>
            <span v-if="!creditStatus.zmxyFlag" @click="sesameCertification">{{creditStatus.zmxyTextName}}</span>
            <i class="icon iconfont icon-117"></i>
          </div> -->
    <div @click="tbCertification" class="credit-item flex flex-item">
      <span class="flex-grow">淘宝认证</span>
      <span v-if="creditStatus.tbFlag" :class="{'credit': creditStatus.tbFlag}">{{creditStatus.tbTextName}}</span>
      <span v-if="!creditStatus.tbFlag">{{creditStatus.tbTextName}}</span>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div @click="phoneCertification" class="credit-item flex flex-item">
      <span class="flex-grow">手机运营商认证</span>
      <span v-if="creditStatus.mobileFlag" :class="{'credit': creditStatus.mobileFlag}">{{creditStatus.mobileTextName}}</span>
      <span v-if="!creditStatus.mobileFlag">{{creditStatus.mobileTextName}}</span>
      <i class="icon iconfont icon-117"></i>
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
  import {
    certification,
    sesameCertification,
    doPost,
    popup, eeLogUBT
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
          tbTextName: null
        }
      }
    },
    created: function() {
      this.init()
    },
    mounted() {
      eeLogUBT('CreditAuth.Load.Goin', 'goin')
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
              tbTextName: status.tbFlag === '1' ? '已认证' : '去认证'
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
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .credit-item
    height: 1rem
    background-color: #ffffff
    padding: 0 .4rem
    margin-top: .1rem
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

</style>
