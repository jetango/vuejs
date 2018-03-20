<template>
  <div class="withdraw-cash">
    <div class="withdraw-item flex flex-item active">
      <p class="flex-grow">可提现金额（元）{{cashInfo.withdrawTotalAmount}}</p>
      <span @click="allWithDraw">全部提现</span>
    </div>
    <div class="withdraw-item flex flex-item active">
      <p class="flex-grow">{{bankCard ? bankCard : '暂无绑定银行卡'}}</p>
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
      <span>{{cashInfo.processFee ? cashInfo.processFee + '元' : ''}}</span>
    </div>
    <div class="withdraw-item flex flex-item">
      <p class="flex-grow">实际到账</p>
      <!-- <input type="text" placeholder="实际到账" v-model="cashInfo.actualAccount" readonly> -->
      <span>{{cashInfo.realArrivalAmount ? cashInfo.realArrivalAmount + '元' : ''}}</span>
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
  import {popup, doPost, log, dialog, navigate} from 'common/js/drivers'
  import Picker from 'better-picker'
  import * as types from 'config/api-type'
  import {pageIdentity} from 'common/js/constants'
  export default {
    data() {
      return {
        cashInfo: {
          withdrawTotalAmount: null,
          withdrawBankName: null,
          withdrawBankNo: null,
          withdrawAmount: null,
          processFee: null,
          realArrivalAmount: null
        },
        bankCard: null,
        bankList: []
      }
    },
    methods: {
      initPage: function() {
        doPost(types.WITH_DRAW, {}, {
          success: (oData) => {
            if (oData.status === '0') {
              this.cashInfo.withdrawTotalAmount = oData.data.withdrawTotalAmount
              this.cashInfo.processFee = oData.data.processFee
              let banks = oData.data.bankList
              banks.forEach(element => {
                this.bankList.push({
                  text: element.bankName + '尾号' + element.bankAccount.substring(element.bankAccount.length - 4, element.bankAccount.length),
                  value: element.bankName + '&' + element.bankAccount
                })
                if (element.defaultFlag === '1') {
                  this.bankCard = element.bankName + '尾号' + element.bankAccount.substring(element.bankAccount.length - 4, element.bankAccount.length)
                  this.cashInfo.withdrawBankName = element.bankName
                  this.cashInfo.withdrawBankNo = element.bankAccount
                }
              })
              this._initRelationshipPicker()
            }
          },
          error: (oData) => {
            log('', oData)
            popup('', '', oData.msg || '页面初始化失败，请稍后再试！')
          }
        })
      },
      allWithDraw: function() {
        this.cashInfo.withdrawAmount = this.cashInfo.withdrawTotalAmount
        this.cashInfo.realArrivalAmount = this.cashInfo.withdrawAmount - this.cashInfo.processFee
      },
      calculation: function() {
        if (this.cashInfo.withdrawAmount < 100) {
          this.cashInfo.realArrivalAmount = null
          popup(null, null, '提现金额必须大于等于100！')
        } else {
          this.cashInfo.realArrivalAmount = this.cashInfo.withdrawAmount - this.cashInfo.processFee
        }
        if (this.cashInfo.withdrawAmount > this.cashInfo.withdrawTotalAmount) {
          this.cashInfo.realArrivalAmount = null
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
          let bankInfo = this.bankList[selectedIndex].value
          let index = bankInfo.indexOf('&')
          this.cashInfo.withdrawBankName = bankInfo.substring(0, index)
          this.cashInfo.withdrawBankNo = bankInfo.substring(index + 1, bankInfo.length)
        })
      },
      withDraw: function() {
        doPost(types.WITH_DRAW_SAVE, this.cashInfo, {
          success: (oData) => {
            if (oData.status === '0') {
              dialog(null, oData.msg || '提现成功，我们将打款到你银行卡，并短信通知您！', [{
                text: '确认',
                key: '0'
              }, {
                text: '取消',
                key: '1'
              }], function(oData) {
                if (oData.result === '0') {
                  navigate('INVITE_FRIENDS', '邀请好友', {url: pageIdentity.INVITE_FRIENDS}, null, 'ROOT')
                }
              })
            } else if (oData.status === '1') {
              popup('', '', oData.msg || '提现异常，请稍后重试！')
            } else if (oData.status === '2') {
              popup('', '', oData.msg || '不符合提现条件！')
            }
          },
          error: (oData) => {
            log('', oData)
            popup('', '', oData.msg || '保存信息失败')
          }
        })
      }
    },
    mounted: function() {
      this.initPage()
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
