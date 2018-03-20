<template>
  <div class="assess">
    <div class="price-box">
      <div class="box-item flex flex-item">
        <div class="box-left">
          <p>现价<span>{{assessFee}}</span>元</p>
          <p>原价<span>{{realFee}}</span>元</p>
        </div>
        <div class="box-right">
          <p>对您的征信智能评估</p>
          <p>为您精准匹配借款平台</p>
        </div>
        <img class="box-img" src="~common/image/icon-xsdz.png">
      </div>
    </div>
    <div class="content">
      <img class="content-img" src="~common/image/JQR_da_004.png">
      <!-- <p class="target">匹配成功率高达到&nbsp;<span>98.3%</span></p> -->
    </div>
    <div class="coupon flex flex-item" :class="{'hidden': couponCount == 0}" @click="goCoupon">
      <span class="flex-grow">优惠券</span>
      <div :class="{couponAll: couponFee == 0, couponSelected: couponFee > 0}">{{couponFee > 0 ? `已经优惠${couponFee}元` : `${couponCount}个可用`}}</div>
      <i class="iconfont icon-117"></i>
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
        assessFee: null,
        realFee: null,
        couponCount: 0,
        couponId: -1,
        couponFee: 0
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
        let tempFee = this._accSub(this.assessFee, this.couponFee)
        let obj = {
          subject: '银码头智能评估',
          amount: tempFee, // this.assessFee,
          flag: '1'
        }
        if (Number(this.couponId) !== -1) {
          obj.couponId = this.couponId
          obj.couponFee = this.couponFee
        }
        let value = encodeURIComponent(JSON.stringify(obj))
        let param = `data=${value}&amount=${tempFee}&key=EVALUATE_INFO`
        if (this.isChosed) {
          navigate('PAYMENT_WAY', '支付方式', {
            url: pageIdentity.PAYMENT_WAY,
            param
          })
        } else {
          popup(null, null, '请阅读并同意推荐服务协议')
        }
      },
      goCoupon() {
        let self = this
        navigate('COUPON', '选择优惠券', {url: pageIdentity.COUPON}, {
          success: function(oData) {
            if (oData.status === '0') {
              let {couponId, couponFee, couponType} = oData.data
              if (Number(couponType) === -1) {
                self.couponId = -1
                self.couponFee = 0
              } else {
                self.couponId = couponId
                self.couponFee = couponFee
              }
            }
          },
          error: function(oData) {
            popup(null, null, oData.msg || '请正确选择优惠券!')
          }
        })
      },
      _fetchAssessFee() {
        let self = this
        doPost(types.FETCH_ASSESS_FEE, {}, {
          success(oData) {
            let {assessFee, realFee, couponCount} = oData.data
            self.assessFee = assessFee || 0
            self.realFee = realFee || 0
            self.couponCount = couponCount || 0
          },
          error(oData) {
            popup(null, null, oData.msg || '获取数据有误！')
          }
        })
      },
      _accSub(arg1, arg2) {
        var r1 = 0
        var r2 = 0
        var m = 0
        var n = 0
        try {
          r1 = arg1.toString().split('.')[1].length
        } catch (e) {
          r1 = 0
        }
        try {
          r2 = arg2.toString().split('.')[1].length
        } catch (e) {
          r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2))
        n = (r1 >= r2) ? r1 : r2
        return ((arg1 * m - arg2 * m) / m).toFixed(n)
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
    .box-item
      height: 1.24rem
      margin: 0 .4rem
      border-radius: 1.2rem
      background: -moz-linear-gradient(top, #3ed4fb, #1662ac)
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#3ed4fb), color-stop(100%,#1662ac))
      background: -o-linear-gradient(top, #3ed4fb, #1662ac)
      background: -webkit-linear-gradient(top, #3ed4fb, #1662ac)
      position: relative
      .box-left
        position: relative
        margin-left: .15rem
        p
          line-height: 1
          color: #f5d06e
          text-align: center
          font-style: italic
          &:first-of-type
            font-size: .4rem
            span
              color: #fff
              font-size: .6rem
              display: inline-block
              width: .88rem
          &:last-of-type
            font-size: .28rem
            text-decoration: line-through
            span
              color: #fff
              padding: 0 .15rem
      .box-right
        position: relative
        margin-left: .34rem
        p
          line-height: 1
          color: #f5d06e
          text-align: center
          font-style: italic
          font-size: .28rem
          &:first-of-type
            padding-left: .3rem
            margin-top: .15rem
          &:last-of-type
            margin-top: .1rem
      .box-img
        width: .6rem
        height: .6rem
        display: block
        position: absolute
        left: 2.32rem
        top: .06rem

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

  .coupon
    height: 1rem
    background-color: #fff
    margin-top: .1rem
    padding: 0 .4rem
    i
      font-size: .28rem
      color: #9d9d9d
    div.couponAll
      padding: .05rem .08rem
      background-color: red
      border-radius: .1rem
      font-size: .22rem
      color: #fff
    div.couponSelected
      font-size: .20rem
</style>
