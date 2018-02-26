<template>
  <div class="recommend-ptotocols">
    <assess-protocol></assess-protocol>
    <credit-authorization></credit-authorization>
  </div>
</template>

<script type="text/ecmascript-6">
  import AssessProtocol from 'base/protocols/assessProtocol'
  import CreditAuthorization from 'base/protocols/creditAuthorization'
  export default {
    components: {
      AssessProtocol,
      CreditAuthorization
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .recommend-ptotocols
    padding-bottom: 1rem
    background-color: #ffffff
</style>
