<template>
  <div class="">
    <div class="text-center header flex">
      <a href="#" class="visibility">借款详情</a>
      <div class="flex-grow title">
        借款金额：800元
      </div>
      <a href="#" class="detail">借款详情</a>
    </div>
    <section class="time-line">
      <div class="flex block first actived">
        <div class="icon">
          <i class="iconfont icon-correct-marked"></i>
        </div>
        <div class="content flex-grow">
          <h1>审核通过</h1>
          <h4>审核已经通过！感谢支持！</h4>
          <p><i class="iconfont icon-127"></i>2017-10-27 16:24</p>
        </div>
      </div>
      <div class="flex block actived">
        <div class="icon">
          <i class="iconfont icon-correct-marked"></i>
        </div>
        <div class="content flex-grow">
          <h1>确认银行卡</h1>
          <h4>借款将打到您的招商银行卡尾号4444的账户</h4>
          <p><i class="iconfont icon-127"></i>2017-10-27 16:24</p>
        </div>
      </div>
      <div class="flex block last">
        <div class="icon">
          <i class="iconfont icon-correct-marked"></i>
        </div>
        <div class="content flex-grow">
          <h1>身份认证</h1>
          <h4>确认本人借款，确保资金安全</h4>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    created() {
      console.log('this.$route.query', this.$route.query)
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .header
    height: 1rem
    line-height: 1rem
    margin: .1rem 0
    font-size: .3rem
    background: #fff
    .title
      font-weight: bold
      color: #000
    .detail
      font-size: .3rem
      color: #008aff
      padding-right: .4rem
    .visibility
      visibility: hidden
      padding-left: .4rem
  .time-line
    padding: .52rem
    background: #fff
    .icon
      width: .44rem
      position: relative
      .iconfont
        position: relative
        z-index: 5
        font-size: .44rem
        background: #fff
        color: #ccc
    .content
      padding-bottom: .7rem
      padding-left: .28rem
      h1
        font-size: .28rem
        color: #000
        font-weight: bold
      h4
        font-size: .22rem
        color: #525252
        margin: .12rem 0 .07rem
      p, i
        font-size: .18rem
        color: #8f8f8f
      i
        padding-right: .08rem
      p
        line-height: .2rem
    .block
      position: relative
      &.actived
        .iconfont.icon-correct-marked
          color: #219d00
        .icon:before
          position: absolute
          top: -50%
          left: .205rem
          height: 60%
          width: .03rem
          background: #219d00
          content: ' '
          z-index: 4
        .icon:after
          position: absolute
          top: 0
          left: .205rem
          height: 60%
          width: .03rem
          background: #219d00
          content: ' '
          z-index: 4
        .content
          h1
            color: #219d00
      &:not(.last):before
        position: absolute
        top: 0
        left: .205rem
        height: 100%
        width: .03rem
        background: #ccc
        content: ' '
        z-index: 3
      &.last
        .icon:after
          display: none
      &.first
        .icon:before
          display: none
</style>
