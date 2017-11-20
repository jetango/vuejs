<template>
  <div class="loan-detail">
    <div class="list-show flex flex-item active">
      <span>申请时间</span>
      <span v-html="loanInfo.applicationTime"></span>
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
      <span v-html="loanInfo.borrowingTime+'天'"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>放款日期</span>
      <span v-html="loanInfo.loanTime"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>约定还款日期</span>
      <span v-html="loanInfo.promiseRepaymentDate"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>实际放款日期</span>
      <span v-html="loanInfo.actualRepaymentDate"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>利息</span>
      <span v-html="loanInfo.interest+'元'"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>账户管理费</span>
      <span v-html="loanInfo.accountManageFee+'元'"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>到期还款额</span>
      <span v-html="loanInfo.repayAmount+'元'"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>状态说明</span>
      <span v-html="loanInfo.statusDescription"></span>
    </div>
    <div class="list-show flex flex-item active">
      <span>各种信息</span>
      <span>上海造艺网络科技有限公司</span>
    </div>
    <p class="check-contract flex flex-item flex-justify">
      <span @click="checkContract">查看合同</span>
      <i class="icon iconfont icon-117"></i>
    </p>
    <footer-notice></footer-notice>
  </div>
</template>

<script>
  import FooterNotice from 'base/footerNotice/footer-notice'
  import * as types from 'config/api-type'
  import {
    doPost, popup
  } from 'common/js/drivers'
  export default {
    data() {
      return {
        loanInfo: {
          applicationTime: '',
          orderNo: '',
          loanAmount: '',
          borrowingTime: '',
          loanTime: '',
          promiseRepaymentDate: '',
          actualRepaymentDate: '',
          interest: '',
          accountManageFee: '',
          repayAmount: '',
          statusDescription: ''
        }
      }
    },
    components: {
      FooterNotice
    },
    created: function() {
      this.init()
    },
    methods: {
      init: function() {
        let param = {
          orderNo: '1681688'
        }
        doPost(types.BORROW_DETAIL, param, {
          success: (oData) => {
            console.log('oData', oData)
            this.$data.loanInfo = oData.data
          },
          error: (oData) => {
            popup(null, null, oData.msg || '获取数据失败，请稍后再试！')
          }
        })
      },
      checkContract: function() {
        console.log('check contract')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  @import "~common/stylus/mixin"

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