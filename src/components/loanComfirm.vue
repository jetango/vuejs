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
        <span>招商银行&nbsp;&nbsp;9743</span>
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
    <a class="btn" @click="comfirm">借款</a>
    <p class="forbid-borrow-stu">禁止学生借款</p>
  </div>
</template>
<script type="text/ecmascript-6">
  import buttonItem from 'base/button/button-item'
  import {doPost} from 'common/js/drivers'
  import * as types from 'config/api-type'
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
        doPost(types.IDENTITY_FETCH, {test: '007'}, {
          success: function(oData) {
            console.log('oData', oData)
            alert('callbacksuccess')
          }
        })
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
    margin-bottom: .5rem
  .loan-info
    background-color: #fff
    margin-top: .1rem
  .loan-info-item,.input-validate-code
    height: 1rem
    font-size: .28rem
    padding-left: .4rem
    span
      color: #525252
      &:last-of-type
        color: #000
        margin-left: .24rem
  .item-middle
    height: .72rem
    span
      &:last-of-type
        color: #525252
        font-size: .28rem
  .item-bank
    span
      &:last-of-type
        color: #525252
        font-size: .28rem
  .input-validate-code
    background-color: #fff
    margin-top: .1rem
    span
      &:last-of-type
        color: #525252
        margin-left: 0
    input
      width: 2.56rem
      height: .76rem
      padding-left: .1rem
      border-radius: .06rem
      background-color: #eeeff3

  .comfirm-protocol,.loan-notice
    font-size: .2rem
    margin-top: .1rem
    img
      width: .3rem
      height: .3rem
      margin-right: .05rem
      margin-top: -.02rem
    span
      span
        color: #008aff
  .btn
    display:block
    width:90%
    margin: 0 auto
    margin-top: .2rem
    background-color: RGB(254,167,0)
    height: .72rem
    border-radius: .06rem
    text-align: center
    line-height: .72rem
    font-size: .3rem
    color: #fff

  .forbid-borrow-stu
    color: #9d9d9d
    font-size: .22rem
    margin-top: .1rem

  .loan-notice
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: .5rem
    background-color: $color-background
</style>
