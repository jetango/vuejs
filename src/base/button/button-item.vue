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
    px2rem('height', 72)
    px2rem('border-radius', 6)
    text-align: center
    px2rem('line-height ', 72)
    px2rem('font-size', 30)
    color: #fff
</style>