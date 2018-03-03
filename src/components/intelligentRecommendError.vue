<template>
  <div class="result-error">
    <div class="tip-box">
      <p>很遗憾！</p>
      <p>您的信誉记录未满足平台需求，推送失败！</p>
      <div class="button-box">
        <div @click="submit()" class="button button-primary">确定</div>
      </div>
    </div>
    <p class="tip-bottom">
      <img class="img-size" src="~common/image/zhushi_tuan_001.png">
      良好的信誉记录，是借款成功率的保障！
      <img class="img-size rotate-180" src="~common/image/zhushi_tuan_001.png">
    </p>
    <div class="footer" :class="{'input-footer':isInput}">
      <p class="loan-notice flex flex-item flex-justify">
        <i class="icon iconfont icon-yirenzheng"></i>
        <span>国安级数据加密防护</span>
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {endPage} from 'common/js/drivers'
  export default {
    data() {
      return {
        isInput: false
      }
    },
    methods: {
      submit() {
        endPage({url: '', param: ''}, 'ROOT')
      }
    },
    created() {
    },
    mounted() {
      document.title = '推荐结果'
      let componentHeight = document.querySelector('.result-error').offsetHeight
      let boxHeight = document.querySelector('.tip-box').offsetHeight
      let tipOffsetHeight = document.querySelector('.tip-bottom').offsetHeight
      let footerHeight = document.querySelector('.footer').offsetHeight
      var marginTop = componentHeight - boxHeight - tipOffsetHeight - footerHeight
      document.querySelector('.footer').style.marginTop = marginTop + 'px'
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .result-error
    position: absolute
    background: #fff
    width: 100%
    height: 100%
    .button-box
      padding: 2rem .2rem 0
    .tip-box
      padding-top: 1.2rem
      padding-bottom: 2rem
      p
       font-size: .28rem
       color: #525252
       text-align: center
       padding-bottom: .2rem
    .tip-bottom
      font-size: .22rem
      padding-top: 1rem
      padding-bottom: 1rem
      text-align: center
      color: #2a89c7
      .img-size
        width: .4rem
        height: .24rem
        vertical-align: middle
    .footer
      width: 100%
      .product-name
        text-align: center
        font-size: .3rem
        color: #8d959c
      .loan-notice
        height: .5rem
        font-size: .2rem
        i
          color: green
          font-size: .34rem
          margin-top: -.01rem
</style>
