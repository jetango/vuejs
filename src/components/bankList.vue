<template>
  <div class="bank-list">
    <div class="bank-item" v-for="bank in bankList" :key="bank.bankList" @click="choseBankCard(bank)">
      <div class="bank-name  flex flex-item active">
        <i class="icon iconfont icon-161"></i>
        <p class="flex-grow" v-html="bank.bankName"></p>
        <i class="icon iconfont icon-117"></i>
      </div>
      <div class="bank-number">
        <p class="bank-number flex flex-item">
          <span class="flex-grow">卡号：{{'*************' + bank.accountNumber.substring(bank.accountNumber.length-4, bank.accountNumber.length)}}</span>
          <!-- <span class="user-status">可使用</span> -->
        </p>
      </div>
    </div>
    <a @click="addBankCard" class="button button-primary">去添加</a>
  </div>
</template>

<script>
  import {
    addSessionStorage
  } from 'common/js/dom'
  import {
    doPost
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        bankList: []
      }
    },
    created: function() {
      this.init()
    },
    methods: {
      init: function() {
        doPost(types.BANK_LIST, {}, {
          success: (oData) => {
            console.log(oData)
            this.bankList = oData.data
          }
        })
      },
      choseBankCard: function(obj) {
        addSessionStorage('payCard', JSON.stringify({
          bankName: obj.bankName,
          accountNumber: obj.accountNumber
        }))
        this.$router.push('loan-confirm')
      },
      addBankCard: function() {
        this.$router.push('debit-card')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"

  .bank-item
    margin-top: .3rem
    background-color: #ffffff
    padding-left: .4rem
    &:active
      background-color: #e4e5e7

  .bank-name
    height: 1rem
    &:after
      left: 0 !important
    .icon-161
      font-size: .7rem
      margin-top: -.1rem
    .icon-117
      margin-right: .4rem
    p
      font-size: .3rem
      padding-left: .2rem
      color: #000000

  .bank-number
    height: .72rem
    p
      font-size: .3rem
      color: #000000

  .user-status
    margin-right: .4rem
    color: #89D378

  .button
    width:90%
    margin: 0 auto
    margin-top: 1rem

</style>
