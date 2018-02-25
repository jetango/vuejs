<template>
  <div class="recommend-ptotocols">
    <register-protocol></register-protocol>
    <privacy-policies></privacy-policies>
  </div>
</template>

<script type="text/ecmascript-6">
  import RegisterProtocol from 'base/protocols/registerProtocol'
  import PrivacyPolicies from 'base/protocols/privacyPolicies'
  export default {
    components: {
      RegisterProtocol,
      PrivacyPolicies
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .recommend-ptotocols
    padding-bottom: 1rem
    background-color: #ffffff
</style>
