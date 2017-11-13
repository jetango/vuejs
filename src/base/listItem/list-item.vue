<template>
  <div class="list-item flex flex-item">
    <img class="item-logo" src="~common/image/WD_jeikuanjilu_2x_001.png">
    <div class="item-content flex flex-item flex-grow active" @click="toPage">
      <div class="flex-grow">
        <p>借款记录</p>
      </div>
      <img class="icon-back" src="~common/image/ICON_Communal_sanjiao_2x_001.png">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        'msg': 'hello world'
      }
    },
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
    px2rem('height', 100)
    background-color: #fff
    px2rem('padding-left', 40)
    .item-logo
      px2rem('width', 42)
      px2rem('height', 42)
      px2rem('margin-right', 24)
    .item-content
      px2rem('font-size', 25)
      text-align: left
      color: #525252
      height: 100%
      div
        px2rem('margin-top', 3)
      .icon-back
        px2rem('width', 12)
        px2rem('height', 20)
        px2rem('margin-right', 40)
  &:active
    background-color: #e4e5e7
</style>