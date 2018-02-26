<template>
  <div class="intelligent">
    <div class="amount-stage flex flex-item">
      <!-- <div class="item active">
        <span>借款金额</span>
        <span>{{loanAmount + '元'}}</span>
      </div>
      <div class="item">
        <span>借款期限</span>
        <span>{{borrowPeriods + '期'}}</span>
      </div> -->
      <img class="intro-img" src="~common/image/JQR_da_005.png">
      <p class="intro-desc">为您智能推荐一下优质产品</p>
    </div>
    <div class="recommend">
      <div class="product-item flex flex-item" v-for="item in productList" :key="item.productDesc">
        <img class="logo" src="~common/image/tueijian_icon_001.png">
        <div class="item-content flex-grow">
          <p class="desc-a">{{'(' + item.minPrincipal + '元-' + item.maxPrincipal + '元)，' + item.maxLoanDay + '期'}}</p>
          <p class="desc-b">{{item.appDescription}}</p>
        </div>
        <!-- <div class="select-bg" @click="selectProduct(item)">
          <img src="~common/image/tueijian_icon_003.png">
          <p>{{item.recommendAmount}}元</p>
          <p>{{item.recommendOriginalAmount}}元</p>
        </div> -->
      </div>
    </div>
    <div class="recommend-price flex flex-item" :class="{hidden: remainCount > 0}">
      <div class="flex flex-item flex-grow flex-justify column" v-for="info in recommendConfigInfoList" @click="selectRecommendPrice(info)" :class="{'selected': info.recommendFlag == 1}">
        <div class="r-title">
          <span class="recommend-btn" :class="{'hidden': info.type != recommendType}">推荐</span>
          <span class="left"></span>
          <span class="right"></span>
          {{info.typeDescribe}}
        </div>
        <div class="line"></div>
        <div class="r-body">
          <span class="discount-fee">{{info.discountFee}}</span><span class="real-fee">{{(info.discountFee == info.realFee) ? '' : info.realFee}}</span>
        </div>
      </div>
      <!-- <div class="flex flex-item flex-grow flex-justify column">
        <div class="r-title">
          180日内可2次
        </div>
        <div class="r-body">
          <span class="discount-fee">108元</span><span class="real-fee">108元</span>
        </div>
      </div>
      <div class="flex flex-item flex-grow flex-justify column selected">
        <div class="r-title">
          180日内可3次
        </div>
        <div class="r-body">
          <span class="discount-fee">108元</span><span class="real-fee">108元</span>
        </div>
      </div> -->
    </div>
    <div class="recommend-intro"  :class="{hidden: remainCount > 0}">
      <div class="recommend-title">
        <img class="reverse-logo" src="~common/image/zhaungshi_001.png">
        <span>推荐费介绍</span>
        <img src="~common/image/zhaungshi_001.png">
      </div>
      <div class="intro">
        <p>1、推荐产品年化利率低至9%</p>
        <p>2、推荐产品均为正规银行产品</p>
        <p>3、推荐验证码有效期为7天</p>
      </div>
    </div>
    <div class="recommend-tip text-center" :class="{'hidden': remainCount == 0}">
      <p>您仅剩{{remainCount}}次免费智能推荐</p>
      <h4>{{expireTime}}日前有效</h4>
    </div>
    <!-- <p class="protocols">
      <i @click="agreeProtocols" :class="{'icon-not-chose': !isChosed}" class="iconfont icon-correct-marked"></i>
      <span @click="agreeProtocols">我已阅读并同意
        <span style="color: #008aff" @click.stop="checkProtocols">《推荐服务协议》</span>
      </span>
    </p> -->
    <div class="button-box">
      <div class="button button-primary" @click="confirm" :class="{'disabled': loading == true}">
        确认
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {
    popup,
    doPost,
    log,
    navigate, eeLogUBT
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  import {
    pageIdentity
  } from 'common/js/constants'
  export default {
    data() {
      return {
        loanAmount: '',
        borrowPeriods: '',
        productList: [],
        recommendConfigInfoList: [],
        expireTime: '',
        remainCount: 0,
        isChosed: true,
        selectedItem: '',
        loading: true,
        recommendType: 0
      }
    },
    methods: {
      initPage() {
        doPost(types.INTELLIGENT_RECOMMEND, {
          loanAmount: this.$route.query.loanAmount,
          borrowPeriods: this.$route.query.borrowPeriods
        }, {
          success: (oData) => {
            let self = this
            self.loading = false
            if (oData.status === '0') {
              this.productList = oData.data.appProductInfoList || []
              this.recommendConfigInfoList = oData.data.recommendConfigInfoList || []
              this.expireTime = oData.data.expireTime || ''
              this.remainCount = oData.data.remainCount || 0
              if (this.recommendConfigInfoList.length > 0) {
                this.recommendConfigInfoList.forEach((info) => {
                  if (Number(info.recommendFlag) === 1) {
                    self.selectedItem = info
                    self.recommendType = info.type
                  }
                })
              }
            }
          },
          error: (oData) => {
            log('', oData)
            popup('', '', oData.msg || '保存信息失败')
          }
        })
      },
      agreeProtocols: function() {
        this.isChosed = !this.isChosed
      },
      checkProtocols: function() {
        eeLogUBT('Recommend.Action.Agreement', 'click')
        if (navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-IOS') > 0) {
          navigate('RECOMMEND_PROTOCOL_IOS', '推荐服务协议', {url: pageIdentity.RECOMMEND_PROTOCOL_IOS})
        } else {
          navigate('RECOMMEND_PROTOCOL', '推荐服务协议', {url: pageIdentity.RECOMMEND_PROTOCOL})
        }
      },
      selectProduct: function(item) {
        item.isSelected = item.isSelected
      },
      selectRecommendPrice(item) {
        this.recommendConfigInfoList.forEach((info) => {
          if (item.type === info.type) {
            info.recommendFlag = 1
          } else {
            info.recommendFlag = 0
          }
        })
        this.selectedItem = item
      },
      confirm: function() {
        if (this.isChosed) {
          let appCodes = this.productList.map((p) => {
            return p.appCode
          })
          log('', this.selectedItem)
          eeLogUBT('Recommend.Action.Submit', 'click', {appCodes: appCodes.join(',')})
          if (this.remainCount === 0) {
            let value = encodeURIComponent(JSON.stringify({
              subject: '银码头智能推荐',
              amount: this.selectedItem.discountFee,
              flag: '2',
              type: this.selectedItem.type,
              loanAmount: this.loanAmount,
              borrowPeriods: this.borrowPeriods
            }))
            let param = `data=${value}&amount=${this.selectedItem.discountFee}&key=AUDIT_INFO`
            navigate('PAYMENT_WAY', '支付方式', {
              url: pageIdentity.PAYMENT_WAY,
              param
            })
          } else {
            doPost(types.GENERATE_REPEAT, {
              loanAmount: this.$route.query.loanAmount,
              borrowPeriods: this.$route.query.borrowPeriods
            }, {
              success: (oData) => {
                if (Number(oData.status) === 0) {
                  navigate('AUDIT_FLOW', '审核流程', {
                    url: pageIdentity.AUDIT_FLOW
                  })
                }
              },
              error: (oData) => {
                popup('', '', oData.msg || '生成订单失败！')
              }
            })
          }
        } else {
          popup(null, null, '请阅读并同意推荐服务协议')
        }
      }
    },
    mounted: function() {
      this.initPage()
      eeLogUBT('Recommend.Load.Goin', 'goin')
    },
    created() {
      let {loanAmount, borrowPeriods} = this.$route.query
      this.loanAmount = loanAmount
      this.borrowPeriods = borrowPeriods
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .intelligent
    padding: .1rem 0
    color: #525252
    font-size: .28rem

  .amount-stage
    background-color: #fff
    height: 1.4rem

    .intro-img
      width: 1.1rem
      height: 1.1rem
      margin-left: .3rem
    .intro-desc
      font-size: .36rem
      color: #caa962
      font-style: italic
      margin-left: .1rem

  .item
    height: 1rem
    line-height: 1rem
    padding-left: .4rem
    span
      &:last-of-type
        position: absolute
        right: .4rem

  .recommend
    position: relative
    .product-item
      margin-top: .1rem
      background-color: #fff
      height: 1.5rem
      padding: 0 .4rem
      .item-content
        padding-left: .25rem
        width: 2.8rem
        .desc-a
          overflow: hidden
          text-overflow:ellipsis
          white-space: nowrap
        .desc-b
          color: #939393
          font-size: .2rem
          margin-top: .12rem
      .logo
        width: .64rem
        height: .64rem
      .select-bg
        // background: url('~common/image/tueijian_icon_002.png') no-repeat
        // background-size: 100% 100%
        img
          width: .52rem
          height: .52rem
        p
          font-size: .3rem
          color: #525252
          text-align: center
          &:first-of-type
            color: #a98300
            font-size: .44rem
          &:last-of-type
            text-decoration:line-through
            margin-top: .06rem

  .recommend-cost
    margin-top: .1rem
    height: 1rem
    background-color: #fff
    line-height: 1rem
    padding-left: .4rem

  .recommend-intro
    margin-top: .1rem
    background-color: #fff
    padding-top: .16rem
    padding-bottom: .2rem
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
      padding: .07rem 0
      p
        font-size: .2rem
        color: #939393
        padding-left: .5rem
        line-height: 1.6

  .protocols
    font-size: .2rem
    text-align: center
    margin-top: .8rem
    i
      color: green
      font-size: .22rem
      margin-top: -0.04rem
      margin-right: 0.05rem

  .icon-not-chose
    color: lightgrey !important

  .button-box
    padding: .8rem .4rem .8rem
  .recommend-price
    margin-top: .2rem
    margin-bottom: .2rem
    position: relative
    > div
      border: 1px solid #b2b7bb
      border-radius: 5px
      margin-left: .05rem
      margin-right: .05rem
      background: #fff
      &.selected
        border-color: #ff8400
        .left, .right
          border: 1px solid #ff8400
        .left
          border-left-width: 0
        .right
          border-right-width: 0
    .line
      width: 100%
      position: relative
      left: 0
      right: 0
      border-bottom: 1px dashed #b2b7bb
    .r-title
      height: .7rem
      line-height: .8rem
      font-size: .22rem
      color: #525252
      width: 100%
      text-align: center
      position: relative
      .recommend-btn
        height: .26rem
        line-height: .26rem
        border-radius: .1rem
        background-color: #de0000
        color: #fff
        font-size: .16rem
        text-align: center
        position: absolute
        top: .02rem
        right: .08rem
        padding: 0 .1rem
      .left
        width: .1rem
        height: .2rem
        display: inline-block
        position: absolute
        background: #f6f6f6
        left: -.02rem
        bottom: -.11rem
        border-radius: 0 .1rem .1rem 0
        z-index: 2
        border: 1px solid #b2b7bb
        border-left-width: 0
      .right
        width: .1rem
        height: .2rem
        display: inline-block
        position: absolute
        background: #f6f6f6
        right: -.02rem
        bottom: -.11rem
        border-radius: .1rem 0 0 .1rem
        z-index: 2
        border: 1px solid #b2b7bb
        border-right-width: 0
    .r-body
      height: .7rem
      line-height: .7rem
    .discount-fee
      font-size: .44rem
      color: #a98300
    .real-fee
      font-size: .3rem
      color: #525252
      text-decoration: line-through
  .recommend-tip
    background: #fff
    margin: .1rem 0
    padding: .3rem 0
    p
      font-size: .24rem
      color: #525252
      padding-bottom: .1rem
    h4
      font-size: .24rem
      color: #939393
</style>
