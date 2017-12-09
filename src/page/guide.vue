<template>
  <div class="guide">
    <div class="up-content">
      <div class="input-area">
        <div class="input-bg flex flex-item flex-grow">
          <input v-model="params.mobile" type="text" name="mobile" placeholder="请输入您的手机号" />
        </div>
        <div class="input-bg flex flex-item flex-grow">
          <input v-model="params.validate" type="text" name="validate" placeholder="请输入验证码" />
          <div v-show="!isSend" class="btn-css" @click="getValidate">获取短信验证码</div>
          <div v-show="isSend" class="btn-css is-send" @click="getValidate">{{delayTime}}S后重新获取</div>
        </div>
        <div class="input-bg flex flex-item flex-grow">
          <input v-model="params.password" type="text" name="mobile" placeholder="设置密码（6-10字母数字组合）" />
        </div>
        <div @click="register" class="register">立即注册申请借款</div>
      </div>
    </div>
    <div class="middle-content"></div>
    <div class="down-content"></div>
  </div>
</template>

<script>
  import {popup, doPost, toast} from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        params: {
          mobile: '',
          validate: '',
          password: ''
        },
        delayTime: 0,
        isSend: false
      }
    },
    methods: {
      register: function() {
        console.log(JSON.stringify(this.params))
      },
      getValidate: function() {
        let phone = this.params.mobile
        if (!/^1\d{10}$/.test(phone)) {
          popup('', null, '请输入手机号码！')
          return false
        }
        doPost(types.SMSCODE, {
          mobile: phone,
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

<style scoped lang="stylus" type="stylesheet/stylus">
  @import "~common/stylus/base"

  .guide
    position: relative

    .up-content
      width: 6.4rem
      height: 11.57rem
      margin: 0 auto
      background: url('~common/image/guide/001.jpg') no-repeat
      background-size: cover
      padding-top: 1px

      .input-area
        width: 100%
        margin-top: 6.65rem

        .register
          width: 5.84rem
          height: 1.04rem
          background: url('~common/image/guide/YLT_bt_01.png') no-repeat
          background-size: cover
          margin: 0 auto
          color: #ffffff
          line-height: .95rem
          text-align: center
          font-size: .3rem

        .input-bg
          margin: 0 .4rem
          background-color: #eeeff3
          height: .8rem
          border-radius: .06rem
          margin-bottom: .2rem
          position: relative

          input
            background-color: #eeeff3
            color: #000
            padding-left: .2rem
            outline: none
            border: 0
            font-size: .28rem
            height: .6rem
            width: 100%

          .btn-css
            position: absolute
            right: .05rem
            top: .05rem
            height: .7rem
            width: 2rem
            border-radius: .06rem
            color: #ffffff
            background-color: #89cd40
            text-align: center
            line-height: .7rem
            font-size: .26rem
        
        .is-send
          background-color: #b6b6b6 !important

    .middle-content
      width: 6.4rem
      height: 8.96rem
      margin: 0 auto
      background: url('~common/image/guide/002.jpg') no-repeat
      background-size: cover

    .down-content
      width: 6.4rem
      height: 9.8rem
      margin: 0 auto
      background: url('~common/image/guide/003.jpg') no-repeat
      background-size: cover
</style>