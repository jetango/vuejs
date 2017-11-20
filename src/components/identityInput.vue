<template>
  <div class="identity-input">
    <p class="text-center title">身份证信息将通过公安部认证，非本人信息不得通过审核</p>
    <div class="id-box">
      <div class="flex">
        <div class="flex-grow text-center" @click="idCardFrontClicked()">
          <p>身份证人像面</p>
          <div class="img-box">
            <img v-show="!identityInfo.idCardFrontPhoto" src="~/common/image/shenfenzheng.png_tu_002.png">
            <div class="mask-box" v-show="identityInfo.idCardFrontPhoto">
              <img class="mask-img" src="~/common/image/shenfenzheng.png_tu_001.png">
              <img :src="identityInfo.idCardFrontPhoto">
            </div>
          </div>
        </div>
        <div class="flex-grow text-center" @click="idCardBackClicked()">
          <p>身份证国徽面</p>
          <div class="img-box">
            <img v-show="!identityInfo.idCardBackPhoto" src="~/common/image/shenfenzheng.png_tu_0013.png">
            <div class="mask-box" v-show="identityInfo.idCardBackPhoto">
              <img class="mask-img" src="~/common/image/shenfenzheng.png_tu_001.png">
              <img :src="identityInfo.idCardBackPhoto">
            </div>
          </div>
        </div>
      </div>
      <div class="text-center tip" :class="{'v-hide': !(identityInfo.idCardFrontPhoto || identityInfo.idCardBackPhoto)}">请核对以下信息，内容有误请修改</div>
    </div>
    <div class="identity-detail" v-show="identityFrontStatus || identityBackStatus">
      <p v-show="identityFrontStatus">姓名：{{identityInfo.realName}}</p>
      <p v-show="identityFrontStatus">身份证号：{{identityInfo.idNumber}}</p>
      <p v-show="identityFrontStatus">出生年月：{{identityInfo.birth}}</p>
      <p v-show="identityFrontStatus">民族：{{identityInfo.nation}}</p>
      <p v-show="identityFrontStatus">住址：{{identityInfo.idAddress}}</p>
      <p v-show="identityBackStatus">签发机关：{{identityInfo.signOrg}}</p>
      <p v-show="identityBackStatus">有效期：{{identityInfo.effectTime}}</p>
    </div>
    <div class="list-view h4">
      <div class="item flex" @click="faceRecognition()">
        <div class="flex-grow">人脸识别</div>
        <div>{{identityInfo.faceRecognition === 1 ? '验证成功' : (identityInfo.faceRecognition === 0 ? '验证失败' : '去验证')}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex" @click="addressChanged()">
        <div class="flex-grow">常住地址</div>
        <div>{{fullAddress ? fullAddress : '省市区'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item">
        <input type="text" placeholder="请填写详细信息" v-model="identityInfo.livingAddress">
      </div>
      <div class="item flex" @click="educationalChanged()">
        <div class="flex-grow">最高学历</div>
        <div>{{identityInfo.highestDegree ? identityInfo.highestDegree : '请选择'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex" @click="maritalChanged()">
        <div class="flex-grow">婚姻状况</div>
        <div>{{identityInfo.maritalStatus ? identityInfo.maritalStatus : '请选择'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
    </div>
    <div class="button-box">
      <div class="button button-primary" @click="confirmIdentity()">
        提交
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {doPost, idCardFrontInfo, idCardBackInfo, faceRecognition, popup} from 'common/js/drivers'
  import Picker from 'better-picker'
  import * as types from 'config/api-type'
  import {educational, maritalStatus, provinces, citys, dists} from 'common/js/constants'

  export default {
    data() {
      return {
        identityInfo: {
          idCardFrontPhoto: '',
          idCardBackPhoto: '',
          realName: '',
          idNumber: '',
          birth: '',
          nation: '',
          idAddress: '',
          signOrg: '',
          effectTime: '',
          faceRecognition: '',
          faceRecognitionSimilarity: '',
          livingProvince: '',
          livingCity: '',
          livingDistrict: '',
          livingAddress: '',
          highestDegree: '',
          maritalStatus: ''
        },
        identityFrontStatus: false,
        identityBackStatus: false
      }
    },
    methods: {
      confirmIdentity() {
        let {identityInfo} = this.$data
        let self = this
        if (this._validate()) {
          if (this.loading) {
            return
          } else {
            this.loading = true
          }
          doPost(types.IDENTITY_POST, identityInfo, {
            success: function(oData) {
              self.loading = false
              if (oData.status === '0') {
                self.$router.push({
                  path: '/identity-detail'
                })
              }
            },
            error: function(oData) {
              self.loading = false
              popup('', '', oData.msg || '保存信息失败')
            }
          })
        }
      },
      maritalChanged() {
        this.maritalPicker.show()
      },
      educationalChanged() {
        this.educationalPicker.show()
      },
      addressChanged() {
        this.addressPicker.show()
      },
      faceRecognition() {
        let self = this
        let {idCardFrontPhoto, idCardBackPhoto} = this.identityInfo
        if (!idCardFrontPhoto || !idCardBackPhoto) {
          popup('', '', '请先选择身份证信息！')
        } else {
          faceRecognition({
            success: function(oData) {
              if (oData.status === '0') {
                let {faceRecognition, faceRecognitionSimilarity} = oData.data
                self.identityInfo.faceRecognitionSimilarity = faceRecognitionSimilarity
                self.identityInfo.faceRecognition = faceRecognition
              }
            },
            error: function(oData) {
              popup('', '', oData.msg || '请重新进行人脸识别！')
            }
          })
        }
      },
      idCardFrontClicked() {
        let self = this
        idCardFrontInfo({
          success: function(oData) {
            if (oData.status === '0') {
              self.identityFrontStatus = true
              let {idCardFrontPhoto, realName, idNumber, birth, nation, idAddress} = oData.data
              self.identityInfo.idCardFrontPhoto = `data:image/png;base64,${idCardFrontPhoto}`
              self.identityInfo.realName = realName
              self.identityInfo.idNumber = idNumber
              self.identityInfo.birth = birth
              self.identityInfo.nation = nation
              self.identityInfo.idAddress = idAddress
            } else {
              self.identityFrontStatus = false
            }
          },
          error: function(oData) {
            self.identityFrontStatus = false
          }
        })
      },
      idCardBackClicked() {
        var self = this
        idCardBackInfo({
          success: function(oData) {
            if (oData.status === '0') {
              self.identityBackStatus = true
              let {idCardBackPhoto, signOrg, effectTime} = oData.data
              self.identityInfo.idCardBackPhoto = `data:image/png;base64,${idCardBackPhoto}`
              self.identityInfo.signOrg = signOrg
              self.identityInfo.effectTime = effectTime
            } else {
              self.identityBackStatus = false
            }
          },
          error: function(oData) {
            self.identityBackStatus = false
          }
        })
      },
      _validate() {
        let {idCardFrontPhoto, idCardBackPhoto, faceRecognition, livingProvince, livingAddress, highestDegree, maritalStatus} = this.identityInfo
        if (!idCardFrontPhoto) {
          popup('', '', '请验证身份证人像面！')
          return false
        }
        if (!idCardBackPhoto) {
          popup('', '', '请验证身份证国徽面！')
          return false
        }
        if (faceRecognition === '') {
          popup('', '', '请验证人脸识别！')
          return false
        }
        if (!livingProvince) {
          popup('', '', '请选择省市区！')
          return false
        }
        if (!livingAddress) {
          popup('', '', '请填写详细信息！')
          return false
        }
        if (!livingAddress) {
          popup('', '', '请填写详细信息！')
          return false
        }
        if (!highestDegree) {
          popup('', '', '请选择最高学历！')
          return false
        }
        if (!maritalStatus) {
          popup('', '', '请选择婚姻状况！')
          return false
        }
        return true
      },
      _initMaritalPicker() {
        this.maritalPicker = new Picker({
          'data': [maritalStatus],
          'selectedIndex': [0]
        })
        this.maritalPicker.on('picker.select', (val, index) => {
          this.identityInfo.maritalStatus = val[0]
        })
      },
      _initEducationalPicker() {
        this.educationalPicker = new Picker({
          'data': [educational],
          'selectedIndex': [0]
        })
        this.educationalPicker.on('picker.select', (val, index) => {
          this.identityInfo.highestDegree = val[0]
        })
      },
      _initAddressPicker() {
        this.provinceIdx = 0
        this.cityIdx = 0
        this.addressPicker = new Picker({
          'data': [provinces, citys[provinces[0].value], dists[provinces[0].value + '$$' + citys[provinces[0].value][0].value]],
          'selectedIndex': [0, 0, 0]
        })
        this.addressPicker.on('picker.select', (val, selectedIndex) => {
          let pId = provinces[selectedIndex[0]].value
          let cId = citys[pId][selectedIndex[1]].value
          let dId = `${pId}$$${cId}`
          if (provinces[this.provinceIdx].text && citys[pId][this.cityIdx].text && dists[dId][selectedIndex[2]].text) {
            this.identityInfo.livingProvince = provinces[this.provinceIdx].text
            this.identityInfo.livingCity = citys[pId][this.cityIdx].text
            this.identityInfo.livingDistrict = dists[dId][selectedIndex[2]].text
          }
        })
        this.addressPicker.on('picker.change', (index, selectedIndex) => {
          if (index === 0) {
            this.provinceIdx = selectedIndex
            this.cityIdx = 0
            this.addressPicker.refillColumn(1, citys[provinces[selectedIndex].value])
            this.addressPicker.refillColumn(2, dists[provinces[selectedIndex].value + '$$' + citys[provinces[selectedIndex].value][0].value])
          } else if (index === 1) {
            this.cityIdx = selectedIndex
            this.addressPicker.refillColumn(2, dists[provinces[this.provinceIdx].value + '$$' + citys[provinces[this.provinceIdx].value][selectedIndex].value])
          }
        })
      }
    },
    computed: {
      isShow() {
        let {idCardFrontPhoto, idCardBackPhoto} = this.identityInfo
        return idCardFrontPhoto || idCardBackPhoto
      },
      fullAddress() {
        let {livingProvince, livingCity, livingDistrict} = this.identityInfo
        return livingProvince ? `${livingProvince}-${livingCity}-${livingDistrict}` : ''
      }
    },
    mounted() {
      this._initMaritalPicker()
      this._initEducationalPicker()
      this._initAddressPicker()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .identity-input
    padding-top: .1rem
  .title
    font-size: .22rem
    height: .34rem
    line-height: .34rem
    color: #525252
    background: #fff
    margin-bottom: .38rem
  .id-box
    padding: 0 .4rem
    .tip
      height: .5rem
      line-height: .5rem
      font-size: .22rem
    p
      font-size: .22rem
      color: #525252
      margin-bottom: .2rem
    img
      width: 100%
    .flex-grow
      &:first-child
        margin-right: .1rem
      &:last-child
        margin-left: .1rem
    .img-box
      position: relative
      .mask-box
        .mask-img
          background: rgba(0,0,0,.5)
          border-radius: .06rem
          position: absolute
          width: 100%
          top: 0
          left: 0
  .identity-detail
    padding: .17rem .4rem
    background: #fff
    margin-bottom: .1rem
    p
      line-height: .54rem
      font-size: .28rem
  .button-box
    padding: 1rem .4rem .4rem
  input
    outline: none
    border: 0
    width: 100%
</style>
