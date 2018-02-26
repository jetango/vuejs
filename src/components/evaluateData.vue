<template>
  <div class="evaluate-data">
    <div class="data-box">
      <div class="data-status text-center">
        <div class="score-box">
          <img class="score" src="~common/image/XXLR_quan_bg_001.png">
          <canvas class="circle" id="circle" width="150" height="150"></canvas>
          <div class="detail">
            <p class="score-value"><span style="visibility: hidden">分</span>{{score}}<span>分</span></p>
            <p class="tip">综合评分</p>
          </div>
        </div>
        <div class="flex flex-justify flex-item">
          <img src="~common/image/JQR_da_005.png" class="rebot">
          <i class="msg">恭喜您，您的信誉良好！</i>
        </div>
      </div>
    </div>
    <div class="tips-box">
      <h2><img src="~common/image/zhaungshi_001.png" class="rotate-y"><span>评估建议</span><img src="~common/image/zhaungshi_001.png"></h2>
      <p>1、您的信誉非常好，建议借款额度500-20000区间。</p>
      <p>2、请保持良好信誉，以免影响借款资质。</p>
    </div>
    <div class="button-box">
      <div class="button button-primary" @click="confirmPay">
        去借款
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {endPage, doPost, popup, eeLogUBT} from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        score: 0,
        circleContext: null,
        circle: null,
        circleValue: {
          x: 75,
          y: 75,
          r: 69,
          beginAngle: -Math.PI * 7 / 6,
          endAngle: Math.PI / 5
        }
      }
    },
    methods: {
      _drawCircle(rangeValue) {
        this.circleContext.restore()
        this.circleContext.clearRect(0, 0, this.circle.width, this.circle.height)
        this.circleValue.endAngle = this.circleValue.beginAngle + (rangeValue / 360) * 2 * Math.PI
        this.circleContext.beginPath()
        this.circleContext.arc(this.circleValue.x, this.circleValue.y, this.circleValue.r, this.circleValue.beginAngle, this.circleValue.endAngle, false)
        this.circleContext.stroke()
        this.circleContext.save()
      },
      _progress(max) {
        let self = this
        let score = 0
        let i = 0
        let interval = setInterval(function() {
          if (i < max) {
            score = i * 242 / 100
            self._drawCircle(score)
            i++
          } else {
            clearInterval(interval)
          }
        }, 10)
      },
      confirmPay() {
        eeLogUBT('AssessmentResultPage.Action.Goloan', 'click')
        endPage({url: '', param: ''}, 'ROOT')
      },
      fetchEvaluateScore() {
        let self = this
        doPost(types.FETCH_EVALUATE_SCORE, {}, {
          success(oData) {
            self.score = oData.data
          },
          error(oData) {
            popup('', '', oData.msg || '获取信息失败')
          }
        })
      }
    },
    mounted() {
      this.circle = document.getElementById('circle')
      this.circleContext = this.circle.getContext('2d')
      this.circleContext.lineWidth = 6
      this.circleContext.strokeStyle = '#1fa3ff'
      let gradient = this.circleContext.createLinearGradient(0, 0, 170, 0)
      gradient.addColorStop('0', '#179df7')
      gradient.addColorStop('1.0', '#00e3ff')
      this.circleContext.strokeStyle = gradient
      this._drawCircle(0) // 240
      this._progress(90)
      this.fetchEvaluateScore()
      eeLogUBT('AssessmentResultPage.Load.Goin', 'goin')
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .data-box
    background-color: #fff
    margin-bottom: .1rem
    .detail
      position: absolute
      left: 0
      right: 0
      top: 50%
      transform: translateY(-50%)
      .score-value
        color: #1fa3ff
        font-size: 1rem
        > span
          font-size: .24rem
      .tip
        color: #219d00
        font-size: .24rem
        padding-top: .1rem
    .circle
      position: absolute
      left: 50%
      margin-left: -75px
      top: 50%
      margin-top: -76px
    .score-box
      height: 198px
      position: relative
    img.score
      width: 196px
      --margin-bottom: -.3rem
    img.rebot
      width: 1.1rem
    .msg
      font-size: .34rem
      color: #caa962
  .tips-box
    background-color: #fff
    padding: .4rem
    font-size: .2rem
    color: #9d9d9d
    h2
      text-align: center
      color: #333
      font-size: .28rem
      padding-bottom: .2rem
      > span
        padding: 0 .1rem
      img
        width: .35rem
      .rotate-y
        transform: rotateY(180deg)
        -webkit-transform: rotateY(180deg)
        -moz-transform: rotateY(180deg)
    > p
      line-height: .3rem
  .button-box
    padding: 1rem .4rem 1rem
</style>
