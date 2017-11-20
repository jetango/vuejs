<template>
  <div class="repayment-loan">
    <div v-for="loanInfo in items" :key="loanInfo.repayTime" class="item-content flex flex-item flex-grow" @click="toPage(loanInfo)">
      <div class="flex-grow">
        <p v-html="'需要还款:&nbsp;' + loanInfo.repayAmount + '元'"></p>
        <p :class="{'overdue': loanInfo.repayStatus == 'F07' ? true : false}">{{loanInfo.repayStatus == 'F07' ? '逾期中' : '还款日:' + loanInfo.repayTime}}</p>
      </div>
      <i class="icon iconfont icon-117"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    doPost
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        items: []
      }
    },
    created: function() {
      this.init()
    },
    methods: {
      init: function() {
        doPost(types.REPAY_SCHEDULE, {}, {
          success: (oData) => {
            console.log(oData)
            this.items = oData.data
          }
        })
      },
      toPage: function(loanInfo) {
        this.$router.push('repayment-tip')
      }
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