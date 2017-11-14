<template>
  <div class="hello">
    <h1 @click="msgClicked()"><span>{{ msg }}</span></h1>

    <h2 @click="confirmClicked()">Confirm</h2>

    <confirm ref="confirm" :text="confirmText"></confirm>

    <div class="demo">
      <div class="do-post" @click="doPostTest()">
        测试doPost
      </div>
    </div>

    <div class="font-test">
      <p>字体</p>
      <i class="icon iconfont icon-162"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Picker from 'better-picker'
  import Confirm from 'base/confirm/confirm'
  import {dialog, doPost} from 'common/js/drivers'
  import * as types from 'config/api-type'

  var data1 = [
    {
      text: '小美',
      value: 1
    }, {
      text: '猪猪',
      value: 2
    }
  ]

  var data2 = [
    {
      text: '张三',
      value: 1
    },
    {
      text: '李四',
      value: 2
    },
    {
      text: '王五',
      value: 3
    },
    {
      text: '赵六',
      value: 4
    },
    {
      text: '吴七',
      value: 5
    },
    {
      text: '陈八',
      value: 6
    },
    {
      text: '杜九',
      value: 7
    },
    {
      text: '黄十',
      value: 8
    },
    {
      text: '呵呵',
      value: 9
    },
    {
      text: '哈哈',
      value: 10
    },
    {
      text: '嘿嘿',
      value: 11
    },
    {
      text: '啦啦',
      value: 12
    }
  ]

  var data3 = [
    {
      text: '开心',
      value: 1
    }, {
      text: '生气',
      value: 2
    },
    {
      text: '搞笑',
      value: 3
    }, {
      text: '难过',
      value: 4
    }
  ]

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        confirmText: 'Are you sure?'
      }
    },
    methods: {
      confirmClicked() {
        // this.$refs.confirm.show()
        let picker = new Picker({
          'data': [data1, data2, data3],
          'selectedIndex': [0, 1, 2],
          'title': '我们都是小学生'
        })
        picker.show()
      },
      msgClicked() {
        dialog('测试数据', 'title', 'OK', function() {
          alert(123)
        })
      },
      doPostTest() {
        doPost(types.IDENTITY_FETCH, {test: '007'}, {
          success: function(oData) {
            console.log('oData', oData)
          }
        })
      }
    },
    components: {
      Confirm
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'

  h1
    px2rem('font-size',56);
    span {
      color: red;
    }

  .test-el
    px2rem('width', 640)
    px2rem('height', 200)
    border: 1px red solid
    box-sizing: border-box

  .font-test i {
    font-size: 40px
    color: green
  }
</style>
