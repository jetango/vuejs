<template>
  <div class="work-info">
    <div class="list-view h4">
      <div class="item flex" @click="positionSelected()">
        <div class="flex-grow title">职业类型</div>
        <div>{{workInfo.industry ? (workInfo.industry + '-' + workInfo.profession) : '请选择'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item inactive flex">
        <div class="flex-grow">
          <input type="text" placeholder="请填写单位名称" v-model="workInfo.company">
        </div>
      </div>
      <div class="item flex" @click="addressSelected()">
        <div class="flex-grow title">单位地址</div>
        <div>{{fullName}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item inactive flex">
        <div class="flex-grow">
          <input type="text" placeholder="请填写单位详细地址" v-model="workInfo.companyAddress">
        </div>
      </div>
      <div class="item inactive flex">
        <div class="title tel">单位电话</div>
        <div class="flex-grow">
          <input type="text" placeholder="(可选填)" maxlength="20" v-model="workInfo.telephone">
        </div>
      </div>
      <div class="item flex" @click="salarySelected()">
        <div class="flex-grow title">月收入</div>
        <div>{{workInfo.salary ? workInfo.salary : '请选择'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex" @click="hiredateSelected()">
        <div class="flex-grow title">入职时间</div>
        <div>{{workInfo.entryTime ? workInfo.entryTime : '请选择'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
    </div>
    <div class="button-box">
      <div class="button button-primary" @click="saveWorkInfo()">
        提交
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    positionTypes,
    positionItems,
    salarys,
    provinces,
    citys,
    dists
  } from 'common/js/constants'
  import Picker from 'better-picker'
  import {
    doPost,
    popup,
    endPage,
    eeLogUBT
  } from 'common/js/drivers'
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
          salary: '',
          entryTime: ''
        }
      }
    },
    methods: {
      saveWorkInfo() {
        let self = this
        let {
          industry,
          company,
          companyProvince,
          companyCity,
          companyDistrict,
          companyAddress,
          telephone,
          salary,
          profession,
          entryTime
        } = this.workInfo
        let params = {
          industry,
          company,
          companyProvince,
          companyCity,
          companyDistrict,
          companyAddress,
          telephone,
          salary,
          profession,
          entryTime
        }
        if (this._validate(params)) {
          if (this.loading) {
            return
          } else {
            this.loading = true
          }
          eeLogUBT('JobInfomation.Action.Submit', 'click')
          doPost(types.JOB_POST, params, {
            success: function(oData) {
              self.loading = false
              if (oData.status === '0') {
                endPage({})
              }
            },
            error: function(oData) {
              self.loading = false
              popup('', '', oData.msg || '保存工作信息失败！')
            }
          })
        }
      },
      positionSelected() {
        this.positionPicker.show()
        eeLogUBT('JobInfomation.Action.CareerType', 'click')
      },
      salarySelected() {
        this.salaryPicker.show()
        eeLogUBT('JobInfomation.Action.InCome', 'click')
      },
      addressSelected() {
        this.addressPicker.show()
        eeLogUBT('JobInfomation.Action.CompanyAddress', 'click')
      },
      hiredateSelected: function() {
        this.hiredatePicker.show()
        eeLogUBT('JobInfomation.Action.CompanyTime', 'click')
      },
      _validate(params) {
        if (!params.industry) {
          popup('', '', '请选择职业类型')
          return false
        }
        if (!params.company) {
          popup('', '', '请填写单位名称')
          return false
        }
        if (!params.company) {
          popup('', '', '请填写单位名称')
          return false
        }
        if (!params.companyProvince) {
          popup('', '', '请选择单位地址')
          return false
        }
        if (!params.companyAddress) {
          popup('', '', '请填写单位详细地址')
          return false
        }
        if (!params.salary) {
          popup('', '', '请选择月收入')
          return false
        }
        return true
      },
      _initPositionPicker() {
        this.positionIndex = 0
        this.positionPicker = new Picker({
          'data': [positionTypes, positionItems[positionTypes[0].value]],
          'selectedIndex': [0, 0]
        })
        this.positionPicker.on('picker.select', (val, index) => {
          this.workInfo.industry = positionTypes[index[0]].text
          this.workInfo.profession = val[1]
        })
        this.positionPicker.on('picker.change', (index, selectedIndex) => {
          if (index === 0) {
            this.positionIndex = selectedIndex
            this.positionPicker.refillColumn(1, positionItems[positionTypes[selectedIndex].value])
          }
        })
      },
      _initSalaryPicker() {
        this.salaryPicker = new Picker({
          'data': [salarys],
          'selectedIndex': [0]
        })
        this.salaryPicker.on('picker.select', (val, index) => {
          this.workInfo.salary = val[0]
        })
      },
      _initAddress() {
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
            this.workInfo.companyProvince = provinces[this.provinceIdx].text
            this.workInfo.companyCity = citys[pId][this.cityIdx].text
            this.workInfo.companyDistrict = dists[dId][selectedIndex[2]].text
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
      },
      _initHiredate: function() {
        let years = []
        let months = []
        let days = []
        let yearIndex = 0
        let currentYear = Number(new Date().getFullYear())
        for (let i = 0; i < 49; i++) {
          let item = currentYear - i
          years.push({
            text: item + '年',
            value: item + '年'
          })
          i > 0 && i < 13 && months.push({
            text: i + '月',
            value: i + '月'
          })
          i > 0 && i < 32 && days.push({
            text: i + '日',
            value: i + '日'
          })
        }
        let pickerDays = days.slice(0)
        this.hiredatePicker = new Picker({
          'data': [years, months, pickerDays],
          'selectedIndex': [0, 0, 0]
        })
        this.hiredatePicker.on('picker.select', (val, selectedIndex) => {
          let year = years[selectedIndex[0]].value
          let month = months[selectedIndex[1]].value
          month = month.substring(0, month.length - 1)
          let day = days[selectedIndex[2]].value
          day = day.substring(0, day.length - 1)
          let date = `${year.substring(0, year.length - 1)}-${month >= 10 ? month : 0 + month}-${day >= 10 ? day : 0 + day}`
          this.workInfo.entryTime = date
        })
        this.hiredatePicker.on('picker.change', (index, selectedIndex) => {
          if (index === 0) {
            let pickerYear = years[selectedIndex].value
            pickerYear = pickerYear.substring(0, pickerYear.length - 1)
            yearIndex = selectedIndex
            pickerYear % 4 === 0 ? this.hiredatePicker.refillColumn(2, days.slice(0, 29)) : this.hiredatePicker.refillColumn(2, days.slice(0, 28))
          } else if (index === 1) {
            let month = months[selectedIndex].value
            month = month.substring(0, month.length - 1)
            let bigMonth = '135781012'
            let smallMonth = '46911'
            if (month === '2') {
              let pickerYear = years[yearIndex].value
              pickerYear = pickerYear.substring(0, pickerYear.length - 1)
              pickerYear % 4 === 0 ? this.hiredatePicker.refillColumn(2, days.slice(0, 29)) : this.hiredatePicker.refillColumn(2, days.slice(0, 28))
            } else if (bigMonth.indexOf(month) > -1) {
              this.hiredatePicker.refillColumn(2, days.slice(0, 31))
            } else if (smallMonth.indexOf(month) > -1) {
              this.hiredatePicker.refillColumn(2, days.slice(0, 30))
            }
          }
        })
      }
    },
    computed: {
      fullName() {
        return this.workInfo.companyProvince ? `${this.workInfo.companyProvince}-${this.workInfo.companyCity}-${this.workInfo.companyDistrict}` : '省市区'
      }
    },
    mounted() {
      this._initPositionPicker()
      this._initSalaryPicker()
      this._initAddress()
      this._initHiredate()
      eeLogUBT('JobInfomation.Load.Goin', 'goin')
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
</style>
