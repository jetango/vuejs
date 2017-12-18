<template>
  <div class="baofu-box">
    <div class="list-view h4">
      <div class="item flex">
        <div class="title tel">应还款金额：5600元</div>
      </div>
      <div class="item flex">
        <div class="title tel">账单号：5600YT</div>
      </div>
      <div class="item flex" @click="binCarsChoose()">
        <span class="flex-grow">银行卡类型：</span>
        <span>{{binName ? binName : '请选择'}}</span>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex">
        <div class="title tel">银行卡号：</div>
        <div class="flex-grow">
          <input type="tel" maxlength="20" placeholder="请正确输入银行卡号"/>
        </div>
      </div>
      <div class="item flex">
        <div class="title tel">持卡人姓名：</div>
        <div class="flex-grow">
          <input type="text" placeholder="请正确输入姓名"/>
        </div>
      </div>
      <div class="item flex">
        <div class="title tel">身份证号码：</div>
        <div class="flex-grow">
          <input type="text" placeholder="请正确输入身份证号码"/>
        </div>
      </div>
    </div>
    <div class="button-box">
      <a class="button button-primary" @click="submit">确认还款</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {doPost, popup, toast, dialog, endPage} from 'common/js/drivers'
  import * as types from 'config/api-type'
  import {bins} from 'common/js/constants'
  import Picker from 'better-picker'

  export default {
    data() {
      return {
        isSend: false,
        delayTime: 0,
        postData: {
          bankNo: '',
          name: '',
          idCard: ''
        },
        binName: ''
      }
    },
    created() {
      this._handBins()
      this._initBinPicker()
    },
    methods: {
      init() {

      },
      submit() {
        if (this._validate()) {
          doPost(types.xxxx, {}, {
            success: function() {
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
            },
            error: function(oData) {
              popup(null, null, oData.msg || '还款提交失败！')
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
</style>
