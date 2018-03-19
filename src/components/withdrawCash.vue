<template>
  <div class="withdraw-cash">
    <div class="withdraw-item flex flex-item active">
      <p class="flex-grow">可提现金额（元）{{cashInfo.ktAmount}}</p>
      <span @click="allWithDraw">全部提现</span>
    </div>
    <div class="withdraw-item flex flex-item active">
      <p class="flex-grow">{{bankCard ? bankCard : '工商银行尾号4536'}}</p>
      <span class="change-c" @click="changeBankCard">更换</span>
      <i class="iconfont icon-117"></i>
    </div>
    <div class="withdraw-item flex flex-item active">
      <p class="flex-grow">提现金额</p>
      <input type="text" placeholder="请输入提现金额" @blur="calculation" v-model="cashInfo.withdrawAmount">
    </div>
    <div class="withdraw-item flex flex-item active">
      <p class="flex-grow">手续费</p>
      <!-- <input type="text" placeholder="手续费" v-model="cashInfo.serviceCharge" readonly> -->
      <span>{{cashInfo.serviceCharge ? cashInfo.serviceCharge + '元' : ''}}</span>
    </div>
    <div class="withdraw-item flex flex-item">
      <p class="flex-grow">实际到账</p>
      <!-- <input type="text" placeholder="实际到账" v-model="cashInfo.actualAccount" readonly> -->
      <span>{{cashInfo.actualAccount ? cashInfo.actualAccount + '元' : ''}}</span>
    </div>
    <div class="button-box">
      <div class="button prohibit" :class="{'button-primary': true}" @click="withDraw">提现</div>
    </div>
    <div class="tips">
      <div class="recommend-title">
        <img class="reverse-logo" src="~common/image/zhaungshi_001.png">
        <span>提现说明</span>
        <img src="~common/image/zhaungshi_001.png">
      </div>
      <div class="intro">
        <p>1、每周二8:00-17:00可提现1次。</p>
        <p>2、系统将根据您当前填写的银行卡进行放款。</p>
        <p>3、成功提现，手续费2元/次。</p>
        <p>3、需满100元以上才能提现。</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {popup} from 'common/js/drivers'
  import Picker from 'better-picker'
  export default {
    data() {
      return {
        cashInfo: {
          ktAmount: 123.23,
          bankCard: null,
          withdrawAmount: null,
          serviceCharge: 2,
          actualAccount: null
        },
        bankCard: null,
        bankList: [
          {
            text: '工商银行尾号4536',
            value: '15155454484536'
          },
          {
            text: '建设银行尾号4512',
            value: '84518451454512'
          }
        ]
      }
    },
    methods: {
      allWithDraw: function() {
        this.cashInfo.withdrawAmount = this.cashInfo.ktAmount
        this.cashInfo.actualAccount = this.cashInfo.withdrawAmount - this.cashInfo.serviceCharge
      },
      calculation: function() {
        if (this.cashInfo.withdrawAmount < 100) {
          this.cashInfo.actualAccount = null
          popup(null, null, '提现金额必须大于等于100！')
        } else {
          this.cashInfo.actualAccount = this.cashInfo.withdrawAmount - this.cashInfo.serviceCharge
        }
        if (this.cashInfo.withdrawAmount > this.cashInfo.ktAmount) {
          this.cashInfo.actualAccount = null
          popup(null, null, '提现金额必须小于等于可提现金额！')
        }
      },
      changeBankCard: function() {
        this.bankPicker.show()
      },
      _initRelationshipPicker() {
        this.bankPicker = new Picker({
          'data': [this.bankList],
          'selectedIndex': [0]
        })
        this.bankPicker.on('picker.select', (val, selectedIndex) => {
          this.bankCard = this.bankList[selectedIndex].text
          this.cashInfo.bankCard = this.bankList[selectedIndex].value
        })
      },
      withDraw: function() {
        console.log(JSON.stringify(this.cashInfo))
      }
    },
    mounted: function() {
      this._initRelationshipPicker()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"

  .withdraw-item
    height: 1rem
    padding: 0 .4rem
    background-color: #fff
    i
      font-size: .28rem
      color: #9d9d9d
    .change-c
      color: #9d9d9d
    input
      text-align: right
      line-height: 1
      outline: none
      border: 0
    &:first-of-type
      height: 1.1rem
      background-color: #f6f6f6
      span
        color: #00a8ff
        text-decoration: underline

  .recommend-title
    text-align: center
    margin-top: .2rem
    img
      width: .35rem
      height: .16rem
    .reverse-logo
      transform: rotateY(180deg)
      -webkit-transform: rotateY(180deg)
      -moz-transform: rotateY(180deg)
  
  .intro
    padding: .1rem 0
    p
      font-size: .2rem
      color: #939393
      padding-left: .5rem
      line-height: 1.6

  .button-box
    padding: 1rem .4rem .4rem

  .prohibit
    background-color: #8e8e8e !important

  input::-webkit-input-placeholder {
    color: #9d9d9d
  }
  input:-moz-placeholder {
    color: #9d9d9d
  }
  input::-moz-placeholder {
    color: #9d9d9d
  }
  input::-ms-input-placeholder {
    color: #9d9d9d
  }

</style>