<template>
  <div class="personal">
    <div class="info-piece">
      <div class="info-item flex flex-item active">
        <span class="title-gap">姓名</span>
        <div class="flex-grow">{{realName}}</div>
      </div>
      <div class="info-item flex flex-item">
        <span class="title-gap">身份证号码</span>
        <div class="flex-grow">{{idNumber}}</div>
      </div>
    </div>
    <div class="info-piece up-gap">
      <div class="info-item flex flex-item active">
        <span class="title-gap">直系亲属关系</span>
        <div class="flex-grow">{{directContactRelation}}</div>
      </div>
      <div class="info-item flex flex-item active">
        <span class="title-gap">电话</span>
        <div class="flex-grow">{{directContactMobile}}</div>
      </div>
      <div class="info-item flex flex-item">
        <span class="title-gap">姓名</span>
        <div class="flex-grow">{{directContactName}}</div>
      </div>
    </div>
    <div class="info-piece up-gap">
      <div class="info-item flex flex-item active">
        <span class="title-gap">重要亲属关系</span>
        <div class="flex-grow">{{majorContactRelation}}</div>
      </div>
      <div class="info-item flex flex-item active">
        <span class="title-gap">电话</span>
        <div class="flex-grow">{{majorContactMobile}}</div>
      </div>
      <div class="info-item flex flex-item">
        <span class="title-gap">姓名</span>
        <div class="flex-grow">{{majorContactName}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    popup,
    doPost,
    log,
    eeLogUBT
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        realName: '',
        idNumber: '',
        directContactRelation: '',
        directContactName: '',
        directContactMobile: '',
        majorContactRelation: '',
        majorContactName: '',
        majorContactMobile: ''
      }
    },
    methods: {
      initPage: function() {
        doPost(types.BASEINFO_QUERY, {}, {
          success: (oData) => {
            if (oData.status === '0') {
              let person = oData.data
              this.realName = person.realName
              this.idNumber = person.idNumber
              this.directContactRelation = person.directContactRelation
              this.directContactName = person.directContactName
              this.directContactMobile = person.directContactMobile
              this.majorContactRelation = person.majorContactRelation
              this.majorContactName = person.majorContactName
              this.majorContactMobile = person.majorContactMobile
            }
          },
          error: (oData) => {
            log('', oData)
            popup('', '', oData.msg || '获取用户信息失败')
          }
        })
      }
    },
    mounted: function() {
      eeLogUBT('PersonalData.Load.Goin', 'goin')
      this.initPage()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .info-piece
    background-color: #fff
    position: relative
    .info-item
      height: .9rem
      padding: 0 .4rem 0 .4rem
      .title-gap
        padding: 0 .2rem 0 0
        white-space:nowrap
      div
        text-align: right
        color: #525252
        font-size: .28rem
      input
        text-align: right
        line-height: 1
        outline: none
        border: 0
  .up-gap
    margin-top: .1rem

  .button-box
    padding: 1rem .4rem .4rem
    
</style>