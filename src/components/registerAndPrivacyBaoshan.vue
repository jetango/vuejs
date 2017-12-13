<template>
  <div class="register-privacy">
    <register-protocol-baoshan></register-protocol-baoshan>
    <privacy-policies-baoshan></privacy-policies-baoshan>
  </div>
</template>

<script type="text/ecmascript-6">
  import RegisterProtocolBaoshan from 'base/protocols/registerProtocolBaoshan'
  import PrivacyPoliciesBaoshan from 'base/protocols/privacyPoliciesBaoshan'
  export default {
    components: {
      RegisterProtocolBaoshan,
      PrivacyPoliciesBaoshan
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .register-privacy
    padding-bottom: 1rem
    background-color: #ffffff
</style>
