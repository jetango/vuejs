<template>
  <div class="evaluate-flow">
    <div class="data-box">
      <div class="data-status text-center">
        <div class="score-box">
          <img class="score" src="~common/image/JQR_da_001.png">
          <img class="loading rotate-infinite" src="~common/image/JQR_da_002.png">
        </div>
        <div class="flex flex-justify flex-item">
          <span>信息推送至银行中...</span>
        </div>
      </div>
    </div>
    <div class="flow-box">
      <section class="time-line">
        <div class="flex block first" :class="{'actived': statusKeys.one == '1'}">
          <div class="icon">
            <div>
              <i class="iconfont icon-correct-marked"></i>
            </div>
          </div>
          <div class="content flex-grow">
            <h1>同步信誉评分</h1>
            <h4>{{statusKeys.one == '1' ? '同步信誉评分成功！' : '正在同步信誉评分！'}}</h4>
          </div>
        </div>
        <div class="flex block" :class="{'actived': statusKeys.two == '1'}">
          <div class="icon">
            <div>
              <i class="iconfont icon-correct-marked"></i>
            </div>
          </div>
          <div class="content flex-grow">
            <h1>传输征信数据</h1>
            <h4>{{statusKeys.two == '1' ? '传输征信数据成功！' : '正在传输征信数据！'}}</h4>
          </div>
        </div>
        <div class="flex block" :class="{'actived': statusKeys.three == '1'}">
          <div class="icon">
            <div>
              <i class="iconfont icon-correct-marked"></i>
            </div>
          </div>
          <div class="content flex-grow">
            <h1>验证征信信息</h1>
            <h4>{{statusKeys.three == '1' ? '验证征信信息成功！' : '正在验证征信信息！'}}</h4>
          </div>
        </div>
        <div class="flex block" :class="{'actived': statusKeys.four == '1'}">
          <div class="icon">
            <div>
              <i class="iconfont icon-correct-marked"></i>
            </div>
          </div>
          <div class="content flex-grow">
            <h1>生成验证码信息</h1>
            <h4>{{statusKeys.three == '1' ? '生成验证码信息成功！' : '正在生成验证码信息！'}}</h4>
          </div>
        </div>
        <div class="flex block" :class="{'actived': statusKeys.five == '1'}">
          <div class="icon">
            <div>
              <i class="iconfont icon-correct-marked"></i>
            </div>
          </div>
          <div class="content flex-grow">
            <h1>接受验证码</h1>
            <h4>{{statusKeys.five == '1' ? '接受验证码成功！' : '正在接受验证码！'}}</h4>
          </div>
        </div>
        <div class="flex block last" :class="{'actived': statusKeys.six == true}">
          <div class="icon">
            <div>
              <i class="iconfont icon-correct-marked"></i>
            </div>
          </div>
          <div class="content flex-grow">
            <h1>生成订单</h1>
            <h4>{{statusKeys.six == '1' ? '生成订单成功！' : '正在生成订单！'}}</h4>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {doPost, popup, navigate, eeLogUBT} from 'common/js/drivers'
  import {pageIdentity} from 'common/js/constants'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        statusKeys: {
          one: '0',
          two: '0',
          three: '0',
          four: '0',
          five: '0', // 征信
          six: '0'
        },
        orderNo: '',
        interval: ''
      }
    },
    methods: {
      _getStatus() {
        let self = this
        let param = {}
        if (self.orderNo) {
          param.orderNo = self.orderNo
        }
        doPost(types.AUDIT_FLOW, param, {
          success(oData) {
            self.statusKeys = oData.data.flowInfo
            self.orderNo = oData.data.orderNo
            if (oData.data.flowInfo.six === '1') {
              clearInterval(self.interval)
              navigate('DOWNLOAD_LIST', '下载列表', {url: pageIdentity.DOWNLOAD_LIST, param: `orderNo=${self.orderNo}`}, null, 'ROOT')
            }
          },
          error(oData) {
            popup(null, null, oData.msg || '获取数据有误！')
          }
        })
      },
      _fetchStatus() {
        let self = this
        self.interval = setInterval(function() {
          self._getStatus()
        }, 30000)
        self._getStatus()
      }
    },
    created() {
      this._fetchStatus()
      eeLogUBT('RecommendLoadingPage.Load.Goin', 'goin')
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
      > div
        overflow: hidden
      .iconfont
        position: relative
        top: -1px
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
