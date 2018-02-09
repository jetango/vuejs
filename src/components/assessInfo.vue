<template>
  <div class="assess">
    <img class="header-iamge" src="~common/image/PG_qian_shoufei_001.png">
    <div class="content">
      <img class="content-img" src="~common/image/JQR_da_004.png">
      <p class="target">匹配成功率高达到&nbsp;<span>98.3%</span></p>
    </div>
    <div class="recommend-intro">
      <div class="recommend-title">
        <img class="reverse-logo" src="~common/image/zhaungshi_001.png">
        <span>评估介绍</span>
        <img src="~common/image/zhaungshi_001.png">
      </div>
      <div class="intro">
        <p>1、分析用户填写基础资料进行初步评估。</p>
        <p>2、调取征信平台数据，进行详细分析。</p>
        <p>3、根据数据分析计算出用户信誉分数</p>
      </div>
    </div>
    <p class="protocols">
      <i @click="agreeProtocols" :class="{'icon-not-chose': !isChosed}" class="iconfont icon-correct-marked"></i>
      <span @click="agreeProtocols">我已阅读并同意
            <span style="color: #008aff" @click.stop="checkProtocols">《推荐服务协议》</span>
      </span>
    </p>
    <div class="button-box">
      <div class="button button-primary" @click="confirmPay">
        确定并付款
      </div>
    </div>
    <footer-notice></footer-notice>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    popup,
    navigate
  } from 'common/js/drivers'
  import FooterNotice from 'base/footerNotice/footer-notice'
  import {
    pageIdentity
  } from 'common/js/constants'
  export default {
    data() {
      return {
        isChosed: true
      }
    },
    components: {
      FooterNotice
    },
    methods: {
      agreeProtocols: function() {
        this.isChosed = !this.isChosed
      },
      checkProtocols: function() {
        console.log('check protocols')
      },
      confirmPay: function() {
        let value = encodeURIComponent(JSON.stringify({
          subject: '银码头智能评估',
          amount: '8',
          flag: '1'
        }))
        let param = `data=${value}&amount=8&key=EVALUATE_INFO`
        if (this.isChosed) {
          navigate('PAYMENT_WAY', '支付方式', {
            url: pageIdentity.PAYMENT_WAY,
            param
          })
        } else {
          popup(null, null, '请阅读并同意推荐服务协议')
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .assess
    padding: .1rem 0
    color: #525252
    font-size: .28rem
    .header-iamge
      width: 5.68rem
      height: 1.24rem
      display: block
      margin: 0 auto
    .content
      height: 4.5rem
      background-color: #ffffff
      margin-top: .1rem
      .content-img
        width: 3.82rem
        height: 3.82rem
        display: block
        margin: 0 auto
      .target
        text-align: center
        color: #caa962
        font-size: .34rem
        font-style: italic
        span
          font-size: .58rem

    .recommend-intro
      margin-top: .1rem
      background-color: #fff
      padding-top: .16rem
      .recommend-title
        text-align: center
        img
          width: .35rem
          height: .16rem
        .reverse-logo
          transform: rotateY(180deg)
          -webkit-transform: rotateY(180deg)
          -moz-transform: rotateY(180deg)
      .intro
        padding: .07rem 0 0.11rem 0
        p
          font-size: .2rem
          color: #939393
          padding-left: .5rem
          line-height: 1.6

  .protocols
    font-size: .2rem
    text-align: center
    margin-top: .1rem
    i
      color: green
      font-size: .22rem
      margin-top: -0.04rem
      margin-right: 0.05rem

  .icon-not-chose
    color: lightgrey !important

  .button-box
    padding: .8rem .4rem .8rem

</style>
