<template>
  <div class="loan-comforim">
    <div class="loan-info">
      <div class="loan-info-item flex flex-item active">
        <span>贷款金额:</span>
        <span>800元</span>
      </div>
      <div class="loan-info-item flex flex-item">
        <span>贷款时间:</span>
        <span>7天</span>
      </div>
    </div>
    <div class="loan-info">
      <div class="loan-info-item item-middle flex flex-item active">
        <span>利息:</span>
        <span>1元</span>
      </div>
      <div class="loan-info-item item-middle flex flex-item active">
        <span>综合费用:</span>
        <span>9元</span>
      </div>
      <div class="loan-info-item item-middle flex flex-item active">
        <span>到账金额:</span>
        <span>990元</span>
      </div>
      <div class="loan-info-item item-middle flex flex-item">
        <span>应还金额:</span>
        <span>1010元</span>
      </div>
    </div>
    <div class="loan-info">
      <div class="loan-info-item item-bank flex flex-item active">
        <span>到账账户:</span>
        <span>招商银行&nbsp;&nbsp;9743
            </span>
      </div>
      <!-- <div class="loan-info-item item-bank flex flex-item active">
            <span>手机号:</span>
            <span>15959369312</span>
          </div> -->
    </div>
    <!-- <div class="input-validate-code flex flex-item">
            <span>手机号:</span>
            <input type="text" placeholder="请输入验证码">
        </div> -->
    <p class="comfirm-protocol flex flex-item flex-justify">
      <img @click="comfirm" src="~common/image/xieyi_tongguo_2x_002.png">
      <span>我已阅读并同意<span>《用户服务协议》</span></span>
    </p>
    <a class="btn">借款</a>
    <p class="forbid-borrow-stu">禁止学生借款</p>
    <p class="loan-notice flex flex-item flex-justify">
      <img src="~common/image/xieyi_tongguo_2x_001.png">
      <span>银行级数据加密防护</span>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'hello',
        imgName: ''
      }
    },
    methods: {
      comfirm: function() {
        console.log(this)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  @import "~common/stylus/mixin"
  
  .loan-comforim
    px2rem('margin-bottom', 50)
  .loan-info
    background-color: #fff
    px2rem('margin-top', 10)
  .loan-info-item,.input-validate-code
    px2rem('height', 100)
    px2rem('font-size', 25)
    px2rem('padding-left', 40)
    span
      color: #525252
      &:last-of-type
        color: #000000
        px2rem('margin-left', 24)
    
  .item-middle
    px2rem('height', 72)
    span
      &:last-of-type
        color: #525252

  .item-bank
    span
      &:last-of-type
        color: #525252
  
  .input-validate-code
    background-color: #fff
    px2rem('margin-top', 10)
    span
      &:last-of-type
        color: #525252
        px2rem('margin-left', 0)
    input
      px2rem('width', 256)
      px2rem('height', 76)
      px2rem('padding-left', 10)
      px2rem('border-radius', 6)
      background-color: #eeeff3

  .comfirm-protocol,.loan-notice
    px2rem('font-size', 20)
    px2rem('margin-top', 10)
    img
      px2rem('width', 30)
      px2rem('height', 30)
      px2rem('margin-right', 5)
      px2rem('margin-top', -2)
    span
      span
        color: #008aff
  .btn
    display:block
    width:90%
    margin: 0 auto
    px2rem('margin-top', 20)
    background-color: RGB(254,167,0)
    px2rem('height', 72)
    px2rem('border-radius', 6)
    text-align: center
    px2rem('line-height ', 72)
    px2rem('font-size', 30)
    color: #fff

  .forbid-borrow-stu
    color: #9d9d9d
    px2rem('font-size', 22)
    px2rem('margin-top', 10)

  .loan-notice
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    px2rem('height', 50)
    background-color: $color-background
</style>