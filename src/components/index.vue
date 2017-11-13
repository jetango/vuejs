<template>
  <div class="index">
    <img src="~common/image/index.jpg">
    <div class="font-demo">借款记录</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        'msg': 'hello world'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  @import "~common/stylus/mixin"
  .index
    position: relative
    img
      px2rem('width', 640)
      height: auto
    .font-demo
      font-family: '微软雅黑'
      position: absolute
      px2rem('font-size', 25)
      top: 7.5rem
      left: 3.5rem
      color: #525252
</style>