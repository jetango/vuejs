<template>
  <div class="vip-box">
    <div class="vip-header">
      <div class="vip-header-box">
        <img src="~/common/image/VIP_BG_2X.png"/>
        <span class="number">{{vipData.mobile}}</span>
        <div class="detail">
          <div class="name">{{vipData.expireTime ? '到期时间' : vipData.memberStatus}}</div>
          <div class="date" v-show="vipData.expireTime">{{vipData.expireTime}}</div>
        </div>
      </div>
    </div>
    <div class="vip-category-box">
      <div class="vip-category flex flex-item">
        <!-- 单月 -->
        <div v-if="vipData.memberConfigList[0]" class="item flex-grow flex flex-item" :class='{selected: (selectedType == vipData.memberConfigList[0].type || !selectedType)}' @click="selectedVipType(vipData.memberConfigList[0])">
          <div class="bang"></div>
          <div class="flex-grow flex column flex-justify flex-item date-box">
            <img src="~/common/image/yueka_ka_001.png"/>
            <div class="date">{{vipData.memberConfigList[0].effectTime}}天</div>
          </div>
          <div class="flex-grow flex column flex-justify flex-item price-box">
            <div class="actual">¥{{vipData.memberConfigList[0].discountFee}}</div>
            <div class="fake">¥{{vipData.memberConfigList[0].realFee}}</div>
          </div>
        </div>
        <!-- 双周 -->
        <div v-if="vipData.memberConfigList[1]" class="item flex-grow flex flex-item" :class='{selected: (selectedType && selectedType == vipData.memberConfigList[1].type)}' @click="selectedVipType(vipData.memberConfigList[1])">
          <div class="bang"></div>
          <div class="flex-grow flex column flex-justify flex-item date-box">
            <img src="~/common/image/yueka_ka_002.png"/>
            <div class="date">{{vipData.memberConfigList[1].effectTime}}天</div>
          </div>
          <div class="flex-grow flex column flex-justify flex-item price-box">
            <div class="actual">¥{{vipData.memberConfigList[1].discountFee}}</div>
            <div class="fake">¥{{vipData.memberConfigList[1].realFee}}</div>
          </div>
        </div>
        <!-- 月卡 -->
        <div  v-if="vipData.memberConfigList[2]" class="item flex-grow flex flex-item flex-justify" :class='{selected: (selectedType && selectedType == vipData.memberConfigList[2].type)}' @click="selectedVipType(vipData.memberConfigList[2])">
          <div class="bang"></div>
          <div class="flex-grow flex column flex-justify flex-item date-box">
            <img src="~/common/image/yueka_ka_003.png"/>
            <div class="date">{{vipData.memberConfigList[2].effectTime}}天</div>
          </div>
          <div class="flex-grow flex column flex-justify flex-item price-box">
            <div class="actual">¥{{vipData.memberConfigList[2].discountFee}}</div>
            <div class="fake">¥{{vipData.memberConfigList[2].realFee}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="vip-desc-box">
      <h3 class="text-center">会员介绍</h3>
      <p class="text-gary">1、7天会员是指在购买会员日起7天内可以发起借款申请；</p>
      <p class="text-gary">2、14天会员是指在购买会员日起14天内可以发起借款申请；</p>
      <p>3、会员期限不等于借款期限；</p>
      <p class="text-gary">4、会员期限内，如正常还款，可以多次借款；</p>
      <p class="text-gary">5、未按时足额还款，会员资格会失效；</p>
      <p class="text-gary">6、会员费将在放款成功后扣取，具体见会员协议；</p>
      <p class="text-gary">7、会员服务最终解析权归公司所有；</p>
    </div>
    <p class="comfirm-protocol flex flex-item flex-justify text-gary">
      <span @click="agreeProtocols()">
        <i :class="{'icon-not-chose': isChosed}" class="iconfont icon-correct-marked"></i>我已阅读并同意<span @click.stop="checkServicesProtocols()">《会员协议》</span>
      </span>
    </p>
    <div class="button-box">
      <div class="button button-primary" @click="confirmIdentity()">
        提交
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as types from 'config/api-type'
  import { doPost, popup, navigate, endPage } from 'common/js/drivers'
  import {pageIdentity} from 'common/js/constants'
  export default {
    data() {
      return {
        isChosed: false,
        selectedType: '',
        selectedObj: {},
        vipData: {
          mobile: '',
          memberStatus: '', // 会员状态  已过期  \ 未购买
          memberType: '',
          memberTypeDescribe: '', // 会员类型描述
          expireTime: '', // 会员到期时间
          memberConfigList: [ // 会员配置列表
            {
              type: '', // 会员类型
              typeDescribe: '', // 会员类型描述
              realFee: '', // 会员实际金额
              discountFee: '', // 会员折扣价
              effectTime: '' // 会员有效周期
            },
            {
              type: '',
              typeDescribe: '',
              realFee: '',
              discountFee: '',
              effectTime: ''
            },
            {
              type: '',
              typeDescribe: '',
              realFee: '',
              discountFee: '',
              effectTime: ''
            }
          ]
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        doPost(types.VIP, {}, {
          success: (oData) => {
            this.vipData = oData.data
            this.selectedType = oData.data.memberConfigList[0].type
            this.selectedObj = oData.data.memberConfigList[0]
          },
          error: (oData) => {
            popup(null, null, oData.msg || '信息获取失败，请稍后再试！')
          }
        })
      },
      selectedVipType(obj) {
        this.selectedType = obj.type
        this.selectedObj = obj
      },
      confirmIdentity() {
        if (this.isChosed) {
          popup(null, null, '请先阅读会员协议！')
          return
        }
        let param = this.selectedObj
        endPage({param, url: ''}, 'LOAN_CONFIRM', '-1')
      },
      agreeProtocols() {
        this.isChosed = !this.isChosed
      },
      checkServicesProtocols() {
        navigate('VIP_PROTOCOL', '会员协议', {url: pageIdentity.VIP_PROTOCOL})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .vip-header
    padding: 0.05rem .05rem .44rem
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
      right: .3rem
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
      border: 1px solid #fff
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
    margin-bottom: .4rem
    i
      color: green
      font-size: .22rem
      margin-top: -0.04rem
      margin-right: 0.05rem
    span
      span
        color: #008aff
  .vip-desc-box
    padding-top: .3rem
    padding-bottom: .4rem
    > h3
      font-size: .22rem
      padding-bottom: .15rem
      font-weight: bold
    > p
      font-size: .2rem
      line-height: .36rem
      padding: 0 .2rem
  .button-box
    padding: 0 .4rem .4rem
  .icon-not-chose
    color: lightgrey !important
</style>
