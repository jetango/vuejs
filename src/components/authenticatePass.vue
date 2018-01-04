<template>
  <div class="no-data">
    <img src="~/common/image/icon_001.png">
    <p class="tip">恭喜您审核已经通过！</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import { doPost, popup } from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    mounted() {
      document.title = '认证通过'
      doPost(types.SCORE, {
        gxbFlag: '1'
      }, {
        success: (data) => {
        },
        error: (data) => {
          popup(null, null, data.msg || '认证服务器异常，请稍后再试！')
        }
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .no-data
    position: absolute
    top: 30%
    text-align: center
    left: 0
    right: 0
    transform: translateY(-50%)
  .tip
    font-size: .32rem
    color: #00cd05
    padding-top: .3rem
</style>
