<template>
  <div class="contact-info">
    <div class="list-view h4">
      <div class="item flex h3">
        <div class="flex-grow bold">直系联系人</div>
      </div>
      <div class="item flex" @click="directContactSelected()">
        <div class="flex-grow">关系</div>
        <div>{{directContactRelation ? directContactRelation : '请选择'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex" @click="directContactChoosed()">
        <div class="flex-grow">电话</div>
        <div>{{directContactMobile ? directContactMobile : '直系亲属电话'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex" @click="directContactChoosed()">
        <div class="flex-grow">姓名</div>
        <div>{{directContactName ? directContactName : '直系亲属姓名'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
    </div>

    <div class="list-view h4">
      <div class="item flex h3">
        <div class="flex-grow bold">重要联系人</div>
      </div>
      <div class="item flex" @click="majorContactSelected()">
        <div class="flex-grow">关系</div>
        <div>{{majorContactRelation ? majorContactRelation : '请选择'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex" @click="majorContactChoosed()">
        <div class="flex-grow">电话</div>
        <div>{{majorContactMobile ? majorContactMobile : '重要亲属电话'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex" @click="majorContactChoosed()">
        <div class="flex-grow">姓名</div>
        <div>{{majorContactName ? majorContactName : '重要亲属姓名'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
    </div>
    <div class="button-box">
      <div class="button button-primary" @click="confirmContactInfo()">
        提交
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {relationship} from 'common/js/constants'
  import Picker from 'better-picker'
  import {doPost, chooseContact} from 'common/js/drivers'
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
      directContactSelected() {
        this.directContactPicker.show()
      },
      majorContactSelected() {
        this.majorContactPicker.show()
      },
      directContactChoosed() {
        let self = this
        chooseContact({
          success: function(oData) {
            if (Number(oData.status) === 0) {
              let {name, tel} = oData.data
              self.directContactName = name
              self.directContactMobile = tel
            }
          }
        })
      },
      majorContactChoosed() {
        let self = this
        chooseContact({
          success: function(oData) {
            if (Number(oData.status) === 0) {
              let {name, tel} = oData.data
              self.majorContactName = name
              self.majorContactMobile = tel
            }
          }
        })
      },
      confirmContactInfo() {
        let {directContactRelation, directContactName, directContactMobile, majorContactRelation, majorContactName, majorContactMobile} = this.$data
        doPost(types.CONTACT_POST, {directContactRelation, directContactName, directContactMobile, majorContactRelation, majorContactName, majorContactMobile}, {
          success: function(oData) {
            // TODO
          },
          error: function(oData) {
          }
        })
      },
      _initRelationshipPicker() {
        this.directContactPicker = new Picker({
          'data': [relationship],
          'selectedIndex': [0]
        })
        this.directContactPicker.on('picker.select', (val, selectedIndex) => {
          this.directContactRelation = val[0]
        })
        this.majorContactPicker = new Picker({
          'data': [relationship],
          'selectedIndex': [0]
        })
        this.majorContactPicker.on('picker.select', (val, selectedIndex) => {
          this.majorContactRelation = val[0]
        })
      },
      _destroyPicker() {
        // this.directContactPicker.hide()
        // this.majorContactPicker.hide()
      }
    },
    mounted() {
      this._initRelationshipPicker()
    },
    beforeDestroy() {
      this._destroyPicker()
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
