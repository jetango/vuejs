<template>
  <div class="contact-info">
    <div class="list-view h4">
      <div class="item flex">
        <div class="flex-grow label">常用邮箱</div>
        <input class="input-css" type="text" v-model="extendInfo.email" placeholder="请输入常用邮箱" @click="extendInfoClick('email')" maxlength="50">
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex">
        <div class="flex-grow label">QQ账号</div>
        <input class="input-css" type="text" v-model="extendInfo.qqNumber" placeholder="请输入QQ账号"  @click="extendInfoClick('qq')" maxlength="20">
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex">
        <div class="flex-grow label">微信账号</div>
        <input class="input-css" type="text" v-model="extendInfo.wechatNumber" placeholder="请输入微信账号"  @click="extendInfoClick('wechat')" maxlength="50">
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
  import {popup, doPost, endPage, eeLogUBT} from 'common/js/drivers'
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
          eeLogUBT('OtherInfo.Action.Submit', 'click')
          doPost(types.EXTEND_SAVE, this.extendInfo, {
            success: function(oData) {
              if (oData.status === '0') {
                endPage({})
              }
            },
            error: function(oData) {
              popup('', '', oData.msg || '保存信息失败')
            }
          })
        }
      },
      extendInfoClick(type) {
        if (type === 'wechat') {
          eeLogUBT('OtherInfo.Action.Wechat', 'click')
        } else if (type === 'qq') {
          eeLogUBT('OtherInfo.Action.Qq', 'click')
        } else if (type === 'email') {
          eeLogUBT('OtherInfo.Action.Email', 'click')
        }
      },
      _validateInfo: function(item) {
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        let email = item.email
        if (email && !reg.test(email)) {
          popup(null, null, '邮箱格式有误，请重新输入')
          return false
        }
        return true
      },
      fetchExtendInfo() {
        let self = this
        doPost(types.EXTEND_QUERY, {}, {
          success: function(oData) {
            if (oData.status === '0') {
              if (oData.data) {
                self.extendInfo.email = oData.data.email || ''
                self.extendInfo.qqNumber = oData.data.qqNumber || ''
                self.extendInfo.wechatNumber = oData.data.wechatNumber || ''
              }
            }
          },
          error: function(oData) {
            popup('', '', oData.msg || '保存信息失败')
          }
        })
      }
    },
    created() {
      eeLogUBT('OtherInfo.Load.Goin', 'goin')
    },
    mounted() {
      this.fetchExtendInfo()
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

  .item
    &:active
      background: #fff !important

</style>
