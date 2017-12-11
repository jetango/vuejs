<template>
  <div class="baofu-box">
    <div class="list-view h4">
      <div class="item flex">
        <div class="title tel">应还款金额：5600元</div>
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
      <div class="item flex">
        <div class="title tel">银行卡预留手机号：</div>
        <div class="flex-grow">
          <input type="tel" maxlength="11" v-model="postData.mobile"/>
        </div>
      </div>
      <div class="item flex flex-item">
        <span class="title tel">验证码：</span>
        <span class="flex-grow">
          <input class="identify-code-input" type="tel" placeholder="短信验证码" maxlength="6">
        </span>
        <div v-if="!isSend" class="identify-code-btn" @click="sendValidateCode()">发送验证码</div>
        <div v-if="isSend" class="identify-code-btn">{{delayTime}}s重新获取</div>
      </div>
    </div>
    <div class="button-box">
      <a class="button button-primary" @click="submit">确认还款</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {doPost, popup, toast} from 'common/js/drivers'
  import * as types from 'config/api-type'

  export default {
    data() {
      return {
        isSend: false,
        delayTime: 0,
        postData: {

        }
      }
    },
    methods: {
      submit() {
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
