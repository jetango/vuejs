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
      <img id="img" @click="comfirm" src="~common/image/xieyi_tongguo_2x_001.png">
      <span>我已阅读并同意<span>《用户服务协议》</span></span>
    </p>
    <button-item :buttonValue="buttonValue"></button-item>
    <p class="forbid-borrow-stu">禁止学生借款</p>
  </div>
</template>

<script>
  import buttonItem from 'base/button/button-item'
  export default {
    data() {
      return {
        msg: 'hello',
        imgName: '../common/image/xieyi_tongguo_2x_002.png',
        buttonValue: '借款'
      }
    },
    methods: {
      comfirm: function() {
        console.log(document.getElementById('img').src)
      }
    },
    components: {
      buttonItem
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  @import "~common/stylus/mixin"

  .loan-comforim
    px2rem('margin-bottom', 30)
  .loan-info
    background-color: #fff
    px2rem('margin-top', 10)
  .loan-info-item,.input-validate-code
    px2rem('height', 100)
    px2rem('font-size', 28)
    px2rem('padding-left', 40)
    span
      color: #525252
      &:last-of-type
        color: #000000
        px2rem('margin-left', 24)
        px2rem('font-size', 30)
  .item-middle
    px2rem('height', 72)
    span
      &:last-of-type
        color: #525252
        px2rem('font-size', 28)

  .item-bank
    span
      &:last-of-type
        color: #525252
        px2rem('font-size', 28)
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

  .comfirm-protocol
    px2rem('font-size', 20)
    px2rem('margin-top', 10)
    img
      px2rem('width', 30)
      px2rem('height', 30)
      px2rem('margin-right', 3)
      px2rem('margin-top', -2)
    span
      span
        color: #008aff

  .comfirm-protocol
    px2rem('margin-bottom',100)
    px2rem('margin-top',30)

  .forbid-borrow-stu
    color: #9d9d9d
    px2rem('font-size', 22)
    px2rem('margin-top', 10)
</style>
