<template>
  <div class="contact-info">
    <div class="list-view h4">
      <div class="item flex h3">
        <div class="flex-grow">直系联系人</div>
      </div>
      <div class="item flex">
        <div class="flex-grow">关系</div>
        <div>{{directContactRelation}}</div>
      </div>
      <div class="item flex">
        <div class="flex-grow">电话</div>
        <div>{{directContactMobile}}</div>
      </div>
      <div class="item flex">
        <div class="flex-grow">姓名</div>
        <div>{{directContactName}}</div>
      </div>
    </div>

    <div class="list-view h4">
      <div class="item flex h3">
        <div class="flex-grow">重要联系人</div>
      </div>
      <div class="item flex">
        <div class="flex-grow">关系</div>
        <div>{{majorContactRelation}}</div>
      </div>
      <div class="item flex">
        <div class="flex-grow">电话</div>
        <div>{{majorContactMobile}}</div>
      </div>
      <div class="item flex">
        <div class="flex-grow">姓名</div>
        <div>{{majorContactName}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {doPost, popup} from 'common/js/drivers'
  import * as types from 'config/api-type'

  export default {
    data() {
      return {
        directContactRelation: '',
        directContactName: '',
        directContactMobile: '',
        majorContactRelation: '',
        majorContactName: '',
        majorContactMobile: ''
      }
    },
    methods: {
      _fetchContactData() {
        let self = this
        doPost(types.CONTACT_FETCH, null, {
          success: function(oData) {
            if (oData.status === '0') {
              let {directContactRelation, directContactName, directContactMobile, majorContactRelation, majorContactName, majorContactMobile} = oData.data
              self.directContactRelation = directContactRelation
              self.directContactName = directContactName
              self.directContactMobile = directContactMobile
              self.majorContactRelation = majorContactRelation
              self.majorContactName = majorContactName
              self.majorContactMobile = majorContactMobile
            }
          },
          error: function(oData) {
            popup('', '', oData.msg || '信息获取失败，请稍后再试')
          }
        })
      }
    },
    mounted() {
      this._fetchContactData()
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
</style>
