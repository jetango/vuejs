<template>
  <div class="loan-contract">
    <div @click="checkContract(1)" class="contract-item  flex flex-item">
      <p class="flex-grow">自动还款服务协议</p>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div @click="checkContract(2)" class="contract-item flex flex-item">
      <p class="flex-grow">征信查询授权书</p>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div @click="checkContract(3)" class="contract-item  flex flex-item">
      <p class="flex-grow">服务协议-单期</p>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div @click="checkContract(4)" class="contract-item  flex flex-item">
      <p class="flex-grow">银行贷款协议-单期-（借款人与银行）</p>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div @click="checkContract(5)" class="contract-item  flex flex-item">
      <p class="flex-grow">电子签名授权协议书</p>
      <i class="icon iconfont icon-117"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    doPost,
    popup,
    navigate
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        protocolUrl: null,
        isReturnUrl: false
      }
    },
    mounted: function() {
      this.initData()
    },
    methods: {
      initData: function() {
        /** 获取用户协议合同URL */
        doPost(types.USER_CONTRACT, {}, {
          success: (data) => {
            console.log(data)
            this.protocolUrl = data.data
            this.isReturnUrl = true
          },
          error: (data) => {
            popup(null, null, data.msg || '获取协议失败，请稍后再试！')
          }
        })
      },
      checkContract: function(type) {
        if (!this.isReturnUrl) {
          return false
        }
        switch (type) {
          case 1:
            navigate('AUTOREPAY_PROTOCOL', '自动还款服务协议', {
              url: this.protocolUrl.autoRepayProtocol,
              param: {}
            })
            break
          case 2:
            navigate('CREDIT_AUTHORIZATION', '征信查询授权书', {
              url: this.protocolUrl.creditAuthorization,
              param: {}
            })
            break
          case 3:
            navigate('SERVER_PROTOCOL', '服务协议', {
              url: this.protocolUrl.serverProtocol,
              param: {}
            })
            break
          case 4:
            navigate('BANKLOAN_PROTOCOL', '银行贷款协议', {
              url: this.protocolUrl.bankLoanProtocol,
              param: {}
            })
            break
          case 5:
            navigate('ELE_AUTHORIZATION', '自动还款服务协议', {
              url: this.protocolUrl.elecAuthorization,
              param: {}
            })
            break
          default:
            return false
        }
      }
    }
  }
</script>

<style scoped lang="stylus" type="stylesheet/stylus">
  .contract-item
    background-color: #ffffff
    margin-top: .1rem
    padding: 0 .4rem
    height: 1rem
    p
      font-size: .3rem
      color: #000000
      i 
        font-size: .32rem
        color: #525252

</style>