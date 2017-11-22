<template>
  <div class="bank-list">
    <div class="bank-item" v-for="bank in bankList" :key="bank.bankList">
      <div class="bank-name  flex flex-item active">
        <i class="icon iconfont icon-161"></i>
        <p class="flex-grow" v-html="bank.bankName"></p>
        <!-- <i class="icon iconfont icon-117"></i> -->
      </div>
      <div class="bank-number">
        <p class="bank-number flex flex-item">
          <span class="flex-grow">卡号：{{'*************' + bank.accountNumber.substring(bank.accountNumber.length-4, bank.accountNumber.length)}}</span>
          <!-- <span class="user-status">可使用</span> -->
        </p>
      </div>
    </div>
    <div v-if="bankList && bankList.length == 0">
      <no-data title="暂无绑定银行卡"></no-data>
    </div>
    <a @click="addBankCard" class="button button-primary">去添加</a>
  </div>
</template>

<script>
  import NoData from 'base/noData/noData'
  import {doPost, popup, navigate, log} from 'common/js/drivers'
  import * as types from 'config/api-type'
  import {pageIdentity} from 'common/js/constants'
  export default {
    data() {
      return {
        bankList: null
      }
    },
    created: function() {
      log('', '------------------> created')
      this.init()
    },
    mounted() {
      log('', '------------------> mounted')
    },
    methods: {
      init: function() {
        doPost(types.BANK_LIST, {}, {
          success: (oData) => {
            console.log(oData)
            this.bankList = oData.data
          },
          error: (oData) => {
            popup(null, null, oData.msg || '获取数据失败，请稍后再试')
          }
        })
      },
      addBankCard: function() {
        navigate('DEBIT_CARD', '绑定银行卡', {url: pageIdentity.DEBIT_CARD})
      }
    },
    components: {
      NoData
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"

  .bank-list
    padding-bottom: 1rem

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
