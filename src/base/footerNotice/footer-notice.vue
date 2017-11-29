<template>
  <div class="footer-notice">
    <p class="loan-notice flex flex-item flex-justify">
      <i class="icon iconfont icon-yirenzheng"></i>
      <span>国安级数据加密防护</span>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'hello world'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  @import "~common/stylus/mixin"

  .loan-notice
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: .5rem
    background-color: $color-background
    font-size: .2rem
    i
      color: green
      font-size: .34rem
      margin-top: -.01rem
</style>
