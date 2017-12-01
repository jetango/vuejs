<template>
  <div class="services-protocols">
    <auto-repayment></auto-repayment>
  </div>
</template>

<script type="text/ecmascript-6">
  import AutoRepayment from 'base/protocols/autoRepayment'
  export default {
    components: {
      AutoRepayment
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .services-protocols
    padding-bottom: 1rem
    background-color: #fff
</style>
