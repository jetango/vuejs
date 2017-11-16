<template>
  <div class="identity-input">
    <p class="text-center title">身份证信息将通过公安部认证，非本人信息不得通过审核</p>
    <div class="id-box">
      <div class="flex">
        <div class="flex-grow text-center">
          <p>身份证人像面</p>
          <img src="~/common/image/shenfenzheng.png_tu_002.png">
        </div>
        <div class="flex-grow text-center">
          <p>身份证国徽面</p>
          <img src="~/common/image/shenfenzheng.png_tu_0013.png">
        </div>
      </div>
      <div class="text-center tip" :class="{'v-hide': !(identityInfo.idCardFrontPhoto || identityInfo.idCardBackPhoto)}">请核对以下信息，内容有误请修改</div>
    </div>
    <div class="identity-detail">
      <p>姓名：Mike</p>
      <p>身份证号：430990990990909876</p>
      <p>出生年月：1985年4月</p>
      <p>民族：汉</p>
      <p>住址：惺惺惜惺惺想</p>
      <p>有效期：2014.09.09-2024.09.09</p>
    </div>
    <div class="list-view h4">
      <div class="item flex">
        <div class="flex-grow">人脸识别</div>
        <div>去验证</div>
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
  import {doPost} from 'common/js/drivers'
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
          faceRecognitionFlag: '',
          livingProvince: '',
          livingCity: '',
          livingDistrict: '',
          livingAddress: '',
          highestDegree: '',
          maritalStatus: ''
        }
      }
    },
    methods: {
      confirmIdentity() {
        let {identityInfo} = this.$data
        doPost(types.IDENTITY_POST, identityInfo, {
          success: function(oData) {
            if (oData.status === '0') {
              this.$router.push({
                path: '/identity-show'
              })
            }
          },
          error: function(oData) {
            if (oData.status === 0) {
              // TODO
            }
          }
        })
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
        this.addressPicker = new Picker({
          'data': [provinces, citys[provinces[0].value], dists[provinces[0].value + '$$' + citys[provinces[0].value][0].value]],
          'selectedIndex': [0, 0, 0]
        })
        this.addressPicker.on('picker.select', (val, selectedIndex) => {
          let pId = provinces[selectedIndex[0]].value
          let cId = citys[pId][selectedIndex[1]].value
          let dId = `${pId}$$${cId}`
          this.identityInfo.livingProvince = provinces[this.provinceIdx].text
          this.identityInfo.livingCity = citys[pId][this.cityIdx].text
          this.identityInfo.livingDistrict = dists[dId][selectedIndex[2]].text
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
