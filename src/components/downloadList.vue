<template>
  <div class="download-list">
    <div class="download-item flex flex-item">
      <img src="~common/image/Communal_nyd_2x_001.png">
      <div class="flex-grow">
        <div class="title">大行贷（5000元-10000元）</div>
        <div class="desc">放款快，额度高</div>
      </div>
      <i class="iconfont icon-117 rotate-90"></i>
    </div>
    <div class="detail-box">
      <div class="flex flex-item code-info">
        <div class="title">
          借款验证码
        </div>
        <div class="flex-grow text-center code-value">
          <span>BA31A4</span>
        </div>
        <div class="copy">
          复制验证码
        </div>
      </div>
      <h2 class="tip">请牢记借款验证码，借款是需要验证</h2>
      <h3 class="time-line">约6天后失效</h3>
      <div class="button-box">
        <div class="button button-primary">
          去下载
        </div>
      </div>
    </div>

    <div class="download-item flex flex-item">
      <img src="~common/image/Communal_nyd_2x_001.png">
      <div class="flex-grow">
        <div class="title">大行贷（5000元-10000元）</div>
        <div class="desc">放款快，额度高</div>
      </div>
      <i class="iconfont icon-117 rotate-90"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .download-item
    height: 1.42rem
    background: #fff
    padding: 0 .4rem
    margin-top: .1rem
    > img
      padding-right: .1rem
    .title
      font-size: .24rem
      color: #787878
    .desc
      font-size: .2rem
      color: #939393
      padding-top: .1rem
  .detail-box
    padding: .5rem .4rem
    background: #fff
    position: relative
    &:after
      position: absolute
      top: 0
      left: 0
      right: 0
      content: ''
      height: 1px
      background-color: #e8e8e8
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5)
    .code-info
      .title
        font-size: .28rem
        color: #525252
      .code-value
        font-size: .36rem
        color: #585858
        > span
          text-decoration: underline
      .copy
        font-size: .28rem
        color: #00a4ff
    .tip, .time-line
      font-size: .24rem
      color: #787878
    .tip
      line-height: .5rem
    .time-line
      padding-top: .1rem
      padding-bottom: .5rem
</style>
