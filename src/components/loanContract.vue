<template>
  <div class="loan-contract">
    <div class="contract-item flex flex-item">
      <p class="flex-grow">借款合同</p>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div class="contract-item  flex flex-item">
      <p class="flex-grow">服务合同</p>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div class="contract-item  flex flex-item">
      <p class="flex-grow">电子签名授权书</p>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div class="contract-item  flex flex-item">
      <p class="flex-grow">代扣协议</p>
      <i class="icon iconfont icon-117"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        msg: 'hello world'
      }
    }
  }
</script>

<style scoped lang="stylus" type="stylesheet/stylus">
  .contract-item
    background-color: #ffffff
    margin-top: .1rem
    padding: 0 .4rem
    height: 1rem
    p
      font-size: .3rem
      color: #000000
      i 
        font-size: .32rem
        color: #525252

</style>