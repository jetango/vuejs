<template>
  <div class="">
    <p class="text-center bold h4 title">距离您的还款日还有</p>
    <div class="image-box text-center">
      <img src="~common/image/huankuan_tianshu_bg_001.png"/>
      <div class="text">{{tipInfo.remainDays}}天</div>
    </div>
    <div class="list-view">
      <div class="item h4">
        还款金额：{{tipInfo.repayAmount}}元
      </div>
      <div class="item h4">
        还款日：{{tipInfo.promiseRepaymentDate}}
      </div>
    </div>

    <div class="button-box">
      <div class="button button-primary" @click="confirmPay()">
        去还款
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {doPost} from 'common/js/drivers'
  import * as types from 'config/api-type'

  let params = {
    orderNo: ''
  }
  export default {
    data() {
      return {
        tipInfo: {
          repayAmount: '',
          promiseRepaymentDate: '',
          loadAmount: '',
          applicationTime: '',
          remainDays: ''
        }
      }
    },
    created() {
      params.orderNo = this.$route.query.orderNo
      if (params.orderNo === '') {
        return
      }
      this._getRepaymentTip()
    },
    methods: {
      _getRepaymentTip() {
        let self = this
        doPost(types.GET_REPAYMENT_TIP, params, {
          success: function(oData) {
            if (oData.status === 0) {
              self.tipInfo = oData.data
            }
          },
          error: function(oData) {
          }
        })
      },
      confirmPay() {
        this.$router.push({
          path: '/repayment-way',
          query: params
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .title
    height: .8rem
    line-height: .8rem
  .image-box
    position: relative
    margin-bottom: .38rem
    img
      width: 1.94rem
    .text
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
      font-size: .6rem
      background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#989898), to(#6d6d6d))
      -webkit-background-clip: text
      -webkit-text-fill-color: transparent
  .list-view
    background: #fff
    .item
      line-height: 1rem
      height: 1rem
      margin-left: .4rem
      border-bottom: 1px solid #e8e8e8
      &:last-child
        border-bottom: 0
  .button-box
    padding: 1rem .4rem 0

</style>
