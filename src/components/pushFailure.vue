<template>
  <div class="push-failure">
    <div class="fail-content up-gap">
      <p>{{failTitle}}</p>
      <p>{{failDesc}}</p>
      <p>如有疑问请联系客服电话 0371-66395059</p>
    </div>
    <div class="fail-tip up-gap" v-show="isShow">
      <!-- <p>
        正在为您推送更多的金融机构（{{curRecommendCount}}/{{maxRecommendCount}}）
        <img class="fail-tip-img rotate-infinite" src="~common/image/jaizai_xiao_008.png" />
      </p> -->
      <p>30天内会陆续为你推荐新的金融产品</p>
    </div>
    <div class="button-box">
      <div class="button button-primary" @click="back">更多推荐</div>
    </div>
    <p class="tip-bottom">
      <img class="img-size" src="~common/image/zhushi_tuan_001.png">
      良好的信誉记录，是借款成功率的保障！
      <img class="img-size rotate-180" src="~common/image/zhushi_tuan_001.png">
    </p>
    <div class="footer">
      <p class="loan-notice flex flex-item flex-justify">
        <i class="icon iconfont icon-yirenzheng"></i>
        <span>国安级数据加密防护</span>
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as types from 'config/api-type'
  import {
    popup,
    doPost,
    log,
    navigate,
    eeLogUBT
  } from 'common/js/drivers'
  export default {
    data() {
      return {
        isShow: false,
        failTitle: null,
        failDesc: null,
        curRecommendCount: null,
        maxRecommendCount: null
      }
    },
    methods: {
      initPage: function() {
        let param = {
          orderNo: this.$route.query.orderNo
        }
        doPost(types.BORROW_FAIL, param, {
          success: (oData) => {
            if (oData.status === '0') {
              this.curRecommendCount = oData.data.curRecommendCount
              this.maxRecommendCount = oData.data.maxRecommendCount
              this.failTitle = '很遗憾！'
              if (this.curRecommendCount >= this.maxRecommendCount) {
                this.failDesc = '您的信誉记录未满足平台要求，推送失败'
              } else {
                this.isShow = true
                this.failDesc = '您的信誉记录未满足金融机构要求'
              }
            }
          },
          error: (oData) => {
            log('', oData)
            popup('', '', oData.msg || '获取订单详情失败')
          }
        })
      },
      back: function() {
        eeLogUBT('PushFailure.Action.qunadai', 'click')
        navigate('MORE_PLATFORM', '更多平台', {url: 'https://wap.qunadai.com/#/qnd?channelCode=nongyaodai', type: 'TARGET'}, null, 'ROOT')
      }
    },
    mounted: function() {
      eeLogUBT('PushFailure.Load.Goin', 'goin')
      let componentHeight = document.querySelector('.push-failure').offsetHeight
      let buttonHeight = document.querySelector('.tip-bottom').offsetHeight
      let buttonTop = document.querySelector('.tip-bottom').offsetTop
      let footerHeight = document.querySelector('.footer').offsetHeight
      var marginTop = componentHeight - buttonHeight - buttonTop - footerHeight
      document.querySelector('.footer').style.marginTop = marginTop + 'px'
      this.initPage()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .push-failure
    position: absolute;
    width: 100%;
    height: 100%;
  .fail-content
    background-color: #fff
    height: 2.7rem
    padding-top: 1px
    p
      text-align: center
      font-size: .28rem
      color: #525252
      &:first-of-type
        margin-top: 1.1rem
      &:last-of-type
        margin-top: .1rem

  .fail-tip
    background-color: #fff
    height: 1.1rem
    line-height: 1.1rem
    text-align: center
    .fail-tip-img
      width: .3rem
      height: .3rem
      vertical-align: middle
      margin-top: -.04rem
  .up-gap
    margin-top: .1rem
  .button-box
    padding: 1rem .4rem .4rem

  .tip-bottom
    font-size: .22rem
    margin-top: .4rem
    margin-bottom: 1rem
    text-align: center
    color: #2a89c7
    .img-size
      width: .4rem
      height: .24rem
      vertical-align: middle

  @-webkit-keyframes rotate {
    0%,
    100% {
      -webkit-transform: rotate(360deg)
    }
    100% {
      -webkit-transform: rotate(0deg)
    }
  }
  @-moz-keyframes rotate {
    0%,
    100% {
      -moz-transform: rotate(360deg)
    }
    100% {
      -moz-transform: rotate(0deg)
    }
  }
  @-o-keyframes rotate {
    0%,
    100% {
      -o-transform: rotate(360deg)
    }
    100% {
      -o-transform: rotate(0deg)
    }
  }
  @-ms-keyframes rotate {
    0%,
    100% {
      -ms-transform: rotate(360deg)
    }
    100% {
      -ms-transform: rotate(0deg)
    }
  }
  @keyframes rotate {
    0%,
    100% {
      transform: rotate(360deg)
    }
    100% {
      transform: rotate(0deg)
    }
  }
  .rotate-infinite {
    -moz-animation: rotate 2s linear infinite
    -webkit-animation: rotate 2s linear infinite
    -o-animation: rotate 2s linear infinite
    -ms-animation: rotate 2s linear infinite
    animation: rotate 2s linear infinite
  }

  .footer
      width: 100%
      .product-name
        text-align: center
        font-size: .3rem
        color: #8d959c
      .loan-notice
        height: .5rem
        font-size: .2rem
        i
          color: green
          font-size: .34rem
          margin-top: -.01rem

</style>
