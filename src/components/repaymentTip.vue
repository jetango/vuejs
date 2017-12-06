<template>
  <div class="">
    <p class="text-center bold h4 title" :class="{'text-danger': tipInfo.remainingDays < 0}">{{tipInfo.remainingDays < 0 ? '您已逾期' : '距离您的还款日还有'}}</p>
    <div class="image-box text-center">
      <img src="~common/image/huankuan_tianshu_bg_001.png"/>
      <div class="text" :class="{'text-danger': tipInfo.remainingDays < 0 }">{{tipInfo.remainingDays < 0 ? (-tipInfo.remainingDays) : tipInfo.remainingDays}}天</div>
    </div>
    <div class="list-view">
      <div class="item h4">
        还款金额：{{tipInfo.curRepayAmount}}元
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
  import {doPost, popup, navigate, dialog, endPage, eeLogUBT} from 'common/js/drivers'
  import * as types from 'config/api-type'
  import {pageIdentity} from 'common/js/constants'

  let params = {
    billNo: ''
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
    mounted() {
      eeLogUBT('RepayPage.Load.Goin', 'goin')
    },
    created() {
      let {billNo, callback} = this.$route.query
      params.billNo = billNo
      if (callback === 'success' || callback === 'error') {
        dialog('还款提交成功', '系统将进行扣款，并将短信通知您扣款结果。', 'OK', {
          success: function(oData) {
            if (oData.status === '0' && oData.data.result === '1') {
              endPage({url: '', param: ''}, 'ROOT')
            }
          },
          error: function(oData) {
            popup(null, null, oData.msg || '还款提交失败！')
          }
        })
      } else if (params.billNo === '') {
        popup(null, null, '非法进入！')
        return
      }
      this._getRepaymentTip()
    },
    methods: {
      _getRepaymentTip() {
        let self = this
        doPost(types.GET_REPAYMENT_TIP, params, {
          success: function(oData) {
            if (oData.status === '0') {
              self.tipInfo = oData.data
              params.billNo.repayAmount = oData.data.repayAmount
            }
          },
          error: function(oData) {
            popup(null, null, oData.msg || '获取数据失败，请稍后再试！')
          }
        })
      },
      confirmPay() {
        let {curRepayAmount, billNo, orderNo, userId} = this.tipInfo
        eeLogUBT('RepayPage.Action.Submit', 'click')
        navigate('REPAYMENT_WAY', '还款方式', {url: pageIdentity.REPAYMENT_WAY, param: `billNo=${billNo}&repayAmount=${curRepayAmount}&orderNo=${orderNo}&userId=${userId}`})
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
  .button-box
    padding: 1rem .4rem 0

</style>
