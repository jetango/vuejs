<template>
  <div class="loan-detail">
    <div class="list-show flex flex-item active">
      <span>申请时间</span>
      <span>2017-09-09</span>
    </div>
    <div class="list-show flex flex-item active">
      <span>借款编号</span>
      <span>XXXXXXXXXX</span>
    </div>
    <div class="list-show flex flex-item active">
      <span>借款金额</span>
      <span>500元</span>
    </div>
    <div class="list-show flex flex-item active">
      <span>借款期限</span>
      <span>7天</span>
    </div>
    <div class="list-show flex flex-item active">
      <span>放款日期</span>
      <span>2017-09-09</span>
    </div>
    <div class="list-show flex flex-item active">
      <span>约定还款日期</span>
      <span>2017-09-09</span>
    </div>
    <div class="list-show flex flex-item active">
      <span>实际放款日期</span>
      <span>2017-09-09</span>
    </div>
    <div class="list-show flex flex-item active">
      <span>利息</span>
      <span>2元</span>
    </div>
    <div class="list-show flex flex-item active">
      <span>账户管理费</span>
      <span>5元</span>
    </div>
    <div class="list-show flex flex-item active">
      <span>到期还款额</span>
      <span>525元</span>
    </div>
    <div class="list-show flex flex-item active">
      <span>状态说明</span>
      <span>后台审核中</span>
    </div>
    <div class="list-show flex flex-item active">
      <span>各种信息</span>
      <span>上海造艺网络科技有限公司</span>
    </div>
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
        'msg': 'hello world'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  @import "~common/stylus/mixin"

  .loan-detail
    px2rem('margin-top', 10)
    px2rem('margin-bottom', 50)

  .list-show
    px2rem('height', 72)
    background-color: #fff;
    span
      px2rem('font-size', 28)
      px2rem('margin-left', 40)
      color: #525252
      &:last-of-type
        position: absolute
        px2rem('right', 40)

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

  .loan-notice
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    px2rem('height', 50)
    background-color: $color-background
</style>