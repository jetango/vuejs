<template>
  <div class="contact-info">
    <div class="list-view h4">
      <div class="item flex">
        <div class="flex-grow label">常用邮箱</div>
        <input class="input-css" type="text" v-model="extendInfo.email" placeholder="请输入常用邮箱">
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex">
        <div class="flex-grow label">QQ账号</div>
        <input class="input-css" type="text" v-model="extendInfo.qqNumber" placeholder="请输入QQ账号">
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex">
        <div class="flex-grow label">微信账号</div>
        <input class="input-css" type="text" v-model="extendInfo.wechatNumber" placeholder="请输入微信账号">
        <i class="iconfont icon-117"></i>
      </div>
    </div>
    <div class="button-box">
      <div class="button button-primary" @click="submitExtendInfo">
        提交
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {popup, doPost, log} from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        extendInfo: {
          email: '',
          qqNumber: '',
          wechatNumber: ''
        }
      }
    },
    methods: {
      submitExtendInfo() {
        if (this._validateInfo(this.extendInfo)) {
          doPost(types.EXTEND_SAVE, this.extendInfo, {
            success: function(oData) {
              if (oData.status === '0') {
                popup(null, null, '信息添加成功')
              }
            },
            error: function(oData) {
              log('', oData)
              popup('', '', oData.msg || '保存信息失败')
            }
          })
        }
      },
      _validateInfo: function(item) {
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        let {
          email,
          qqNumber,
          wechatNumber
        } = item
        if (email === '') {
          popup(null, null, '邮箱不能为空')
          return false
        }
        if (!reg.test(email)) {
          popup(null, null, '邮箱格式有误，请重新输入')
          return false
        }
        if (qqNumber === '') {
          popup(null, null, 'QQ号码不能为空')
          return false
        }
        if (wechatNumber === '') {
          popup(null, null, '微信账号不能为空')
          return false
        }
        return true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .contact-info
    > .list-view
      margin-top: .1rem
    .flex-grow
      color: #000
  .button-box
    padding: 1rem .4rem .4rem
  .text-gary
    color: #525252

  .label
    text-align: left

  .input-css
    outline: none
    text-align: right
    width: 3.5rem
  :focus
    text-align: left

</style>
