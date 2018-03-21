<template>
  <div class="invite-friends">
    <div class="bg-1 item"></div>
    <div class="bg-2 item">
      <span class="d-d d-p">{{pageData.directInvite || 0}}人</span>
      <span class="d-d d-j">{{pageData.indirectInvite || 0}}人</span>
      <span class="d-d d-cash">{{totalAmount}}元</span>
      <img src="~common/image/tixian.png" @click="withdrawCash" class="tixian">
    </div>
    <div class="bg-3 item">
      <span class="title">{{this.pageData.firstBonus}}元</span>
      <span class="desc">直接邀请奖励</span>
      <p class="d-desc-1">通过您直接邀请好友1位，且好友评估成功，即可获得</p>
      <p class="d-desc-2">现金<span class="dd-cash">{{this.pageData.firstBonus}}</span>元，上不封顶。</p>
      <p class="d-desc-3">注：直接关系如下演示图A到B</p>
      <span class="j-title">{{this.pageData.secondBonus}}元</span>
      <span class="j-desc">直接邀请奖励</span>
      <p class="j-desc-1">通过您间接邀请好友1位，且好友评估成功，即可获得</p>
      <p class="j-desc-2">现金<span class="jj-cash">{{this.pageData.secondBonus}}</span>元，上不封顶。</p>
      <p class="j-desc-3">注：间接关系仅限您邀请的下两层，如下演示图A到B</p>
    </div>
    <div class="bg-4 item"></div>
    <div class="bg-5 item">
      <p class="th">
        <span>排名</span>
        <span>获奖人</span>
        <span>赚钱总额</span>
      </p>
      <p v-for="(item, index) in this.pageData.rankingList" class="tr" :class="{'tr-1': index == 0, 'tr-2': index == 1, 'tr-3': index == 2, 'tr-4': index == 3, 'tr-5': index == 4}">
        <span>{{index + 1}}</span>
        <span>{{item.accountNumber}}</span>
        <span>{{item.bonusTotal}}元</span>
      </p>
      <!-- <p class="tr tr-2">
        <span>2</span>
        <span>183****1231</span>
        <span>8788元</span>
      </p>
      <p class="tr tr-3">
        <span>3</span>
        <span>183****1231</span>
        <span>8788元</span>
      </p>
      <p class="tr tr-4">
        <span>4</span>
        <span>183****1231</span>
        <span>8788元</span>
      </p>
      <p class="tr tr-5">
        <span>5</span>
        <span>183****1231</span>
        <span>8788元</span>
      </p> -->
    </div>
    <div class="bg-6 item">
      <span class="s-1">8</span>
      <span class="s-2">8</span>
    </div>
    <div class="btn-box" @click="shareClicked">
      <img src="~common/image/theme_btn.png">
      <span class="text">立即邀请</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {popup, doPost, share, navigate} from 'common/js/drivers'
  import {pageIdentity} from 'common/js/constants'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        pageData: {
          firstBonus: 15,     // 第一档邀请奖励金
          secondBonus: 5,     // 第二档邀请奖励金
          couponAmount: 8,    // 优惠券总金额8元
          rankingList: [],    // 邀请人奖励金总额
          directInvite: 0,    // 直接邀请人个数
          directAmount: 0,    // 直接邀请人个数
          indirectInvite: 0,  // 间接邀请人个数
          indirectAmount: 0,  // 间接邀请人奖励金
          accountNumber: ''
        }
      }
    },
    methods: {
      invitationDetail() {
        doPost(types.ACTIVITY_INVITATION_DETAIL, {}, {
          success: (oData) => {
            if (oData.status === '0') {
              this.pageData = oData.data
            }
          },
          error: (oData) => {
            popup('', '', oData.msg || '获取信息失败')
          }
        })
      },
      getNewClass(index) {
        return `tr-${index + 1}`
      },
      shareClicked() {
        if (!this.pageData.accountNumber) {
          popup(null, null, '请先登录！')
        } else {
          share(`您的好友${this.pageData.accountNumber}邀请您领万元大奖—可提现—`, `https://h5.ymt.nongyaodai.com/a/#/share?fatherNo=${this.pageData.accountNumber}`, '一款专业、快捷、方便的借款服务APP,为用户提供精准、优质的借款推荐服务。')
        }
      },
      withdrawCash: function() {
        if (!this.pageData.accountNumber) {
          popup(null, null, '请先登录！')
        } else {
          navigate('WITHDRAW_CASH', '提现', {url: pageIdentity.WITHDRAW_CASH})
        }
      }
    },
    computed: {
      totalAmount() {
        let {directAmount, indirectAmount} = this.pageData
        if (!directAmount) {
          directAmount = 0
        }
        if (!indirectAmount) {
          indirectAmount = 0
        }
        return Number(directAmount) + Number(indirectAmount)
      }
    },
    mounted() {
      this.invitationDetail()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .invite-friends
    max-width: 640px
    margin: 0 auto
    padding-bottom: 1.2rem
  .item
    width: 100%
    position: relative
  .d-d
    position: absolute
    font-size: .28rem
    color: #525252
    top: 2.8rem
    width: 1rem
    text-align: center
  .bg-1
    height: 3.44rem
    background: url('~common/image/invite_01.jpg') no-repeat center
    background-size: 100% 100%
  .bg-2
    height: 4.48rem
    background: url('~common/image/invite_02.jpg') no-repeat center
    background-size: 100% 100%
    .d-p
      left: 0.8rem
    .d-j
      left: 2.7rem
    .d-cash
      left: 4.5rem
    .tixian
      width: 4.4rem
      position: absolute
      left: 50%
      margin-left: -2.2rem
      top: 3.5rem
  .bg-3
    height: 6.47rem
    background: url('~common/image/invite_03.jpg') no-repeat center
    background-size: 100% 100%
    .title, .desc, .j-title, .j-desc
      color: #ffdad6
      position: absolute
      left: 0
      right: 0
      text-align: center
    .title
      font-size: .28rem
      top: .6rem
    .desc
      font-size: .18rem
      top: 1rem
    .d-desc-1, .d-desc-2, .d-desc-3, .j-desc-1, .j-desc-2, .j-desc-3
      font-size: .2rem
      color: #fff
      position: absolute
      left: 0.7rem
    .d-desc-1
      top: 1.8rem
    .d-desc-2
      top: 2.15rem
    .d-desc-3
      top: 2.5rem
    .dd-cash
      font-size: .22rem
      color: #f35948
      width: 0.8rem
      text-align: center
      display: inline-block
    .j-desc-1
      top: 5.1rem
    .j-desc-2
      top: 5.45rem
    .j-desc-3
      top: 5.8rem
    .jj-cash
      font-size: .22rem
      color: #f3a148
      width: 0.8rem
      text-align: center
      display: inline-block
    .j-title
      font-size: .28rem
      top: 3.9rem
      color: #fff
    .j-desc
      font-size: .18rem
      top: 4.3rem
      padding-left: .1rem
  .bg-4
    height: 5.97rem
    background: url('~common/image/invite_04.jpg') no-repeat center
    background-size: 100% 100%
  .bg-5
    height: 4.13rem
    background: url('~common/image/invite_05.jpg') no-repeat center
    background-size: 100% 100%
    .th, .tr
      position: absolute
      height: .6rem
      line-height: .6rem
      top: 0.12rem
      left: .42rem
      right: .42rem
      font-size: .28rem
      color: #fff
      span
        display: inline-block
        text-align: center
        &:nth-child(1)
          width: 1.4rem
        &:nth-child(2)
          width: 2.2rem
        &:nth-child(3)
          width: 1.5rem
    .tr-1
        top: 0.75rem
        color: #ff3c00
    .tr-2
        top: 1.3rem
        color: #ff3c00
    .tr-3
        top: 1.9rem
        color: #ff3c00
    .tr-4
        top: 2.5rem
        color: #525252
    .tr-5
        top: 3.05rem
        color: #525252
  .bg-6
    height: 3.30rem
    background: url('~common/image/invite_06.jpg') no-repeat center
    background-size: 100% 100%
    .s-1, .s-2
      position: absolute
      color: #fff
      display: inline-block
      width: .8rem
      text-align: center
      left: 3.1rem
      top: .1rem
      font-size: .76rem
    .s-2
      top: 1.2rem
      left: 2.6rem
  .btn-box
    text-align: center
    padding: 0.3rem 0 0
    position: fixed
    bottom: 0
    left: 0
    right: 0
    background: #fff
    img
      width: 5.8rem
    .text
      color: #fff
      position: absolute
      display: inline-block
      width: 2rem
      text-align: center
      left: 50%
      margin-left: -1rem
      font-size: .32rem
      top: .6rem
</style>
