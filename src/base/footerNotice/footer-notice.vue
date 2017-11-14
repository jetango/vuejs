<template>
  <div class="footer-notice">
    <p class="loan-notice flex flex-item flex-justify">
      <img src="~common/image/Communal_anquan_2x_001.png">
      <span>银行级数据加密防护</span>
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
    px2rem('font-size', 20)
    px2rem('margin-top', 10)
    img
      px2rem('width', 30)
      px2rem('height', 30)
      px2rem('margin-right', 3)
      px2rem('margin-top', -2)
    span
      span
        color: #008aff

  .loan-notice
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    px2rem('height', 50)
    background-color: $color-background
    img
      px2rem('width', 44)
      px2rem('height', 44)
</style>