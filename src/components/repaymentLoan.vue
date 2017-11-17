<template>
  <div class="repayment-loan">
    <div v-for="loanInfo in items" :key="loanInfo.borrowTime" class="item-content flex flex-item flex-grow" @click="toPage(loanInfo)">
      <div class="flex-grow">
        <p v-html="'需要还款:&nbsp;' + loanInfo.amount + '元'"></p>
        <p v-html="loanInfo.isPay ? '已还款' : '还款日:' + loanInfo.borrowTime"></p>
      </div>
      <i class="icon iconfont icon-117"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        items: [{
          amount: '8900',
          isPay: true,
          borrowTime: '2017-12-09'
        }, {
          amount: '8900',
          isPay: false,
          borrowTime: '2017-12-09'
        }, {
          amount: '8900',
          isPay: false,
          borrowTime: '2017-12-09'
        }]
      }
    },
    methods: {
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

</style>