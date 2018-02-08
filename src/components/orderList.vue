<template>
  <div class="order-list">
    <div class="order-item flex flex-item">
      <div class="flex-grow">
        2018/01/30 订单
      </div>
      <i class="iconfont icon-117 rotate-90"></i>
    </div>

    <div class="source-item flex flex-item">
      <img src="~common/image/tueijian_icon_001.png">
      <div class="flex-grow">
        <div class="title">大行贷（5000元-10000元）</div>
        <div class="code">借款验证码 <span>BA31AD4821</span></div>
        <div class="date">日期：2018/12/12</div>
      </div>
      <a href="javascript:;" class="btn">去下载</a>
    </div>

    <div class="source-item flex flex-item">
      <img src="~common/image/tueijian_icon_001.png">
      <div class="flex-grow">
        <div class="title">大行贷（5000元-10000元）</div>
        <div class="code">借款验证码 <span>BA31AD4821</span></div>
        <div class="date">已过期</div>
      </div>
      <a href="javascript:;" class="btn disabled">已过期</a>
    </div>

    <div class="order-item flex flex-item">
      <div class="flex-grow">
        2018/01/30 订单
      </div>
      <i class="iconfont icon-117 rotate-270"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"

  .order-item, .source-item
    background: #fff
    margin-bottom: .1rem
    padding-left: .4rem
    padding-right: .4rem
  .order-item
    height: .8rem
  .source-item
    img
      margin-right: .1rem
    height: 1.42rem
    .title
      font-size: .24rem
      color: #787878
    .code
      font-size: .22rem
      color: #939393
      padding: .1rem 0 .08rem
      > span
        color: #585858
        text-decoration:underline
    .date
      color: #939393
      font-size: .22rem
    .btn
      color: #00a4ff
      font-size: .28rem
      border: 1px solid #00a4ff
      padding: 0.08rem 0.12rem
      border-radius: .08rem
      &.disabled
        color: #525252
        border-color: #525252
</style>
