<template>
  <div class="personal">
    <div class="info-piece">
      <div class="info-item flex flex-item active">
        <span class="title-gap">姓名</span>
        <input class="flex-grow" type="text" v-model="realName" placeholder="请填写真实姓名" />
        <i class="iconfont icon-117"></i>
      </div>
      <div class="info-item flex flex-item">
        <span class="title-gap">身份证号码</span>
        <input class="flex-grow" type="text" v-model="idNumber" placeholder="请填写" />
        <i class="iconfont icon-117"></i>
      </div>
    </div>
    <div class="info-piece up-gap">
      <div class="info-item flex flex-item active" @click="directContactSelected()">
        <span class="title-gap">直系亲属关系</span>
        <div class="flex-grow">{{directContactRelation ? directContactRelation : '请选择'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="info-item flex flex-item active" @click="directContactChoosed()">
        <span class="title-gap">电话</span>
        <div class="flex-grow">{{directContactMobile ? directContactMobile : '直系亲属电话'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="info-item flex flex-item">
        <span class="title-gap">姓名（请填写真实姓名）</span>
        <div v-show="!directFlag" class="flex-grow">{{directContactName ? directContactName : '直系亲属姓名'}}</div>
        <input v-show="directFlag" size="10" class="flex-grow" type="text" v-model="directContactName" placeholder="请填写" />
        <i class="iconfont icon-117"></i>
      </div>
    </div>
    <div class="info-piece up-gap">
      <div class="info-item flex flex-item active" @click="majorContactSelected()">
        <span class="title-gap">重要亲属关系</span>
        <div class="flex-grow">{{majorContactRelation ? majorContactRelation : '请选择'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="info-item flex flex-item active" @click="majorContactChoosed()">
        <span class="title-gap">电话</span>
        <div class="flex-grow">{{majorContactMobile ? majorContactMobile : '直系亲属电话'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="info-item flex flex-item">
        <span class="title-gap">姓名（请填写真实姓名）</span>
        <div v-show="!majorFlag" class="flex-grow">{{majorContactName ? majorContactName : '直系亲属姓名'}}</div>
        <input v-show="majorFlag" size="10" class="flex-grow" type="text" v-model="majorContactName" placeholder="请填写" />
        <i class="iconfont icon-117"></i>
      </div>
    </div>
    <div class="button-box">
      <div class="button button-primary" @click="confirmContactInfo()">申请借款</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    directRelationship,
    majorRelationship,
    pageIdentity
  } from 'common/js/constants'
  import Picker from 'better-picker'
  import {
    doPost,
    eeLogUBT,
    chooseContact,
    log,
    popup,
    dialog,
    navigate
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
      _initRelationshipPicker() {
        this.directContactPicker = new Picker({
          'data': [directRelationship],
          'selectedIndex': [0]
        })
        this.directContactPicker.on('picker.select', (val, selectedIndex) => {
          this.directContactRelation = val[0]
        })
        this.majorContactPicker = new Picker({
          'data': [majorRelationship],
          'selectedIndex': [0]
        })
        this.majorContactPicker.on('picker.select', (val, selectedIndex) => {
          this.majorContactRelation = val[0]
        })
      },
      directContactChoosed() {
        let self = this
        chooseContact({
          success: function(oData) {
            log('', oData)
            if (Number(oData.status) === 0) {
              let {
                name,
                tel
              } = oData.data
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
              let {
                name,
                tel
              } = oData.data
              self.majorContactName = name
              self.majorContactMobile = tel.replace(/-|_|\s+/g, '')
              self.checkName(name, 'majorContact')
            }
          }
        })
        eeLogUBT('ContactInfomation.Action.MainPhone', 'click')
        eeLogUBT('ContactInfomation.Action.MainName', 'click')
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
      },
      confirmContactInfo() {
        let self = this
        let {
          realName,
          idNumber,
          directContactRelation,
          directContactName,
          directContactMobile,
          majorContactRelation,
          majorContactName,
          majorContactMobile
        } = this.$data
        directContactMobile = this._trim(directContactMobile)
        majorContactMobile = this._trim(majorContactMobile)
        let params = {
          realName,
          idNumber,
          directContactRelation,
          directContactName,
          directContactMobile,
          majorContactRelation,
          majorContactName,
          majorContactMobile
        }
        if (this._validate(params)) {
          if (this.loading) {
            return
          } else {
            this.loading = true
          }
          eeLogUBT('ContactInfomation.Action.Submit', 'click')
          doPost(types.BASEINFO_SAVE, params, {
            success: function(oData) {
              self.loading = false
              if (oData.status === '0') {
                navigate('ASSESS_INFO', '评估', {
                  url: pageIdentity.ASSESS_INFO
                }, null, 'ROOT')
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
      _validate(params) {
        let re = /^1\d{10}$/
        let nameRel = /^[\u4e00-\u9fa5]+$/
        let {
          realName,
          idNumber,
          directContactRelation,
          directContactMobile,
          majorContactRelation,
          majorContactMobile
        } = params
        if (!realName) {
          popup('', '', '请填写真实姓名！')
          return false
        } else if (!nameRel.test(realName)) {
          popup('', '', '请输入中文姓名！')
          return false
        } else if (!idNumber) {
          popup('', '', '请填写身份证号！')
          return false
        } else if (!this._validateIdNumber(idNumber)) {
          popup('', '', '身份证输入不合法')
          return false
        } else if (!directContactRelation) {
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
      _validateIdNumber(idNumber) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        return reg.test(idNumber)
      }
    },
    mounted: function() {
      eeLogUBT('ContactInfomation.Load.Goin', 'goin')
      this._initRelationshipPicker()
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
      padding: 0 .3rem 0 .4rem
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

  input::-webkit-input-placeholder {
    color: #525252
  }
  input:-moz-placeholder {
    color: #525252
  }
  input::-moz-placeholder {
    color: #525252
  }
  input::-ms-input-placeholder {
    color: #525252
  }
    
</style>