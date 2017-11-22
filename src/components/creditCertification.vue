<template>
  <div class="credit-certification">
    <div class="credit-item flex flex-item">
      <span class="flex-grow">芝麻认证</span>
      <span v-if="creditStatus.zmxyFlag" :class="{'credit': creditStatus.zmxyFlag}">{{creditStatus.zmxyTextName}}</span>
      <span v-if="!creditStatus.zmxyFlag" @click="sesameCertification">{{creditStatus.zmxyTextName}}</span>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div class="credit-item flex flex-item">
      <span class="flex-grow">手机运营商认证</span>
      <span v-if="creditStatus.mobileFlag" :class="{'credit': creditStatus.mobileFlag}">{{creditStatus.mobileTextName}}</span>
      <span v-if="!creditStatus.mobileFlag" @click="phoneCertification">{{creditStatus.mobileTextName}}</span>
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
    sesameCertification,
    phoneCertification,
    doPost
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
          onlineBankFlag: false,
          onlineBankName: null
        }
      }
    },
    created: function() {
      this.init()
    },
    methods: {
      init: function() {
        doPost(types.SCORE_FETCH, {}, {
          success: (data) => {
            let status = data.data
            let showInfo = {
              zmxyFlag: !!Number.parseInt(status.zmxyFlag),
              zmxyTextName: status.zmxyFlag === '1' ? '已认证' : '去认证',
              mobileFlag: !!Number.parseInt(status.mobileFlag),
              mobileTextName: status.mobileFlag === '1' ? '已认证' : '去认证',
              onlineBankFlag: !!Number.parseInt(status.onlineBankFlag),
              onlineBankName: status.onlineBankFlag === '1' ? '已认证' : '去认证'
            }
            this.creditStatus = showInfo
          }
        })
      },
      sesameCertification: function() {
        sesameCertification((data) => {
          console.log(data)
          if (data && data.status === '0') {
            this.creditStatus.zmxyFlag = true
            this.creditStatus.zmxyTextName = '已认证'
          }
        })
      },
      phoneCertification: function() {
        phoneCertification((data) => {
          console.log(data)
          if (data && data.status === '0') {
            this.creditStatus.mobileFlag = true
            this.creditStatus.mobileTextName = '已认证'
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