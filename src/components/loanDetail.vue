<template>
  <div class="loan-detail">
    <div class="list-show flex flex-item active">
      <span>申请时间</span>
      <span v-html="loanInfo.loanTime"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>借款编号</span>
      <span v-html="loanInfo.orderNo"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>借款金额</span>
      <span v-html="loanInfo.loanAmount+'元'"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>借款期限</span>
      <span v-html="loanInfo.borrowTime+'天'"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>放款日期</span>
      <span v-html="loanInfo.payTime"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>约定还款日期</span>
      <span v-html="loanInfo.promiseRepaymentTime"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>利息</span>
      <span v-html="loanInfo.interest+'元'"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>综合费用</span>
      <span v-html="loanInfo.syntheticalFee+'元'"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>到期还款额</span>
      <span v-html="loanInfo.repayTotalAmount+'元'"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>状态说明</span>
      <span :class="{'text-danger': ([40, 70].indexOf(loanInfo.orderStatus) > -1), 'text-success': ([10, 20, 30, 50].indexOf(loanInfo.orderStatus) > -1)}">{{getOrderStatusStr(loanInfo.orderStatus)}}</span>
    </div>
    <p class="check-contract flex flex-item flex-justify" v-if="loanInfo.orderStatus == 50">
      <span @click="checkContract">查看合同</span>
      <i class="icon iconfont icon-117"></i>
    </p>
    <footer-notice></footer-notice>
  </div>
</template>

<script>
  import FooterNotice from 'base/footerNotice/footer-notice'
  import * as types from 'config/api-type'
  import {orderStatus, pageIdentity} from 'common/js/constants'
  import {doPost, popup, navigate, eeLogUBT} from 'common/js/drivers'
  export default {
    data() {
      return {
        loanInfo: {
          applicationTime: '',
          orderNo: '',
          loanAmount: '',
          borrowTime: '',
          loanTime: '',
          promiseRepaymentDate: '',
          actualRepaymentDate: '',
          interest: '',
          syntheticalFee: '',
          repayTotalAmount: '',
          statusDescription: ''
        }
      }
    },
    components: {
      FooterNotice
    },
    mounted: function() {
      this.init()
      eeLogUBT('LoanDetailPage.Load.Goin', 'goin')
    },
    methods: {
      init: function() {
        let param = {
          orderNo: this.orderNo
        }
        doPost(types.BORROW_DETAIL, param, {
          success: (oData) => {
            this.loanInfo = oData.data
          },
          error: (oData) => {
            popup(null, null, oData.msg || '获取数据失败，请稍后再试！')
          }
        })
      },
      checkContract: function() {
        eeLogUBT('LoanDetailPage.Action.Contract', 'click')
        navigate('LOAN_CONTRACT', '借款合同', {url: pageIdentity.LOAN_CONTRACT, param: `orderNo=${this.$route.query.orderNo}`})
      },
      getOrderStatusStr(key) {
        return orderStatus['' + key]
      }
    },
    created() {
      this.orderNo = this.$route.query.orderNo
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"

  .loan-detail
    margin-top: .1rem
    margin-bottom: .5rem

  .list-show
    height: .72rem
    background-color: #fff;
    span
      font-size: .28rem
      margin-left: .4rem
      color: #525252
      &:last-of-type
        position: absolute
        line-height: .72rem
        right: .4rem

  .check-contract
    text-align: center
    font-size: .28rem
    color: #008aff
    margin-top: .3rem
    i
      font-size: .24rem
      margin-top: -.025rem

</style>
