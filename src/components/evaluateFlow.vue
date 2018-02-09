<template>
  <div class="evaluate-flow">
    <div class="data-box">
      <div class="data-status text-center">
        <div class="score-box">
          <img class="score" src="~common/image/JQR_da_001.png">
          <img class="loading rotate-infinite" src="~common/image/JQR_da_002.png">
        </div>
        <div class="flex flex-justify flex-item">
          <span>正在对您的征信智能评估...</span>
        </div>
      </div>
    </div>
    <div class="flow-box">
      <section class="time-line">
        <div class="flex block first" :class="{'actived': statusKeys.indentityInfo == true}">
          <div class="icon">
            <i class="iconfont icon-correct-marked"></i>
          </div>
          <div class="content flex-grow">
            <h1>身份信息</h1>
            <h4>{{statusKeys.indentityInfo ? '身份信息审核成功！' : '正在身份信息审核！'}}</h4>
          </div>
        </div>
        <div class="flex block" :class="{'actived': statusKeys.workInfo == true}">
          <div class="icon">
            <i class="iconfont icon-correct-marked"></i>
          </div>
          <div class="content flex-grow">
            <h1>工作信息</h1>
            <h4>{{statusKeys.workInfo ? '工作信息审核成功！' : '正在工作信息审核！'}}</h4>
          </div>
        </div>
        <div class="flex block" :class="{'actived': statusKeys.contactInfo == true}">
          <div class="icon">
            <i class="iconfont icon-correct-marked"></i>
          </div>
          <div class="content flex-grow">
            <h1>联系人信息</h1>
            <h4>{{statusKeys.contactInfo ? '联系人信息审核成功！' : '正在联系人信息审核！'}}</h4>
          </div>
        </div>
        <div class="flex block" :class="{'actived': statusKeys.authenticate == true}">
          <div class="icon">
            <i class="iconfont icon-correct-marked"></i>
          </div>
          <div class="content flex-grow">
            <h1>信用认证</h1>
            <h4>{{statusKeys.authenticate ? '信用信息评估成功！' : '正在信用信息评估！'}}</h4>
          </div>
        </div>
        <div class="flex block" :class="{'actived': statusKeys.reference == true}">
          <div class="icon">
            <i class="iconfont icon-correct-marked"></i>
          </div>
          <div class="content flex-grow">
            <h1>征信入网信息</h1>
            <h4>{{statusKeys.reference == true ? '征信记录查询分析完成！' : '对您的征信记录查询分析！'}}</h4>
          </div>
        </div>
        <div class="flex block last" :class="{'actived': statusKeys.score == true}">
          <div class="icon">
            <i class="iconfont icon-correct-marked"></i>
          </div>
          <div class="content flex-grow">
            <h1>评估分数</h1>
            <h4>{{statusKeys.score == true ? '评估分数完成！' : '正在评估分数！'}}</h4>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {navigate} from 'common/js/drivers'
  import {pageIdentity} from 'common/js/constants'
  export default {
    data() {
      return {
        statusKeys: {
          indentityInfo: false,
          workInfo: false,
          contactInfo: false,
          authenticate: false,
          reference: false, // 征信
          score: false
        }
      }
    },
    methods: {
      _changeStatus() {
        let arr = ['indentityInfo', 'workInfo', 'contactInfo', 'authenticate', 'reference', 'score']
        let i = 0
        let self = this
        let interval = setInterval(function() {
          self.statusKeys[arr[i]] = true
          if (i === arr.length - 1) {
            clearInterval(interval)
            navigate('EVALUATE_DATA', '评估结果', {url: pageIdentity.EVALUATE_DATA}, null, 'ROOT')
          }
          i++
        }, 800)
      }
    },
    created() {
      this._changeStatus()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .data-status
    background: #fff
    padding: .1rem 0 .3rem
  .score-box
    position: relative
    .score
      width: 2.82rem
    .loading
      width: 2.82rem
      position: absolute
      left: 50%
      top: 50%
      margin-left: -1.41rem
      margin-top: -1.41rem
  .flow-box
    margin-top: .1rem
  .time-line
    padding: .52rem
    padding-bottom: 0
    margin-bottom: .5rem
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
      padding-bottom: .2rem
      padding-left: .28rem
      h1
        font-size: .28rem
        color: #525252
        font-weight: bold
        padding-top: .1rem
      h4
        font-size: .22rem
        color: #525252
        margin: .2rem 0 .07rem
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

  @-webkit-keyframes rotate {
    0%,
    100% {
      -webkit-transform: rotate(0deg)
    }
    100% {
      -webkit-transform: rotate(360deg)
    }
  }
  @-moz-keyframes rotate {
    0%,
    100% {
      -moz-transform: rotate(0deg)
    }
    100% {
      -moz-transform: rotate(360deg)
    }
  }
  @-o-keyframes rotate {
    0%,
    100% {
      -o-transform: rotate(0deg)
    }
    100% {
      -o-transform: rotate(360deg)
    }
  }
  @-ms-keyframes rotate {
    0%,
    100% {
      -ms-transform: rotate(0deg)
    }
    100% {
      -ms-transform: rotate(360deg)
    }
  }
  @keyframes rotate {
    0%,
    100% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
  .rotate-infinite {
    -moz-animation: rotate 4s linear infinite
    -webkit-animation: rotate 4s linear infinite
    -o-animation: rotate 4s linear infinite
    -ms-animation: rotate 4s linear infinite
    animation: rotate 4s linear infinite
  }
</style>
