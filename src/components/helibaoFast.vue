<template>
  <div class="baofu-box">
    <div class="list-view h4">
      <div class="item flex">
        <div class="title tel">应还款金额：{{postData.amount || 0}}元</div>
      </div>
      <!-- <div class="item flex">
        <div class="title tel">账单号：{{postData.billNo || ''}}</div>
      </div> -->
      <div class="item flex" @click="binCarsChoose()">
        <span class="flex-grow">银行卡类型：</span>
        <span>{{binName ? binName : '请选择'}}</span>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex">
        <div class="title tel">银行卡号：</div>
        <div class="flex-grow">
          <input class="input-active" type="tel" maxlength="20" placeholder="请正确输入银行卡号" v-model="postData.bankNo"/>
        </div>
      </div>
      <div class="item flex">
        <div class="title tel">持卡人姓名：</div>
        <div class="flex-grow">
          <input class="input-active" type="text" placeholder="请正确输入姓名" v-model="postData.name"/>
        </div>
      </div>
      <div class="item flex">
        <div class="title tel">身份证号码：</div>
        <div class="flex-grow">
          <input class="input-active" type="text" placeholder="请正确输入身份证号码" v-model="postData.idCard"/>
        </div>
      </div>
    </div>
    <div class="button-box">
      <a class="button button-primary" @click="submit" :class="{'disabled': payLoading}">支付</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {doPost, popup, toast, dialog, navigate} from 'common/js/drivers'
  import * as types from 'config/api-type'
  import {bins, pageIdentity} from 'common/js/constants'
  import Picker from 'better-picker'

  export default {
    data() {
      return {
        isSend: false,
        delayTime: 0,
        postData: {
          amount: '',
          flag: '',
          type: '',
          loanAmount: '',
          borrowPeriods: '',
          couponId: '',
          bankNo: '',
          name: '',
          idCard: ''
        },
        binName: '',
        payLoading: false
      }
    },
    created() {
      let {amount, flag, type, loanAmount, borrowPeriods, couponId} = this.$route.query
      this.postData.flag = flag
      this.postData.amount = amount
      this.postData.type = type
      this.postData.loanAmount = loanAmount
      this.postData.borrowPeriods = borrowPeriods
      this.postData.couponId = couponId
      // this.init()
      this._handBins()
      this._initBinPicker()
    },
    methods: {
      init() {
        doPost(types.BILL_HELIBAO, {billNo: this.postData.billNo}, {
          success: function(oData) {
            let {billNo, name, curRepayAmount, idNumber} = oData.data
            this.postData.billNo = billNo
            this.postData.name = name
            this.postData.idCard = idNumber
            this.postData.amount = curRepayAmount
          },
          error: function(oData) {
            popup(null, null, oData.msg || '信息获取失败！')
          }
        })
      },
      submit() {
        var self = this
        if (this._validate()) {
          if (this.payLoading) {
            return
          }
          this.payLoading = true
          let {amount, flag, type, loanAmount, borrowPeriods, bankNo, name, idCard, couponId} = this.postData
          let platformType = navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-IOS') > 0 ? 'ios' : (navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-ANDROID') > 0 ? 'android' : 'other')
          let params = {platformType, amount, flag, type, bankNo, name, idCard, loanAmount, borrowPeriods, couponId}
          if (flag === '2') {
            if (platformType === 'ios') {
              params.loanAmount = loanAmount
              params.borrowPeriods = borrowPeriods
            } else {
              params.loanAmount = loanAmount[0]
              params.borrowPeriods = borrowPeriods[0]
            }
          }
          doPost(types.QUIKPAY, params, {
            success: function() {
              self.payLoading = false
              dialog('支付提交成功', '系统将进行扣款，并将短信通知您扣款结果。', [{
                text: '确认',
                key: '0'
              }], {
                success: function(oData) {
                  if (flag === '1') {
                    navigate('EVALUATE_FLOW', '评估流程', {url: pageIdentity.EVALUATE_FLOW}, null, 'ROOT')
                  } else if (flag === '2') {
                    navigate('AUDIT_FLOW', '审核流程', {url: pageIdentity.AUDIT_FLOW}, null, 'ROOT')
                  }
                },
                error: function(oData) {
                  popup(null, null, oData.msg || '支付失败！')
                }
              })
            },
            error: function(oData) {
              self.payLoading = false
              popup(null, null, oData.msg || '支付失败！')
            }
          })
        }
      },
      _validate() {
        let {bankNo, name, idCard} = this.postData
        if (!this.binName) {
          popup(null, null, '请选择银行卡类型！')
          return false
        }
        if (!bankNo) {
          popup(null, null, '请输入银行卡号码！')
          return false
        }
        if (!name) {
          popup(null, null, '请输入持卡人姓名！')
          return false
        }
        if (!idCard) {
          popup(null, null, '请输入身份证号码！')
          return false
        }
        if (this.selectedBin) {
          let binCodes = bins[this.selectedBin].bin
          let isExist = binCodes.some((code) => {
            return bankNo.indexOf(code) === 0
          })
          if (!isExist) {
            popup(null, null, '银行卡格式不对，请重新输入！')
            return false
          }
        }
        return true
      },
      binCarsChoose() {
        this.binPicker.show()
      },
      _handBins() {
        let binText = []
        for (let key in bins) {
          binText.push({
            value: key,
            text: bins[key].name
          })
        }
        this.binText = binText
      },
      _initBinPicker() {
        let self = this
        this.binPicker = new Picker({
          'data': [self.binText],
          'selectedIndex': [0]
        })
        this.binPicker.on('picker.select', (val, index) => {
          this.selectedBin = val[0]
          this.binName = bins[val[0]].name
        })
      },
      sendValidateCode() {
        let {mobile} = this.postData
        if (!/^1\d{10}$/.test(mobile)) {
          popup('', null, '请输入手机号码！')
          return
        }
        doPost(types.SMSCODE, {
          mobile: mobile,
          smsType: '1'
        }, {
          success: (oData) => {
            toast('验证码已发送，请注意查收！')
            this.isSend = true
            this.delayTime = 59
            let timer = setInterval(() => {
              if (this.delayTime === 1) {
                this.isSend = false
                this.delayTime = 0
                clearInterval(timer)
              }
              this.delayTime--
            }, 1000)
          },
          error: (oData) => {
            popup(null, null, oData.msg || '校验码发送失败，请稍后再试！')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .baofu-box
    padding-top: .1rem
  .tel
    padding-right: .1rem
  .button-box
    padding: 1rem .4rem .4rem
  input
    outline: none
    border: 0
    width: 100%
  .identify-code-btn
    color: #0079ff !important
    text-align: center
  .input-active
    background-color: #fff
    &:active
      background-color: #e1e1e1
</style>
