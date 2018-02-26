<template>
  <div class="register-privacy">
    <register-protocol-ios></register-protocol-ios>
    <privacy-policies-ios></privacy-policies-ios>
  </div>
</template>

<script type="text/ecmascript-6">
  import RegisterProtocolIos from 'base/protocols/registerProtocolIos'
  import PrivacyPoliciesIos from 'base/protocols/privacyPoliciesIos'
  export default {
    components: {
      RegisterProtocolIos,
      PrivacyPoliciesIos
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .register-privacy
    padding-bottom: 1rem
    background-color: #ffffff
</style>
