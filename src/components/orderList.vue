<template>
  <div class="order-list">
    <div class="order-pick" v-for="item in orderList" :key="item.orderNo">
      <div class="order-item flex flex-item" :class="{'active': item.isShow}">
        <div class="flex-grow">
          {{item.createTime}} 订单
        </div>
        <i @click="showDetail(item)" v-show="item.orderStatus === '10'" :class="{'rotate-270': item.isShow}" class="iconfont icon-117 rotate-90"></i>
        <a v-show="item.orderStatus === '20'" @click="toEvaluateFlow" href="javascript:;" class="examine-and-verify">审核中</a>
      </div>
      <div v-show="item.isShow" class="source-item flex flex-item active" v-for="app in item.appList" :key="app.appCode">
        <img src="~common/image/tueijian_icon_001.png">
        <div class="flex-grow">
          <div class="title">{{app.appName + '（' + app.minPrincipal + '元-' + app.maxPrincipal + '元）'}}</div>
          <div class="code">借款验证码 <span>{{app.appInvitationCode}}</span></div>
          <div class="date">有效期至：{{app.validDate}}</div>
        </div>
        <a v-show="app.isValid" href="javascript:;" @click="downLoadApp(app)" class="btn">去下载</a>
        <a v-show="!app.isValid" href="javascript:;" class="btn invalid">已过期</a>
      </div>
    </div>

    <!-- <div class="source-item flex flex-item">
      <img src="~common/image/tueijian_icon_001.png">
      <div class="flex-grow">
        <div class="title">大行贷（5000元-10000元）</div>
        <div class="code">借款验证码 <span>BA31AD4821</span></div>
        <div class="date">已过期</div>
      </div>
      <a href="javascript:;" class="btn disabled">已过期</a>
    </div> -->

    <!-- <div class="order-item flex flex-item">
      <div class="flex-grow">
        2018/01/30 订单
      </div>
      <i class="iconfont icon-117 rotate-270"></i>
    </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    popup,
    doPost,
    log,
    downLoadApp
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  import util from 'common/js/util.js'
  export default {
    data() {
      return {
        orderList: []
      }
    },
    methods: {
      initPage: function() {
        doPost(types.BORROW_RECORD, {}, {
          success: (oData) => {
            if (oData.status === '0') {
              let result = oData.data
              result.forEach((item, index) => {
                if (index === 0) {
                  item.isShow = true
                } else {
                  item.isShow = false
                }
                let appList = item.appList
                appList.forEach(app => {
                  let currentTime = new Date().getTime()
                  let validDate = new Date(Number(app.appEffectiveTime))
                  let year = validDate.getFullYear()
                  let month = validDate.getMonth() + 1
                  let day = validDate.getDate()
                  let validDateStr = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
                  app.validDate = validDateStr
                  if (app.appEffectiveTime > currentTime) {
                    app.isValid = true
                  } else {
                    app.isValid = false
                  }
                })
              })
              this.orderList = result
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
      downLoadApp: function(app) {
        if (util.isIos()) {
          downLoadApp(app.iosDownloadUrl)
        } else if (util.isAndroid()) {
          downLoadApp(app.androidDownloadUrl)
        }
      },
      toEvaluateFlow: function() {
      }
    },
    mounted: function() {
      this.initPage()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .order-list
    padding-top: .1rem

  .order-pick
    margin-bottom: .1rem

  .order-item, .source-item
    background: #fff
    padding-left: .4rem
    padding-right: .4rem
  .order-item
    height: .8rem
    .examine-and-verify
      text-decoration:underline
  .source-item
    img
      margin-right: .1rem
      width: .88rem
      height: .88rem
    height: 1.42rem
    .title
      font-size: .24rem
      color: #787878
    .code
      font-size: .22rem
      color: #939393
      padding: .1rem 0 .08rem
      > span
        color: #585858
        text-decoration:underline
    .date
      color: #939393
      font-size: .22rem
    .btn
      color: #00a4ff
      font-size: .28rem
      border: 1px solid #00a4ff
      padding: 0.08rem 0.12rem
      border-radius: .08rem
      &.disabled
        color: #525252
        border-color: #525252
    .invalid
      color: #525252
      border-color: #525252
</style>
