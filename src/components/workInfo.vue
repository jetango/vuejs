<template>
  <div class="work-info">
    <div class="list-view h4">
      <div class="item flex" @click="positionSelected()">
        <div class="flex-grow title">职业类型</div>
        <div>{{workInfo.industry ? workInfo.industry : '请选择'}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex">
        <div class="flex-grow">
          <input type="text" placeholder="请填写单位名称" v-model="workInfo.company">
        </div>
      </div>
      <div class="item flex" @click="addressSelected()">
        <div class="flex-grow title">单位地址</div>
        <div>{{fullName}}</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex">
        <div class="flex-grow">
          <input type="text" placeholder="请填写单位详细地址" v-model="workInfo.companyAddress">
        </div>
      </div>
      <div class="item flex">
        <div class="title tel">单位电话</div>
        <div class="flex-grow">
          <input type="number" placeholder="(可选填)" v-model="workInfo.telephone">
        </div>
      </div>
      <div class="item flex" @click="salarySelected()">
        <div class="flex-grow title">月收入</div>
        <div>{{workInfo.salary ? workInfo.salary : '请选择'}}</div>
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
  import {positionTypes, positionItems, salarys, provinces, citys, dists} from 'common/js/constants'
  import Picker from 'better-picker'

  export default {
    data() {
      return {
        workInfo: {
          industry: '上班族',
          company: '上海找一',
          companyProvince: '上海市',
          companyCity: '上海市',
          companyDistrict: '杨浦区',
          companyAddress: '发发发路888号',
          telephone: '15767668888',
          salary: '5000-10000'
        }
      }
    },
    methods: {
      saveWorkInfo() {
        let {industry, company, companyProvince, companyCity, companyDistrict, companyAddress, telephone, salary} = this.workInfo
        console.log(industry, company, companyProvince, companyCity, companyDistrict, companyAddress, telephone, salary)
      },
      positionSelected() {
        this.positionPicker.show()
      },
      salarySelected() {
        this.salaryPicker.show()
      },
      addressSelected() {
        this.addressPicker.show()
      },
      _initPositionPicker() {
        this.positionPicker = new Picker({
          'data': [positionTypes, positionItems[positionTypes[0].value]],
          'selectedIndex': [0, 0]
        })
        this.positionPicker.on('picker.select', (val, index) => {
          this.workInfo.industry = val[0]
          this.workInfo.industry = `${positionTypes[this.positionIndex].text}-${val[1]}`
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
        this.addressPicker = new Picker({
          'data': [provinces, citys[provinces[0].value], dists[provinces[0].value + '$$' + citys[provinces[0].value][0].value]],
          'selectedIndex': [0, 0, 0]
        })
        this.addressPicker.on('picker.select', (val, selectedIndex) => {
          let pId = provinces[selectedIndex[0]].value
          let cId = citys[pId][selectedIndex[1]].value
          let dId = `${pId}$$${cId}`
          this.workInfo.companyProvince = provinces[this.provinceIdx].text
          this.workInfo.companyCity = citys[pId][this.cityIdx].text
          this.workInfo.companyDistrict = dists[dId][selectedIndex[2]].text
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
      fullName() {
        return this.workInfo.companyProvince ? `${this.workInfo.companyProvince}-${this.workInfo.companyCity}-${this.workInfo.companyDistrict}` : '省市区'
      }
    },
    mounted() {
      this._initPositionPicker()
      this._initSalaryPicker()
      this._initAddress()
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
