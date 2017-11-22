<template>
  <div class="work-info">
    <div class="list-view h4">
      <div class="item flex">
        <div class="flex-grow title">职业类型</div>
        <div>{{workInfo.industry ? (workInfo.industry + '-' +  workInfo.profession) : '请选择'}}</div>
      </div>
      <div class="item flex">
        <div class="flex-grow">
          <input type="text" placeholder="请填写单位名称" v-model="workInfo.company" readonly>
        </div>
      </div>
      <div class="item flex">
        <div class="flex-grow title">单位地址</div>
        <div>{{fullName}}</div>
      </div>
      <div class="item flex">
        <div class="flex-grow">
          <input type="text" placeholder="请填写单位详细地址" v-model="workInfo.companyAddress" readonly>
        </div>
      </div>
      <div class="item flex">
        <div class="title tel">单位电话</div>
        <div class="flex-grow">
          <input type="text" placeholder="(可选填)" v-model="workInfo.telephone" readonly>
        </div>
      </div>
      <div class="item flex">
        <div class="flex-grow title">月收入</div>
        <div>{{workInfo.salary ? workInfo.salary : '请选择'}}</div>
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
        workInfo: {
          industry: '',
          profession: '',
          company: '',
          companyProvince: '',
          companyCity: '',
          companyDistrict: '',
          companyAddress: '',
          telephone: '',
          salary: ''
        }
      }
    },
    methods: {
      _fetchWorkInfo() {
        let self = this
        doPost(types.JOB_FETCH, null, {
          success: function(oData) {
            if (oData.status === '0') {
              self.workInfo = oData.data
            }
          },
          error: function(oData) {
            popup(null, null, oData.msg || '获取数据失败，请稍后再试！')
          }
        })
      }
    },
    mounted() {
      this._fetchWorkInfo()
    },
    computed: {
      fullName() {
        return this.workInfo.companyProvince ? `${this.workInfo.companyProvince}-${this.workInfo.companyCity}-${this.workInfo.companyDistrict}` : '省市区'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .title
    color: #000
  .tel
    padding-right: .1rem
  .button-box
    padding: 1rem .4rem .4rem
  input
    outline: none
    border: 0
    width: 100%
    padding: .3rem 0
</style>
