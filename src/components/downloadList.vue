<template>
  <div class="download-list">
    <div class="product-item" v-for="item in productList" :key="item.appCode">
      <div class="download-item flex flex-item" @click="showDetail(item)">
        <img src="~common/image/tueijian_icon_001.png">
        <!-- <span class="app-bg" :class="[_getBgClass(item.appPhotoKey)]"></span> -->
        <div class="flex-grow">
          <div class="title">{{_getPriceDesc(item)}}</div>
          <div class="desc">{{item.appDescription}}</div>
        </div>
        <i :class="{'rotate-270': item.isShow}" class="iconfont icon-117 rotate-90"></i>
      </div>
      <div v-show="item.isShow" class="detail-box">
        <div class="flex flex-item code-info">
          <div class="title">
            借款验证码
          </div>
          <div class="flex-grow text-center code-value">
            <span>{{item.appInvitationCode}}</span>
          </div>
          <div class="copy" v-if="item.invitationCodeFlag == 1" @click="copyStr(item.appInvitationCode)">
            复制验证码
          </div>
          <div class="copy" style="color: #939393" v-if="item.invitationCodeFlag == 2">
            已使用
          </div>
          <div class="copy" style="color: #939393" v-if="item.invitationCodeFlag == 3">
            已过期
          </div>
        </div>
        <h2 class="tip">借款验证码仅为推荐作用，不作为最终放款依据</h2>
        <h3 class="time-line">约{{item.appEffectiveTime}}后失效</h3>
        <div class="button-box">
          <div v-if="item.invitationCodeFlag == 1" class="button button-primary" @click="downLoadApp(item)">
            去下载
          </div>
          <div v-if="item.invitationCodeFlag == 2" class="button button-grey">
            已使用
          </div>
          <div v-if="item.invitationCodeFlag == 3" class="button button-grey">
            已过期
          </div>
        </div>
      </div>
    </div>
    <p class="tip-bottom">
      <img class="img-size" src="~common/image/zhushi_tuan_001.png">
      请按时还款，逾期记录将上传人民银行征信中心
      <img class="img-size rotate-180" src="~common/image/zhushi_tuan_001.png">
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    popup,
    doPost,
    log,
    copyStr,
    downLoadApp,
    eeLogUBT
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  import util from 'common/js/util.js'
  export default {
    data() {
      return {
        isShow: true,
        productList: []
      }
    },
    methods: {
      initPage: function() {
        doPost(types.PRODUCT_DOWNLOAD, {
          orderNo: this.$route.query.orderNo
        }, {
          success: (oData) => {
            if (oData.status === '0') {
              let result = oData.data
              if (result) {
                result.forEach((item, index) => {
                  if (index === 0) {
                    item.isShow = true
                  } else {
                    item.isShow = false
                  }
                })
              }
              this.productList = result
            }
          },
          error: (oData) => {
            log('', oData)
            popup('', '', oData.msg || '保存信息失败')
          }
        })
      },
      showDetail: function(item) {
        item.isShow = !item.isShow
      },
      copyStr: function(str) {
        copyStr(str)
        eeLogUBT('RecommendResultPage.Action.CopyText', 'click')
      },
      downLoadApp: function(item) {
        if (util.isIos()) {
          downLoadApp(item.iosDownloadUrl)
        } else if (util.isAndroid()) {
          downLoadApp(item.androidDownloadUrl)
        }
        eeLogUBT('RecommendResultPage.Action.GoDownLoad', 'click')
      },
      _getBgClass(key) {
        return `${key}-bg`
      },
      _getPriceDesc(item) {
        let {minPrincipal, maxPrincipal, maxLoanDay} = item
        let str = ''
        if (Number(minPrincipal) === Number(maxPrincipal)) {
          str = `${maxPrincipal}元，${maxLoanDay}期`
        } else {
          str = `(${minPrincipal}元-${maxPrincipal}元)，${maxLoanDay}期`
        }
        return str
      }
    },
    mounted: function() {
      this.initPage()
      eeLogUBT('RecommendResultPage.Load.Goin', 'goin')
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .download-list
    padding-bottom: 1rem
  .download-item
    height: 1.42rem
    background: #fff
    padding: 0 .4rem
    margin-top: .1rem
    > img
      padding-right: .1rem
      width: .88rem
      height: .88rem
    .title
      font-size: .24rem
      color: #787878
    .desc
      font-size: .2rem
      color: #939393
      padding-top: .1rem
  .detail-box
    padding: .5rem .4rem
    background: #fff
    position: relative
    &:after
      position: absolute
      top: 0
      left: 0
      right: 0
      content: ''
      height: 1px
      background-color: #e8e8e8
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5)
    .code-info
      .title
        font-size: .28rem
        color: #525252
      .code-value
        font-size: .36rem
        color: #585858
        > span
          text-decoration: underline
      .copy
        font-size: .28rem
        color: #00a4ff
    .tip, .time-line
      font-size: .22rem
      color: #787878
    .tip
      line-height: .5rem
    .time-line
      padding-top: .1rem
      padding-bottom: .5rem

  .tip-bottom
    font-size: .22rem
    margin-top: 1rem
    margin-bottom: 1rem
    text-align: center
    color: #2a89c7
    .img-size
      width: .4rem
      height: .24rem
      vertical-align: middle

  .button-grey
    background-color: #939393 !important
    color: #fff
    
</style>
