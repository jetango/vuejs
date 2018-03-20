<template>
  <div class="share-friends">
    <div class="bg-1 item">
      <p>您的好友198****2334</p>
    </div>
    <div class="bg-2 item">
      
    </div>
    <div class="bg-3 item">
      <div class="btn-box">
        下载领现金
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .share-friends
    max-width: 640px
    margin: 0 auto
    .item
      width: 100%
      position: relative
    .bg-1
      height: 3.09rem
      background: url('~common/image/share01.jpg') no-repeat center
      background-size: 100% 100%
      p
        color: #fff
        font-size: .28rem
        position: absolute
        left: 0
        right: 0
        text-align: center
        top: .85rem
    .bg-2
      height: 4rem
      background: url('~common/image/share02.jpg') no-repeat center
      background-size: 100% 100%
    .bg-3
      height: 3.3rem
      background: url('~common/image/share03.jpg') no-repeat center
      background-size: 100% 100%
      .btn-box
        height: 1.2rem
        line-height: 1rem
        text-align: center
        position: absolute
        left: .4rem
        right: .4rem
        font-size: .28rem
        color: #fff
        background: url('~common/image/theme_btn.png') no-repeat center
        background-size: 100% 100%
</style>
