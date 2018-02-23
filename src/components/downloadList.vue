<template>
  <div class="download-list">
    <div class="product-item" v-for="item in productList" :key="item.appCode">
      <div class="download-item flex flex-item">
        <img src="~common/image/tueijian_icon_001.png">
        <div class="flex-grow">
          <div class="title">{{item.appName + '（' + item.minPrincipal + '元-' + item.maxPrincipal + '元）'}}</div>
          <div class="desc">{{item.appDescription}}</div>
        </div>
        <i @click="showDetail(item)" :class="{'rotate-270': item.isShow}" class="iconfont icon-117 rotate-90"></i>
      </div>
      <div v-show="item.isShow" class="detail-box">
        <div class="flex flex-item code-info">
          <div class="title">
            借款验证码
          </div>
          <div class="flex-grow text-center code-value">
            <span>{{item.appInvitationCode}}</span>
          </div>
          <div class="copy" @click="copyStr(item.appInvitationCode)">
            复制验证码
          </div>
        </div>
        <h2 class="tip">请牢记借款验证码，借款是需要验证</h2>
        <h3 class="time-line">约{{item.appEffectiveTime}}后失效</h3>
        <div class="button-box">
          <div class="button button-primary" @click="downLoadApp(item)">
            去下载
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    popup,
    doPost,
    log,
    copyStr,
    downLoadApp
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
              result.forEach((item, index) => {
                if (index === 0) {
                  item.isShow = true
                } else {
                  item.isShow = false
                }
              })
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
      },
      downLoadApp: function(item) {
        if (util.isIos()) {
          downLoadApp(item.iosDownloadUrl)
        } else if (util.isAndroid()) {
          downLoadApp(item.androidDownloadUrl)
        }
      }
    },
    mounted: function() {
      this.initPage()
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
      font-size: .24rem
      color: #787878
    .tip
      line-height: .5rem
    .time-line
      padding-top: .1rem
      padding-bottom: .5rem
</style>
