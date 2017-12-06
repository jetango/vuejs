<template>
  <div class="vip-box">
    <div class="vip-header">
      <div class="vip-header-box">
        <img src="~/common/image/VIP_BG_2X.png"/>
        <span class="number">138869999999</span>
        <div class="detail">
          <div class="name">月卡会员</div>
          <div class="date">到期:2017-12-12</div>
        </div>
      </div>
    </div>
    <div class="vip-category-box">
      <div class="vip-category flex flex-item">
        <div class="item flex-grow flex flex-item selected">
          <div class="bang"></div>
          <div class="flex-grow flex column flex-justify flex-item date-box">
            <img src="~/common/image/yeuka_ka_001.png"/>
            <div class="date">30天</div>
          </div>
          <div class="flex-grow flex column flex-justify flex-item price-box">
            <div class="actual">¥28</div>
            <div class="fake">¥30</div>
          </div>
        </div>
        <div class="item flex-grow flex flex-item">
          <div class="bang"></div>
          <div class="flex-grow flex column flex-justify flex-item date-box">
            <img src="~/common/image/yeuka_ka_002.png"/>
            <div class="date">90天</div>
          </div>
          <div class="flex-grow flex column flex-justify flex-item price-box">
            <div class="actual">¥28</div>
            <div class="fake">¥30</div>
          </div>
        </div>
        <div class="item flex-grow flex flex-item flex-justify">
          <div class="bang"></div>
          <div class="flex-grow flex column flex-justify flex-item date-box">
            <img src="~/common/image/yeuka_ka_003.png"/>
            <div class="date">180天</div>
          </div>
          <div class="flex-grow flex column flex-justify flex-item price-box">
            <div class="actual">¥28</div>
            <div class="fake">¥30</div>
          </div>
        </div>
      </div>
    </div>
    <p class="comfirm-protocol flex flex-item flex-justify">
      <i @click="agreeProtocols" :class="{'icon-not-chose': isChosed}" class="iconfont icon-correct-marked"></i>
      <span>我已阅读并同意<span @click="checkServicesProtocols">《会员协议》</span></span>
    </p>
    <div class="button-box">
      <div class="button button-primary" @click="confirmIdentity()">
        提交
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .vip-header
    padding: .1rem .1rem 1.02rem
    .vip-header-box
      position: relative
    .number
      font-family: '黑体'
      font-size: .3rem
      color: #ffeded
      position: absolute
      top: .3rem
      left: .4rem
    img
      width: 100%
    .detail
      position: absolute
      right: .1rem
      top: .35rem
      font-family: '黑体'
      .name
        font-size: .3rem
        color: #c5a56c
      .date
        font-size: .2rem
        color: #c5a56c
        padding-top: .1rem
  .vip-category-box
    padding: 0 .1rem
    .item
      height: .94rem
      border-radius: .1rem
      margin-right: .1rem
      overflow: hidden
      background: #fff
      box-shadow: 0 .03rem rgba(0,0,0,0.1)
      .price-box
        border-left: .01rem dashed #cfcfcf
        height: 100%
        font-family: '黑体'
        .actual
          font-size: .32rem
          color: #fe7e00
          padding: .1rem 0
        .fake
          font-size: .18rem
          color: #696969
          text-decoration: line-through;
      &.selected
        border: 1px solid #ff8d05
      &:last-child
        margin-right: 0
      .bang
        height: 100%
        border-left: .16rem solid #fabe0d
      &:nth-child(2)
        .bang
          border-left-color: #74cf5c
      &:nth-child(3)
        .bang
          border-left-color: #ff9f0f
      .date-box
        img
          width: .4rem
      .date
        font-family: '黑体'
        font-size: .18rem
        color: #696969
        padding-top: .08rem

  .comfirm-protocol
    font-size: .2rem
    margin-top: .6rem
    margin-bottom: .4rem
    i
      color: green
      font-size: .22rem
      margin-top: -0.04rem
      margin-right: 0.05rem
    span
      span
        color: #008aff

  .button-box
    padding: 0 .4rem .4rem

</style>
