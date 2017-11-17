<template>
  <div class="credit-certification">
    <div class="credit-item flex flex-item">
      <span class="flex-grow">芝麻认证</span>
      <span v-if="creditStatus.zmCredit" :class="{'credit': creditStatus.zmCredit}">已认证</span>
      <span v-if="!creditStatus.zmCredit">未认证</span>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div class="credit-item flex flex-item">
      <span class="flex-grow">手机运营商认证</span>
      <span v-if="creditStatus.phoneCredit" :class="{'credit': creditStatus.phoneCredit}">已认证</span>
      <span v-if="!creditStatus.phoneCredit">未认证</span>
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
  export default {
    data() {
      return {
        creditStatus: {
          zmCredit: true,
          phoneCredit: false,
          netBankCredit: false
        }
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