<template>
  <div class="contact-info">
    <div class="list-view h4">
      <div class="item flex h3">
        <div class="flex-grow">直系联系人</div>
      </div>
      <div class="item flex" @click="directContactSelected()">
        <div class="flex-grow">关系</div>
        <div>{{directContactRelation ? directContactRelation : '请选择'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex" @click="directContactChoosed()">
        <div class="flex-grow">电话</div>
        <div v-if="!directContactMobile">直系亲属电话</div>
        <div v-if="directContactMobile">
          <input class="text-right text-gary" type="tel" v-model="directContactMobile" readonly>
        </div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex">
        <div class="flex-grow">姓名</div>
        <div v-if="!directFlag">{{directContactName ? directContactName : '直系亲属姓名'}}</div>
        <input v-if="directFlag" size="10" class="flex-grow item-input" type="text" v-model="directContactName" placeholder="请填写" />
        <i class="iconfont icon-117"></i>
      </div>
    </div>

    <div class="list-view h4">
      <div class="item flex h3">
        <div class="flex-grow">重要联系人</div>
      </div>
      <div class="item flex" @click="majorContactSelected()">
        <div class="flex-grow">关系</div>
        <div>{{majorContactRelation ? majorContactRelation : '请选择'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex" @click="majorContactChoosed()">
        <div class="flex-grow">电话</div>
        <div v-if="!majorContactMobile">重要亲属电话</div>
        <div v-if="majorContactMobile">
          <input class="text-right text-gary" type="tel" v-model="majorContactMobile" readonly>
        </div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex">
        <div class="flex-grow">姓名</div>
        <div v-if="!majorFlag">{{majorContactName ? majorContactName : '重要亲属姓名'}}</div>
        <input v-if="majorFlag" size="10" class="flex-grow item-input" type="text" v-model="majorContactName" placeholder="请填写" />
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
  import {directRelationship, majorRelationship} from 'common/js/constants'
  import Picker from 'better-picker'
  import {doPost, chooseContact, popup, endPage, log, eeLogUBT, dialog} from 'common/js/drivers'
  import * as types from 'config/api-type'

  export default {
    data() {
      return {
        directContactRelation: '',
        directContactName: '',
        directContactMobile: '',
        directFlag: false,
        majorContactRelation: '',
        majorContactName: '',
        majorContactMobile: '',
        majorFlag: false
      }
    },
    methods: {
      directContactSelected() {
        this.directContactPicker.show()
        eeLogUBT('ContactInfomation.Action.DirectRelation', 'click')
      },
      majorContactSelected() {
        this.majorContactPicker.show()
        eeLogUBT('ContactInfomation.Action.MainRelation', 'click')
      },
      directContactChoosed() {
        let self = this
        chooseContact({
          success: function(oData) {
            log('', oData)
            if (Number(oData.status) === 0) {
              let {name, tel} = oData.data
              self.directContactName = name
              self.directContactMobile = tel.replace(/-|_|\s+/g, '')
              self.checkName(name, 'directContact')
            }
          }
        })
        eeLogUBT('ContactInfomation.Action.DirectPhone', 'click')
        eeLogUBT('ContactInfomation.Action.DirectName', 'click')
      },
      majorContactChoosed() {
        let self = this
        chooseContact({
          success: function(oData) {
            if (Number(oData.status) === 0) {
              let {name, tel} = oData.data
              self.majorContactName = name
              self.majorContactMobile = tel.replace(/-|_|\s+/g, '')
              self.checkName(name, 'majorContact')
            }
          }
        })
        eeLogUBT('ContactInfomation.Action.MainPhone', 'click')
        eeLogUBT('ContactInfomation.Action.MainName', 'click')
      },
      confirmContactInfo() {
        let self = this
        let {directContactRelation, directContactName, directContactMobile, majorContactRelation, majorContactName, majorContactMobile} = this.$data
        directContactMobile = this._trim(directContactMobile)
        majorContactMobile = this._trim(majorContactMobile)
        let params = {directContactRelation, directContactName, directContactMobile, majorContactRelation, majorContactName, majorContactMobile}
        if (this._validate(params)) {
          if (this.loading) {
            return
          } else {
            this.loading = true
          }
          eeLogUBT('ContactInfomation.Action.Submit', 'click')
          doPost(types.CONTACT_POST, params, {
            success: function(oData) {
              self.loading = false
              if (oData.status === '0') {
                endPage({})
              }
            },
            error: function(oData) {
              self.loading = false
              popup(null, null, oData.msg || '信息保存失败，请稍后再试')
            }
          })
        }
      },
      _trim(str) {
        return str.replace(/\s+/g, '')
      },
      _initRelationshipPicker() {
        this.directContactPicker = new Picker({
          'data': [directRelationship],
          'selectedIndex': [0]
        })
        this.directContactPicker.on('picker.select', (val, selectedIndex) => {
          // if (this.majorContactRelation && val[0] === this.majorContactRelation) {
          //   popup('', '', '联系人关系重复选择！')
          //   return false
          // }
          this.directContactRelation = val[0]
        })
        this.majorContactPicker = new Picker({
          'data': [majorRelationship],
          'selectedIndex': [0]
        })
        this.majorContactPicker.on('picker.select', (val, selectedIndex) => {
          // if (this.directContactRelation && val[0] === this.directContactRelation) {
          //   popup('', '', '联系人关系重复选择！')
          //   return false
          // }
          this.majorContactRelation = val[0]
        })
      },
      _destroyPicker() {
        // this.directContactPicker.hide()
        // this.majorContactPicker.hide()
      },
      _validate(params) {
        let re = /^1\d{10}$/
        let {directContactRelation, directContactMobile, majorContactRelation, majorContactMobile} = params
        if (!directContactRelation) {
          popup('', '', '请选择直接联系人！')
          return false
        } else if (!directContactMobile || !re.test(directContactMobile)) {
          popup('', '', '请正确选择直接联系人手机号码！')
          return false
        } else if (!majorContactRelation) {
          popup('', '', '请选择重要联系人！')
          return false
        } else if (!majorContactMobile || !re.test(majorContactMobile)) {
          popup('', '', '请正确选择重要联系人手机号码！')
          return false
        } else if (majorContactMobile === directContactMobile) {
          popup('', '', '手机号码不可以相同！')
          return false
        }
        return true
      },
      checkName: function(name, from) {
        let rel = /^[\u4e00-\u9fa5]+$/
        if (name) {
          if (!rel.test(name) || (rel.test(name) && name.length < 2)) {
            dialog(null, '请确认填写的是真实姓名', [{
              text: '确认',
              key: '0'
            }, {
              text: '去修改',
              key: '1'
            }], function(oData) {
            })
            if (from === 'directContact') {
              this.directFlag = true
            } else if (from === 'majorContact') {
              this.majorFlag = true
            }
            return false
          } else {
            if (from === 'directContact') {
              this.directFlag = false
            } else if (from === 'majorContact') {
              this.majorFlag = false
            }
          }
          doPost(types.CHECK_NAME, {
            checkName: name
          }, {
            success: (oData) => {
              if (oData.data.checkStatus !== '0') {
                dialog(null, oData.data.checkMsg || '请确认联系人填写的是真实姓名！', [{
                  text: '确认',
                  key: '0'
                }, {
                  text: '去修改',
                  key: '1'
                }], function(oData) {
                })
                if (from === 'directContact') {
                  this.directFlag = true
                } else if (from === 'majorContact') {
                  this.majorFlag = true
                }
              } else if (oData.data.checkStatus === '0') {
                if (from === 'directContact') {
                  this.directFlag = false
                } else if (from === 'majorContact') {
                  this.majorFlag = false
                }
              }
            },
            error: function(oData) {}
          })
        }
        // this.directFlag = true
        // this.majorFlag = true
      }
    },
    mounted() {
      let self = this
      if (this.userId) {
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
          }
        })
      } else {
        this._initRelationshipPicker()
      }
      eeLogUBT('ContactInfomation.Load.Goin', 'goin')
    },
    beforeDestroy() {
      this._destroyPicker()
    },
    created() {
      this.userId = this.$route.query.userId
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

  .item-input
    text-align: right
    line-height: 1
    outline: none
    border: 0
    &:active
      background-color: #e1e1e1
</style>
