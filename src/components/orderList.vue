<template>
  <div class="order-list">
    <div class="order-pick" v-for="item in orderList" :key="item.orderNo">
      <div @click="showDetail(item)" class="order-item flex flex-item" :class="{'active': item.isShow}">
        <div class="flex-grow">
          {{item.loanTime}} 订单
        </div>
        <i v-show="item.orderStatus !== 10" :class="{'rotate-270': item.isShow}" class="iconfont icon-117 rotate-90"></i>
        <a v-show="item.orderStatus === 10" @click="toEvaluateFlow" href="javascript:;" class="examine-and-verify">审核中</a>
      </div>
      <div v-show="item.isShow && item.orderStatus !== 10" class="source-item flex flex-item active" v-for="app in item.appList" :key="app.appCode">
        <img src="~common/image/tueijian_icon_001.png">
        <!-- <span class="app-bg" :class="[_getBgClass(app.appPhotoKey)]"></span> -->
        <div class="flex-grow">
          <div class="title">{{app.appName}}{{_getPriceDesc(app)}}</div>
          <div class="code">借款验证码 <span @click="_copyStr(app.appInvitationCode)">{{app.appInvitationCode}}</span></div>
          <div class="date">有效期至：{{app.appEffectiveTime}}</div>
        </div>
        <a v-show="app.invitationCodeFlag == 1" href="javascript:;" @click="downLoadApp(app)" class="btn">去下载</a>
        <a v-show="app.invitationCodeFlag == 2" href="javascript:;" class="btn invalid">已使用</a>
        <a v-show="app.invitationCodeFlag == 3" href="javascript:;" class="btn invalid">已过期</a>
      </div>
    </div>
    <no-data v-show="orderList.length === 0"></no-data>
  </div>
</template>

<script type="text/ecmascript-6">
  import NoData from 'base/noData/noData'
  import {
    popup,
    doPost,
    log,
    downLoadApp,
    eeLogUBT, copyStr
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
              if (result) {
                result.forEach((item, index) => {
                  if (index === 0) {
                    item.isShow = true
                  } else {
                    item.isShow = false
                  }
                  // let appList = item.appList
                  // appList.forEach(app => {
                  //   let currentTime = new Date().getTime()
                  //   if (new Date(Date.parse(app.appEffectiveTime.replace(/-/g, '/'))).getTime() > currentTime) {
                  //     app.isValid = true
                  //   } else {
                  //     app.isValid = false
                  //   }
                  // })
                })
                this.orderList = result
              }
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
        eeLogUBT('Order.Action.GoDownLoad', 'click')
        if (util.isIos()) {
          downLoadApp(app.iosDownloadUrl)
        } else if (util.isAndroid()) {
          downLoadApp(app.androidDownloadUrl)
        }
      },
      toEvaluateFlow: function() {
      },
      _getBgClass(key) {
        return `${key}-bg`
      },
      _copyStr(str) {
        copyStr(str)
        eeLogUBT('Order.Action.CopyText', 'click')
      },
      _getPriceDesc(item) {
        let {minPrincipal, maxPrincipal} = item
        let str = ''
        if (Number(minPrincipal) === Number(maxPrincipal)) {
          str = `${maxPrincipal}元`
        } else {
          str = `(${minPrincipal}元-${maxPrincipal}元)`
        }
        return str
      }
    },
    mounted: function() {
      this.initPage()
      eeLogUBT('Order.Load.Goin', 'goin')
    },
    components: {
      NoData
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
