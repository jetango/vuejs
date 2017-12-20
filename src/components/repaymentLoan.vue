<template>
  <div class="repayment-loan">
    <div v-for="loanInfo in items" :key="loanInfo.repayTime" class="item-content flex flex-item flex-grow" @click="toPage(loanInfo)">
      <div class="flex-grow">
        <p v-html="'需要还款：&nbsp;' + loanInfo.waitRepayAmount + '元'"></p>
        <p :class="{'overdue': loanInfo.billStatus == '70', 'text-success': loanInfo.repayStatus == '80'}">
          {{loanInfo.repayStatus == '70' ? '逾期中' : (loanInfo.repayStatus == '80' ? '已还清' : ('还款日:' + loanInfo.promiseRepaymentDate))}}
        </p>
      </div>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div v-if="items && items.length == 0">
      <no-data title="暂无借款记录"></no-data>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import NoData from 'base/noData/noData'
  import {doPost, popup, navigate} from 'common/js/drivers'
  import * as types from 'config/api-type'
  import {pageIdentity} from 'common/js/constants'
  export default {
    data() {
      return {
        items: null
      }
    },
    created: function() {
      this.init()
    },
    methods: {
      init: function() {
        doPost(types.REPAY_SCHEDULE, {}, {
          success: (oData) => {
            if (!oData.data || (oData.data && oData.data.length === 0)) {
              this.items = []
            } else {
              this.items = oData.data
            }
          },
          error: (oData) => {
            popup(null, null, oData.msg || '获取数据失败，请稍后再试！')
          }
        })
      },
      toPage: function(loanInfo) {
        let {billNo} = loanInfo
        navigate('REPAYMENT_TIP', '发起还款', {url: pageIdentity.REPAYMENT_TIP, param: `billNo=${billNo}`})
      }
    },
    components: {
      NoData
    }
  }
</script>

<style scoped lang="stylus" stylesheet="stylesheet/stylus">
  @import "~common/stylus/base"

  .item-content
    font-size: .30rem
    text-align: left
    color: #000000
    height: 100%
    height: 1rem
    background-color: #fff
    padding-left: .4rem
    margin-top: .1rem
    div
      margin-top: .03rem
      p
        &:last-of-type
          font-size: .28rem
          margin-top: .08rem
          color: #525252
    .icon-117
      margin-right: .4rem
  &:active
    background-color: #e4e5e7

  .overdue
    color: #c50000 !important

</style>
