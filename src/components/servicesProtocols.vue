<template>
  <div class="services-protocols">
    <!-- <auto-repayment></auto-repayment> -->
    <credit-authorization></credit-authorization>
    <server-protocols></server-protocols>
    <loan-protocols></loan-protocols>
    <elec-authorization></elec-authorization>
    <letter-commitment></letter-commitment>
  </div>
</template>

<script type="text/ecmascript-6">
  // import AutoRepayment from 'base/protocols/autoRepayment'
  import CreditAuthorization from 'base/protocols/creditAuthorization'
  import ElecAuthorization from 'base/protocols/elecAuthorization'
  import LoanProtocols from 'base/protocols/loanProtocols'
  import ServerProtocols from 'base/protocols/serverProtocols'
  import LetterCommitment from 'base/protocols/letterOfCommitment'
  export default {
    components: {
      // AutoRepayment,
      CreditAuthorization, // 征信查询授权书
      ElecAuthorization, // 电子签名授权协议书
      LoanProtocols, // 贷款协议
      ServerProtocols, // 借款居间服务协议
      LetterCommitment // 个人借款用途承诺书
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .services-protocols
    padding-bottom: 1rem
    background-color: #fff
</style>
