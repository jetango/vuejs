<template>
  <transition name="fade">
    <div class="toast fixed" v-if="toast.showToast">
      <div class="content">
        <div class="show-title"></div>
        <div class="title">{{toast.showTitle}}</div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['toast'],
    data() {
      return {
        msg: ''
      }
    },
    methods: {
      changeShow: function() {
        setTimeout(() => {
          this.toast.showToast = false
        }, 3000)
      }
    },
    mounted: function() {
      this.changeShow()
    }
  }
</script>

<style scoped lang="stylus" type="stylesheet/stylus">
  @import "~common/stylus/base"

  .fixed
    position: fixed
    top: 0
    left: 0
    width: 100%
    height 100%
    z-index: 1000

  .content
    position:fixed
    left: 0
    top: 3rem
    width: 100%
    height: .6rem
    .show-title
      height: .6rem
      width: 4.48rem
      border-radius: .3rem
      background-color: #000000
      margin: 0 auto
      line-height: .65rem
      font-size .26rem
      text-align: center
      opacity: .7
    .title
      height: .6rem
      line-height: .6rem
      text-align: center
      position: absolute
      left: 0
      top: 0
      width: 100%
      color: #ffffff

  .toast
    opacity: 0

  .fade-enter-active, .fade-leave-active
    transition: opacity 4s ease;

  .fade-enter
    opacity: 1

</style>