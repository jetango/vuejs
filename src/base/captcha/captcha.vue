<template>
  <div class="alert-item fixed">
    <div class="fixed cover"></div>
    <div class="flex flex-item flex-justify fixed">
      <div class="alert-content">
        <p class="title active">开户验证码</p>
        <div class="tips active">
          <p>系统将以短信形式为新开户用户发送验证码，请输入收到的验证码</p>
          <div class="flex flex-item flex-justify">
            <input type="tel" class="text-center flex-grow" maxlength="6" focuse v-model="code" ref="code" placeholder="请输入验证码">
            <!-- <input type="tel" class="text-center flex-grow" maxlength="1">
            <input type="tel" class="text-center flex-grow" maxlength="1">
            <input type="tel" class="text-center flex-grow" maxlength="1">
            <input type="tel" class="text-center flex-grow" maxlength="1">
            <input type="tel" class="text-center flex-grow" maxlength="1"> -->
          </div>
        </div>
        <p class="button" v-on:click="sendCloseInfo">确定</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      data() {
        return {
          code: ''
        }
      },
      cancelAlert: function() {
      },
      sendCloseInfo: function() {
        let self = this
        this.$emit('listenChildEvent', {
          code: self.code
        })
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
      font-size: .22rem
      line-height: .3rem
      color: #000
      margin-top: .16rem
    input
      padding-top: .5rem
      padding-bottom: .1rem
      outline: 0
      width: 100%
      border-bottom: 1px solid #ccc
      margin-left: .1rem
      margin-right: .1rem
</style>
