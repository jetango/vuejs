<template>
  <div class="rate-query">
    <dl>
      <dt>一、单期借款服务相关服务说明</dt>
      <dd>（1）利息：由借款人向出借人支付，最低0.03%/天;</dd>
      <dd>（2）服务费：由借款人向平台服务商支付;</dd>
      <dd>（3）因用户预期还款可能产生滞纳金、逾期管理费</dd>
      <dd>以上费用将根据借款人的借款期限、借款额度、个人信用等多个因素进行相应的浮动，具体以自动生成的相关协议所载明的内容为准。</dd>
    </dl>
    <dl>
      <dt>二、其他说明</dt>
      <dd>（1）本平台资金来源于正规金融机构，该等金融机构均已接入央行个人征信系统。请保持良好的还款习惯，否则会影响您在侬要贷的信用额度、审核通过率、芝麻信用评分，进而影响您的个人征信记录甚至影响申请银行贷款；</dd>
      <dd>（2）如有服务需求，请登录后阅读相关协议。</dd>
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