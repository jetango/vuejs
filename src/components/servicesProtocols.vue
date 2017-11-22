<template>
  <div class="services-protocols">
    <auto-repayment></auto-repayment>
    <credit-authorization></credit-authorization>
    <server-protocols></server-protocols>
    <loan-protocols></loan-protocols>
    <elec-authorization></elec-authorization>
  </div>
</template>

<script type="text/ecmascript-6">
  import AutoRepayment from 'base/protocols/autoRepayment'
  import CreditAuthorization from 'base/protocols/creditAuthorization'
  import ElecAuthorization from 'base/protocols/elecAuthorization'
  import LoanProtocols from 'base/protocols/loanProtocols'
  import ServerProtocols from 'base/protocols/serverProtocols'
  export default {
    components: {
      AutoRepayment,
      CreditAuthorization,
      ElecAuthorization,
      LoanProtocols,
      ServerProtocols
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .services-protocols
    padding-bottom: 1rem
    background-color: #ffffff
</style>