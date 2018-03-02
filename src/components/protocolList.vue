<template>
  <div class="loan-contract">
    <div @click="checkContract('creditAuthorization')" class="contract-item  flex flex-item focus">
      <p class="flex-grow">征信查询授权书</p>
      <i class="icon iconfont icon-117"></i>
    </div>
    <div @click="checkContract('assessAuthorization')" class="contract-item flex flex-item focus">
      <p class="flex-grow">评估推荐服务协议</p>
      <i class="icon iconfont icon-117"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    doPost,
    popup,
    eeLogUBT,
    navigate
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        protocolUrl: {
          'creditAuthorization': '',    // 评估推荐服务协议
          'assessAuthorization': ''     // 征信查询授权书
        }
      }
    },
    mounted: function() {
      this.initData()
      eeLogUBT('LoanContractPage.Load.Goin', 'goin')
    },
    methods: {
      initData: function() {
        doPost(types.USER_CONTRACT, {}, {
          success: (oData) => {
            let {creditAuthorization, assessAuthorization} = oData.data
            if (creditAuthorization) {
              this.protocolUrl.creditAuthorization = creditAuthorization
              this.protocolUrl.assessAuthorization = assessAuthorization
            }
          },
          error: (data) => {
            popup(null, null, data.msg || '获取协议失败，请稍后再试！')
          }
        })
      },
      checkContract: function(type) {
        if (!this.protocolUrl.creditAuthorization) {
          popup(null, null, '暂无签署任何协议！')
          return
        }
        switch (type) {
          case 'creditAuthorization':
            navigate('ASSESS_PROTOCOL', '征信查询授权书', {
              url: this.protocolUrl.creditAuthorization,
              type: 'TARGET'
            })
            break
          case 'assessAuthorization':
            navigate('CREDIT_AUTHORIZATION', '评估推荐服务协议', {
              url: this.protocolUrl.assessAuthorization,
              type: 'TARGET'
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
    &.focus
      &:active
        background: #e1e1e1
    p
      font-size: .3rem
      color: #000000
      i
        font-size: .32rem
        color: #525252

</style>
