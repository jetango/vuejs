<template>
  <div class="list-item flex flex-item">
    <div class="item-content flex flex-item flex-grow active" @click="toPage">
      <div class="flex-grow">
        <p v-html="'借款记录:&nbsp;' + loanInfo.amount + '元'"></p>
        <p v-html="loanInfo.isPay ? '已还款' : loanInfo.borrowTime"></p>
      </div>
      <i class="icon iconfont icon-117"></i>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['loanInfo'],
    methods: {
      toPage: function() {
        console.log(1)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  @import "~common/stylus/mixin"
  
  .list-item
    height: 1rem
    background-color: #fff
    padding-left: .4rem
    margin-top: .1rem
    .item-logo
      width: .42rem
      height: .42rem
      margin-right: .24rem
    .item-content
      font-size: .30rem
      text-align: left
      color: #000000
      height: 100%
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