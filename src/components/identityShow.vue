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
      <div class="item">
        人脸识别：{{identityInfo.faceRecognition}}
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
        identityInfo: {
          realName: '',
          idNumber: '',
          faceRecognition: 0,
          livingProvince: '',
          livingCity: '',
          livingDistrict: '',
          livingAddress: '',
          highestDegree: '',
          maritalStatus: ''
        }
      }
    },
    created() {
      this._fetchIndentityInfo()
    },
    computed: {
      fullName() {
        return `${this.identityInfo.livingProvince}${this.identityInfo.livingCity}${this.identityInfo.livingDistrict}`
      }
    },
    methods: {
      _fetchIndentityInfo() {
        let self = this
        doPost(types.IDENTITY_FETCH, null, {
          success: function(oData) {
            if (oData.status === '0') {
              self.identityInfo = oData.data
            }
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
