<template>
  <div class="alert-item fixed">
    <div class="fixed cover"></div>
    <div class="flex flex-item flex-justify fixed">
      <div class="alert-content">
        <p class="title active">应还组成</p>
        <div class="tips active">
          <p>本金：{{loanDetail.loanAmount}}元</p>
          <p>利息：{{loanDetail.interest}}元</p>
          <p>年化利率：{{loanDetail.annualizedRate}}%</p>
        </div>
        <p class="button" v-on:click="sendCloseInfo">我知道了</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['loanDetail'],
    methods: {
      cancelAlert: function() {
        console.log(this)
      },
      sendCloseInfo: function() {
        this.$emit('listenChildEvent', false)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .fixed
    position: fixed
    top: 0
    left: 0
    width: 100%
    height 100%
    z-index: 1000

  .cover
    background-color: #000000
    opacity: .5

  .alert-content
    width: 4.16rem
    background-color: #ffffff
    border-radius: .16rem

  .title,.button
    height: .68rem
    text-align: center
    line-height: .68rem
    color: #000000
    font-size: .28rem

  .button
    color: #0079ff

  .active:after
    left: 0 !important

  .tips
    padding: .06rem .3rem .25rem .3rem
    p
      font-size: .26rem
      color: #000000
      margin-top: .16rem
      &:last-of-type
        font-size: .22rem
        margin-top: .13rem
        line-height: .35rem

</style>
