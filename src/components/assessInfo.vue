<template>
  <div class="assess">
    <div class="price-box">
      <img class="header-iamge" src="~common/image/PG_qian_shoufei_005.png">
    </div>
    <div class="content">
      <img class="content-img" src="~common/image/JQR_da_004.png">
      <!-- <p class="target">匹配成功率高达到&nbsp;<span>98.3%</span></p> -->
    </div>
    <div class="recommend-intro">
      <div class="recommend-title">
        <img class="reverse-logo" src="~common/image/zhaungshi_001.png">
        <span>评估介绍</span>
        <img src="~common/image/zhaungshi_001.png">
      </div>
      <div class="intro">
        <p>1、对用户填写资料进行初步评估。</p>
        <p>2、评估过程会查询客户相关资信。</p>
        <p>3、评估结果以分数的形式展示。</p>
      </div>
    </div>
    <p class="protocols">
      <i @click="agreeProtocols" :class="{'icon-not-chose': !isChosed}" class="iconfont icon-correct-marked"></i>
      <span @click="agreeProtocols">我已阅读并同意
            <span style="color: #008aff" @click.stop="checkProtocols">《评估推荐服务协议》</span>
      </span>
    </p>
    <div class="button-box">
      <div class="button button-primary" @click="confirmPay" :class="{'disabled': this.assessFee == 0}">
        确定并付款
      </div>
    </div>
    <footer-notice></footer-notice>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    popup,
    navigate,
    eeLogUBT,
    doPost
  } from 'common/js/drivers'
  import FooterNotice from 'base/footerNotice/footer-notice'
  import * as types from 'config/api-type'
  import {
    pageIdentity
  } from 'common/js/constants'
  export default {
    data() {
      return {
        isChosed: true,
        assessFee: 0
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
        eeLogUBT('Assessment.Action.Agreement', 'click')
        if (navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-IOS') > 0) {
          navigate('ASSESS_CREDIT_PROTOCOL_IOS', '评估推荐服务协议', {url: pageIdentity.ASSESS_CREDIT_PROTOCOL_IOS})
        } else {
          navigate('ASSESS_CREDIT_PROTOCOL', '评估推荐服务协议', {url: pageIdentity.ASSESS_CREDIT_PROTOCOL})
        }
      },
      confirmPay: function() {
        if (this.assessFee === 0) {
          return
        }
        eeLogUBT('Assessment.Action.Submit', 'click')
        let value = encodeURIComponent(JSON.stringify({
          subject: '银码头智能评估',
          amount: this.assessFee,
          flag: '1'
        }))
        let param = `data=${value}&amount=${this.assessFee}&key=EVALUATE_INFO`
        if (this.isChosed) {
          navigate('PAYMENT_WAY', '支付方式', {
            url: pageIdentity.PAYMENT_WAY,
            param
          })
        } else {
          popup(null, null, '请阅读并同意推荐服务协议')
        }
      },
      _fetchAssessFee() {
        let self = this
        doPost(types.FETCH_ASSESS_FEE, {}, {
          success(oData) {
            self.assessFee = oData.data || 0
          },
          error(oData) {
            popup(null, null, oData.msg || '获取数据有误！')
          }
        })
      }
    },
    created() {
      this._fetchAssessFee()
      eeLogUBT('Assessment.Load.Goin', 'goin')
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .price-box
    position: relative
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
    margin-top: .5rem
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
