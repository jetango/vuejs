<template>
  <div class="order-list">
    <!-- <div class="order-pick" v-for="item in orderList" :key="item.orderNo">
      <div @click="showDetail(item)" class="order-item flex flex-item" :class="{'active': item.isShow}">
        <div class="flex-grow">
          {{item.loanTime}} 订单
        </div>
        <i v-show="item.orderStatus !== 10 && item.orderStatus !== 21" :class="{'rotate-270': item.isShow}" class="iconfont icon-117 rotate-90"></i>
        <a v-show="item.orderStatus === 10" @click="toEvaluateFlow" href="javascript:;" class="examine-and-verify">审核中</a>
        <a v-show="item.orderStatus === 21" href="javascript:;" class="examine-error">{{item.orderNo}}推荐失败</a>
      </div>
      <div v-show="item.isShow && item.orderStatus !== 10 && item.orderStatus !== 21" class="source-item flex flex-item active" v-for="app in item.appList" :key="app.appCode">
        <img src="~common/image/tueijian_icon_001.png"> -->
        <!-- <span class="app-bg" :class="[_getBgClass(app.appPhotoKey)]"></span> -->
        <!-- <div class="flex-grow">
          <div class="title">{{item.orderStatus == '50' ? app.appName : ''}}{{_getPriceDesc(app)}}</div>
          <div class="code">借款验证码 <span @click="_copyStr(app.appInvitationCode)">{{app.appInvitationCode}}</span></div>
          <div class="date">有效期至：{{app.appEffectiveTime}}</div>
        </div>
        <a v-show="app.invitationCodeFlag == 1" href="javascript:;" @click="downLoadApp(app)" class="btn">去下载</a>
        <a v-show="app.invitationCodeFlag == 2" href="javascript:;" class="btn invalid">已使用</a>
        <a v-show="app.invitationCodeFlag == 3" href="javascript:;" class="btn invalid">已过期</a>
      </div>
    </div> -->
    <div class="order-item flex flex-item" @click="goPage(item.orderStatus, item.orderNo)" v-for="item in orderList" :key="item.orderNo">
      <div class="order-desc flex-grow">
        <p>订单号&nbsp;{{item.orderNo}}</p>
        <p v-html="_getPriceDesc(item)"></p>
        <p>{{item.loanTime}}</p>
      </div>
      <span v-show="item.orderStatus == 211">推送中</span>
      <span v-show="item.orderStatus == 212">已失败</span>
      <span v-show="item.orderStatus == 203">已过期</span>
      <span v-show="item.orderStatus == 201">去借款</span>
      <span v-show="item.orderStatus == 202">已使用</span>
      <span style="margin-right: .18rem" v-show="item.orderStatus == 10">审核中</span>
      <i v-show="item.orderStatus != 10" class="iconfont icon-117"></i>
    </div>
    <no-data v-show="orderList !== null && orderList.length === 0"></no-data>
  </div>
</template>

<script type="text/ecmascript-6">
  import NoData from 'base/noData/noData'
  import {
    popup,
    doPost,
    log,
    eeLogUBT,
    navigate
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  import {pageIdentity} from 'common/js/constants'
  export default {
    data() {
      return {
        orderList: null
      }
    },
    methods: {
      initPage: function() {
        doPost(types.BORROW_RECORD, {}, {
          success: (oData) => {
            if (oData.status === '0') {
              this.orderList = oData.data || []
            }
          },
          error: (oData) => {
            log('', oData)
            popup('', '', oData.msg || '保存信息失败')
          }
        })
      },
      _getPriceDesc(item) {
        let {appInvitationCode, borrowPeriods, loanAmount, orderStatus} = item
        // curRecommendCount = curRecommendCount < maxRecommendCount ? curRecommendCount : maxRecommendCount
        let str = ''
        if (orderStatus === 211) {
          str = `（${loanAmount}元${borrowPeriods}期,持续推送中` // ${curRecommendCount}/${maxRecommendCount}）
        } else if (orderStatus === 212) {
          str = `（${loanAmount}元${borrowPeriods}期,已全部推送` // ${maxRecommendCount}/${maxRecommendCount}）
        } else if (orderStatus === 203) {
          str = `（${loanAmount}元${borrowPeriods}期,借款验证码<a style="text-decoration: underline">${appInvitationCode}</a>）`
        } else if (orderStatus === 201) {
          str = `（${loanAmount}元${borrowPeriods}期,借款验证码<a style="text-decoration: underline">${appInvitationCode}</a>）`
        } else if (orderStatus === 202) {
          str = `（${loanAmount}元${borrowPeriods}期,借款验证码<a style="text-decoration: underline">${appInvitationCode}</a>）`
        } else if (orderStatus === 10) {
          str = `（${loanAmount}元${borrowPeriods}期）`
        }
        return str
      },
      goPage: function(orderStatus, orderNo) {
        if (orderStatus === 211) {
          navigate('PUSH_FAILURE', '推送结果', {url: pageIdentity.PUSH_FAILURE, param: `orderNo=${orderNo}`})
        } else if (orderStatus === 212) {
          navigate('PUSH_FAILURE', '推送结果', {url: pageIdentity.PUSH_FAILURE, param: `orderNo=${orderNo}`})
        } else if (orderStatus === 203) {
          navigate('DOWNLOAD_LIST', '推送结果', {url: pageIdentity.DOWNLOAD_LIST, param: `orderNo=${orderNo}`})
        } else if (orderStatus === 201) {
          navigate('DOWNLOAD_LIST', '推送结果', {url: pageIdentity.DOWNLOAD_LIST, param: `orderNo=${orderNo}`})
        } else if (orderStatus === 202) {
          navigate('DOWNLOAD_LIST', '推送结果', {url: pageIdentity.DOWNLOAD_LIST, param: `orderNo=${orderNo}`})
        } else if (orderStatus === 10) {
          return false
        }
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
  // .order-pick
  //   margin-bottom: .1rem

  // .order-item, .source-item
  //   background: #fff
  //   padding-left: .4rem
  //   padding-right: .4rem
  // .order-item
  //   height: .8rem
  //   .examine-and-verify
  //     text-decoration:underline
  //   .examine-error
  //     color: red
  //     font-size: .2rem
  // .source-item
  //   img
  //     margin-right: .1rem
  //     width: .88rem
  //     height: .88rem
  //   height: 1.42rem
  //   .title
  //     font-size: .24rem
  //     color: #787878
  //   .code
  //     font-size: .22rem
  //     color: #939393
  //     padding: .1rem 0 .08rem
  //     > span
  //       color: #585858
  //       text-decoration:underline
  //   .date
  //     color: #939393
  //     font-size: .22rem
  //   .btn
  //     color: #00a4ff
  //     font-size: .28rem
  //     border: 1px solid #00a4ff
  //     padding: 0.08rem 0.12rem
  //     border-radius: .08rem
  //     &.disabled
  //       color: #525252
  //       border-color: #525252
  //   .invalid
  //     color: #525252
  //     border-color: #525252

  .order-item
    margin-top:.1rem
    background-color: #ffffff
    padding-left: .3rem
    padding-right: .3rem
    height: 1.2rem
    .order-desc
      p
        font-size: .28rem
        color: #525252
        &:nth-of-type(2)
          font-size: .22rem
          color: #939393
          margin-top: .1rem

        &:last-of-type
          font-size: .22rem
          color: #939393
          margin-top: .1rem
    span
      font-size: .26rem
      color: #525252
      white-space:nowrap


</style>
