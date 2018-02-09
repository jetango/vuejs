<template>
  <div class="intelligent">
    <div class="amount-stage">
      <div class="item active">
        <span>借款金额</span>
        <span>{{loanAmount + '元'}}</span>
      </div>
      <div class="item">
        <span>借款期限</span>
        <span>{{borrowPeriods + '期'}}</span>
      </div>
    </div>
    <div class="recommend">
      <div class="product-item flex flex-item" v-for="item in productList" :key="item.productDesc">
        <img class="logo" src="~common/image/tueijian_icon_001.png">
        <div class="item-content flex-grow">
          <p class="desc-a">{{'(' + item.minPrincipal + '元-' + item.maxPrincipal + '元)，最高' + item.maxLoanDay + '期'}}</p>
          <p class="desc-b">{{item.appDescription}}</p>
        </div>
        <div class="select-bg" @click="selectProduct(item)">
          <img src="~common/image/tueijian_icon_003.png">
        </div>
      </div>
    </div>
    <div class="recommend-cost">
      消耗推荐费：{{recAmount ? recAmount + '元' : ''}}
    </div>
    <div class="recommend-intro">
      <div class="recommend-title">
        <img class="reverse-logo" src="~common/image/zhaungshi_001.png">
        <span>推荐费介绍</span>
        <img src="~common/image/zhaungshi_001.png">
      </div>
      <div class="intro">
        <p>1、年化利率低至20%</p>
        <p>2、可多平台多次借贷</p>
        <p>3、借款不成功，退还手续费</p>
        <p>4、每次推荐有效期为7天</p>
      </div>
    </div>
    <p class="protocols">
      <i @click="agreeProtocols" :class="{'icon-not-chose': !isChosed}" class="iconfont icon-correct-marked"></i>
      <span @click="agreeProtocols">我已阅读并同意
        <span style="color: #008aff" @click.stop="checkProtocols">《推荐服务协议》</span>
      </span>
    </p>
    <div class="button-box">
      <div class="button button-primary" @click="confirm">
        确认
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {
    popup,
    doPost,
    log
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        loanAmount: '',
        borrowPeriods: '',
        productList: [],
        recAmount: '',
        isChosed: false
      }
    },
    methods: {
      initPage() {
        doPost(types.INTELLIGENT_RECOMMEND, {
          loanAmount: this.$route.query.loanAmount,
          borrowPeriods: this.$route.query.borrowPeriods
        }, {
          success: (oData) => {
            if (oData.status === '0') {
              this.recAmount = oData.data.recAmount
              this.productList = oData.data.appProductInfoList
            }
          },
          error: (oData) => {
            log('', oData)
            popup('', '', oData.msg || '保存信息失败')
          }
        })
      },
      initParamData: function() {
        this.loanAmount = this.$route.query.loanAmount
        this.borrowPeriods = this.$route.query.borrowPeriods
      },
      agreeProtocols: function() {
        this.isChosed = !this.isChosed
      },
      checkProtocols: function() {
        console.log('check protocols')
      },
      selectProduct: function(item) {
        item.isSelected = item.isSelected
      },
      confirm: function() {
        if (this.isChosed) {
          let query = {
            param: encodeURIComponent(JSON.stringify({
              subject: '银码头XXX',
              amount: this.recAmount,
              flag: '2',
              loanAmount: this.loanAmount,
              borrowPeriods: this.borrowPeriods
            }))
          }
          this.$router.push({path: '/payment-way', query: query})
        } else {
          popup(null, null, '请阅读并同意推荐服务协议')
        }
      }
    },
    mounted: function() {
      this.initPage()
      this.initParamData()
    },
    watch: {
      '$route': 'initParamData'
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
        width: .52rem
        height: .52rem
        background: url('~common/image/tueijian_icon_002.png') no-repeat
        background-size: 100% 100%
        img
          width: .52rem
          height: .52rem

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