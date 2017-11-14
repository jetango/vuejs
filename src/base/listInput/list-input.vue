<template>
  <div class="list-input flex flex-item flex-grow active">
    <div class="flex-grow">
      <p>
        <span>借款记录</span>
        <span v-if="show" class="input-text" v-html="inputValue" @click="chose"></span>
      </p>
    </div>
    <img class="icon-back" src="~common/image/ICON_Communal_sanjiao_2x_001.png">
  </div>
</template>

<script>
  import Picker from 'better-picker'
  import city from 'common/js/city.js'
  export default {
    data() {
      return {
        msg: 'hello world',
        show: true,
        inputValue: '上海造艺网络科技有限公司',
        pickers: {
          first: [],
          second: [],
          third: [],
          selectedIndex: [0, 0, 0],
          checked: [0, 0, 0]
        },
        picker: {}
      }
    },
    created: function() {
      this._initPicker()
    },
    methods: {
      _initPicker() {
        this.createList(city, this.$data.pickers.first)
        if (city[this.$data.pickers.selectedIndex[0]].hasOwnProperty('sub')) {
          this.createList(city[this.$data.pickers.selectedIndex[0]].sub, this.$data.pickers.second)
        } else {
          this.$data.pickers.second = [{
            text: '',
            value: 0
          }]
        }
        if (city[this.$data.pickers.selectedIndex[0]].sub[this.$data.pickers.selectedIndex[1]].hasOwnProperty('sub')) {
          this.createList(city[this.$data.pickers.selectedIndex[0]].sub[this.$data.pickers.selectedIndex[1]].sub, this.$data.pickers.third)
        } else {
          this.$data.pickers.third = [{
            text: '',
            value: 0
          }]
        }
        let picker = new Picker({
          data: [this.$data.pickers.first, this.$data.pickers.second, this.$data.pickers.third],
          selectedIndex: this.$data.pickers.selectedIndex,
          title: '地址选择'
        })
        // var inputValue = this.$data.inputValue
        picker.on('picker.select', (selectedVal, selectedIndex) => {
          let text1 = this.$data.pickers.first[selectedIndex[0]].text
          let text2 = this.$data.pickers.second[selectedIndex[1]].text
          let text3 = this.$data.pickers.third[selectedIndex[2]] ? this.$data.pickers.third[selectedIndex[2]].text : ''
          this.$data.inputValue = text1 + ' ' + text2 + ' ' + text3
        })
        var firstChange = this.firstChange
        var secondChange = this.secondChange
        picker.on('picker.change', function(index, selectedIndex) {
          if (index === 0) {
            firstChange(picker, selectedIndex)
          } else if (index === 1) {
            secondChange(picker, selectedIndex)
          }
        })
        picker.on('picker.valuechange', function(selectedVal, selectedIndex) {
          // console.log(selectedVal)
          // console.log(selectedIndex)
        })
        this.$data.picker = picker
      },
      chose: function() {
        this.$data.picker.show()
      },
      createList: function(obj, list) {
        obj.forEach(function(item, index, arr) {
          let temp = {
            text: item.name,
            value: index
          }
          list.push(temp)
        })
      },
      firstChange: function(picker, selectedIndex) {
        this.$data.pickers.second = []
        this.$data.pickers.third = []
        this.$data.pickers.checked[0] = selectedIndex
        var firstCity = city[selectedIndex]
        if (firstCity.hasOwnProperty('sub')) {
          this.createList(firstCity.sub, this.$data.pickers.second)
          var secondCity = city[selectedIndex].sub[0]
          if (secondCity.hasOwnProperty('sub')) {
            this.createList(secondCity.sub, this.$data.pickers.third)
          } else {
            this.$data.pickers.third = [{
              text: '',
              value: 0
            }]
            this.$data.pickers.checked[2] = 0
          }
        } else {
          this.$data.pickers.second = [{
            text: '',
            value: 0
          }]
          this.$data.pickers.third = [{
            text: '',
            value: 0
          }]
          this.$data.pickers.checked[1] = 0
          this.$data.pickers.checked[2] = 0
        }
        picker.refillColumn(1, this.$data.pickers.second)
        picker.refillColumn(2, this.$data.pickers.third)
        picker.scrollColumn(1, 0)
        picker.scrollColumn(2, 0)
      },
      secondChange: function(picker, selectedIndex) {
        this.$data.pickers.third = []
        this.$data.pickers.checked[1] = selectedIndex
        let firstIndex = this.$data.pickers.checked[0]
        if (city[firstIndex].sub[selectedIndex].hasOwnProperty('sub')) {
          let secondCity = city[firstIndex].sub[selectedIndex]
          this.createList(secondCity.sub, this.$data.pickers.third)
          picker.refillColumn(2, this.$data.pickers.third)
          picker.scrollColumn(2, 0)
        } else {
          this.$data.pickers.third = [{
            text: '',
            value: 0
          }]
          this.$data.pickers.checked[2] = 0
          picker.refillColumn(2, this.$data.pickers.third)
          picker.scrollColumn(2, 0)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/styplus">
  @import "~common/stylus/base"
  @import "~common/stylus/mixin"
  
  .list-input
    height: 1rem
    background-color: #fff
    padding-left: .4rem
    font-size: .28rem
    text-align: left
    color: #525252
    .icon-back
      width: .12rem
      height: .2rem
      margin-right: .4rem
    div
      p
        .input-text
          float: right
          margin-right: .24rem
          font-size: .23rem
          color: #afafaf
          margin-top: .05rem
</style>