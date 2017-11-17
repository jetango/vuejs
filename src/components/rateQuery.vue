<template>
  <div class="rate-query">
    <dl>
      <dt>一、单期借款服务条款说明</dt>
      <dd>（一）利息：有借款人向借款人支付，最低1.03%/天;</dd>
      <dd>（二）服务费：由借款人向平台服务商支付;</dd>
      <dd>（三）可能产生的滞纳金、预期管理费。</dd>
      <dd>以上费用将根据借款人的借款期限、借款额度、个人信用等多个因素进行相应的浮动，具体以自动生成的相关协议所载明的内容为准。</dd>
    </dl>
    <dl>
      <dt>二、现金分期服务相关说明</dt>
      <dd>（一）利息：有借款人向借款人支付，最低1.03%/天;</dd>
      <dd>（二）服务费：由借款人向平台服务商支付;</dd>
      <dd>（三）可能产生的滞纳金、预期管理费。</dd>
      <dd>以上费用将根据借款人的借款期限、借款额度、个人信用等多个因素进行相应的浮动，具体以自动生成的相关协议所载明的内容为准。</dd>
    </dl>
    <dl>
      <dt>三、其他说明</dt>
      <dd>（一）利息：有借款人向借款人支付，最低1.03%/天;</dd>
      <dd>（二）服务费：由借款人向平台服务商支付;</dd>
      <dd>（三）可能产生的滞纳金、预期管理费。</dd>
      <dd>以上费用将根据借款人的借款期限、借款额度、个人信用等多个因素进行相应的浮动，具体以自动生成的相关协议所载明的内容为准。<span>相关协议</span></dd>
    </dl>
    <footer-notice></footer-notice>
  </div>
</template>

<script type="text/ecmascript-6">
  import FooterNotice from 'base/footerNotice/footer-notice'

  export default {
    components: {
      FooterNotice
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .rate-query
    background-color: #fff
    padding-top: .3rem
    margin-bottom: .5rem

  dl
    padding: 0 .4rem
    padding-bottom: .18rem
    dt
      color: #000000
      font-size: .3rem
      margin-bottom: .18rem
    dd
      color: #525252
      font-size: .22rem
      line-height: .4rem
      span
        color: #008aff
    

</style>