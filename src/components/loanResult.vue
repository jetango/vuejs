<template>
  <div class="">
    <div class="text-center header flex">
      <a class="visibility">借款详情</a>
      <div class="flex-grow title">
        借款金额：{{loadResult.loanAmount}}元
      </div>
      <a @click="checkLoanDetail" class="detail">借款详情</a>
    </div>
    <section class="time-line">
      <div class="flex block first" :class="{'actived': orderStatusLength >= 1}">
        <div class="icon">
          <i class="iconfont icon-correct-marked"></i>
        </div>
        <div class="content flex-grow">
          <h1>审核中</h1>
          <h4>{{orderStatusLength >= 1 ? '审核已经通过！感谢支持！' : '请耐心等待审核预计需要1分钟'}}</h4>
          <p v-show="orderStatusLength >= 1"><i class="iconfont icon-127"></i>{{orderStatusLength >= 1 ? loadResult.orderStatusList[0].statusTime : ''}}</p>
        </div>
      </div>
      <div class="flex block"  :class="{actived: orderStatusLength >= 2}">
        <div class="icon">
          <i class="iconfont icon-correct-marked"></i>
        </div>
        <div class="content flex-grow">
          <h1>{{orderStatusLength >= 2 && loadResult.auditStatus == 0 ? '未通过审核' : '审核完成'}}</h1>
          <h4>123</h4>
          <p v-show="orderStatusLength >= 2"><i class="iconfont icon-127"></i>{{orderStatusLength >= 2 ? loadResult.orderStatusList[1].statusTime : ''}}</p>
        </div>
      </div>
      <div class="flex block"  :class="{actived: orderStatusLength >= 3}">
        <div class="icon">
          <i class="iconfont icon-correct-marked"></i>
        </div>
        <div class="content flex-grow">
          <h1>待放款</h1>
          <h4>请耐心等待预计需要1分钟</h4>
          <p v-show="orderStatusLength >= 3"><i class="iconfont icon-127"></i>{{orderStatusLength >= 3 ? loadResult.orderStatusList[2].statusTime : ''}}</p>
        </div>
      </div>
      <div class="flex block last" :class="{actived: orderStatusLength >= 4}">
        <div class="icon">
          <i class="iconfont icon-correct-marked"></i>
        </div>
        <div class="content flex-grow">
          <h1>{{orderStatusLength >= 4 && loadResult.orderStatusList[3].statusCode == '40' ? '放款失败' : '已放款'}}</h1>
          <h4 v-show="!(orderStatusLength >= 4 && loadResult.orderStatusList[3].statusCode == '40')">借款{{orderStatusLength < 4 ? '将' : '已经'}}打到您的招商银行卡尾号{{loadResult.bankAccount}}的账户</h4>
          <h4>确认本人借款，确保资金安全</h4>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import {doPost} from 'common/js/drivers'
  import * as types from 'config/api-type'

  export default {
    data() {
      return {
        loadResult: {
          loanAmount: '',
          borrowingTime: '',
          syntheticalFee: '',
          auditStatus: 1,
          bankAccount: '',
          orderStatusList: []
        }
      }
    },
    created() {
      this.orderNo = this.$route.query.orderNo
    },
    computed: {
      orderStatusLength() {
        return this.loadResult.orderStatusList.length
      }
    },
    mounted() {
      this._fetchLoadResult()
    },
    methods: {
      checkLoanDetail: function() {
        // this.$router.push('loan-detail')
      },
      _fetchLoadResult() {
        let self = this
        doPost(types.BORROW_RESULT, {orderNo: this.orderNo}, {
          success: function(oData) {
            if (oData.status === '0') {
              self.loadResult = oData.data
            }
          },
          error: function(oData) {
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .header
    height: 1rem
    line-height: 1rem
    margin: .1rem 0
    font-size: .3rem
    background: #fff
    .title
      font-weight: bold
      color: #000
    .detail
      font-size: .3rem
      color: #008aff
      padding-right: .4rem
    .visibility
      visibility: hidden
      padding-left: .4rem
  .time-line
    padding: .52rem
    background: #fff
    .icon
      width: .44rem
      position: relative
      .iconfont
        position: relative
        z-index: 5
        font-size: .44rem
        background: #fff
        color: #ccc
    .content
      padding-bottom: .7rem
      padding-left: .28rem
      h1
        font-size: .28rem
        color: #000
        font-weight: bold
      h4
        font-size: .22rem
        color: #525252
        margin: .12rem 0 .07rem
      p, i
        font-size: .18rem
        color: #8f8f8f
      i
        padding-right: .08rem
      p
        line-height: .2rem
    .block
      position: relative
      &.actived
        .iconfont.icon-correct-marked
          color: #219d00
        .icon:before
          position: absolute
          top: -50%
          left: .205rem
          height: 60%
          width: .03rem
          background: #219d00
          content: ' '
          z-index: 4
        .icon:after
          position: absolute
          top: 0
          left: .205rem
          height: 60%
          width: .03rem
          background: #219d00
          content: ' '
          z-index: 4
        .content
          h1
            color: #219d00
      &:not(.last):before
        position: absolute
        top: 0
        left: .205rem
        height: 100%
        width: .03rem
        background: #ccc
        content: ' '
        z-index: 3
      &.last
        .icon:after
          display: none
      &.first
        .icon:before
          display: none
</style>
