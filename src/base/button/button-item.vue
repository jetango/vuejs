<template>
  <div class="button">
    <a class="btn" v-html="buttonValue"></a>
  </div>
</template>

<script>
  export default {
    props: ['buttonValue'],
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
  
  .btn
    display:block
    width:90%
    margin: 0 auto
    background-color: #ffa800
    height: .72rem
    border-radius: .06rem
    text-align: center
    line-height: .72rem
    font-size: .3rem
    color: #fff
</style>