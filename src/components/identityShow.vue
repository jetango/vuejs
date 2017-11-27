<template>
  <div class="identity-show">
    <div class="list-view">
      <div class="item">
        姓名：{{identityInfo.realName}}
      </div>
      <div class="item">
        身份证号：{{identityInfo.idNumber}}
      </div>
      <div class="item">
        常住地址：{{fullName}}
      </div>
      <div class="item">
        最高学历：{{identityInfo.highestDegree}}
      </div>
      <div class="item">
        婚姻状况：{{identityInfo.maritalStatus}}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    doPost,
    popup
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        identityInfo: {
          realName: '',
          idNumber: '',
          faceRecognition: null,
          livingProvince: '',
          livingCity: '',
          livingDistrict: '',
          livingAddress: '',
          highestDegree: '',
          maritalStatus: ''
        }
      }
    },
    mounted() {
      this._fetchIndentityInfo()
    },
    computed: {
      fullName() {
        let {livingProvince} = this.identityInfo
        if (livingProvince) {
          return `${this.identityInfo.livingProvince}${this.identityInfo.livingCity}${this.identityInfo.livingDistrict}`
        }
        return ''
      },
      faceRecognitionValue() {
        return this.identityInfo.faceRecognition === 1 ? '已识别' : this.identityInfo.faceRecognition === 0 ? '未成功' : ''
      }
    },
    methods: {
      _fetchIndentityInfo() {
        let self = this
        doPost(types.IDENTITY_FETCH, null, {
          success: function(oData) {
            console.log(oData)
            self.identityInfo = oData.data
            console.log(JSON.stringify(self.identityInfo))
          },
          error: function(oData) {
            popup(null, null, oData.msg || '信息获取失败，请稍后再试！')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .identity-show
    padding: .1rem 0
    color: #000
    font-size: .3rem
</style>
