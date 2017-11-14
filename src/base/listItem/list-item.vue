<template>
  <div class="list-item flex flex-item">
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
    height: 1rem
    background-color: #fff
    padding-left: .4rem
    .item-logo
      width: .42rem
      height: .42rem
      margin-right: .24rem
    .item-content
      font-size: .28rem
      text-align: left
      color: #525252
      height: 100%
      div
        margin-top: .03rem
      .icon-back
        width: .12rem
        height: .2rem
        margin-right: .4rem
  &:active
    background-color: #e4e5e7
</style>