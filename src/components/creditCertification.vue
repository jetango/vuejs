<template>
  <div class="credit-certification">
    <div class="credit-item flex flex-item">
      <span class="flex-grow">芝麻认证</span>
      <span v-if="creditStatus.zmCredit" :class="{'credit': creditStatus.zmCredit}">已认证</span>
      <span @click="sesameCertification" v-if="!creditStatus.zmCredit">去认证</span>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div class="credit-item flex flex-item">
      <span class="flex-grow">手机运营商认证</span>
      <span v-if="creditStatus.phoneCredit" :class="{'credit': creditStatus.phoneCredit}">已认证</span>
      <span @click="phoneCertification" v-if="!creditStatus.phoneCredit">去认证</span>
      <i class="icon iconfont icon-117"></i>
    </div>
    <!-- <div class="credit-item flex flex-item">
            <span class="flex-grow">网银认证</span>
            <span v-if="creditStatus.netBankCredit" :class="{'credit': creditStatus.netBankCredit}">已认证</span>
            <span v-if="!creditStatus.netBankCredit">未认证</span>
            <i class="icon iconfont icon-117"></i>
          </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    sesameCertification,
    phoneCertification
  } from 'common/js/drivers'
  export default {
    data() {
      return {
        creditStatus: {
          zmCredit: false,
          phoneCredit: false,
          netBankCredit: false
        }
      }
    },
    methods: {
      sesameCertification: function() {
        sesameCertification((data) => {
          console.log(data)
          if (data && data.status === '0') {
            this.creditStatus.zmCredit = true
          }
        })
      },
      phoneCertification: function() {
        phoneCertification((data) => {
          console.log(data)
          if (data && data.status === '0') {
            this.creditStatus.phoneCredit = true
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