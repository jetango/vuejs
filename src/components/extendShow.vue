<template>
  <div class="contact-show">
    <div class="list-view">
      <div class="item">
        常用邮箱：{{extendInfo.email}}
      </div>
      <div class="item">
        QQ账号：{{extendInfo.qqNumber}}
      </div>
      <div class="item">
        微信账号：{{extendInfo.wechatNumber}}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    popup,
    doPost,
    log
  } from 'common/js/drivers'
  import * as types from 'config/api-type'
  export default {
    data() {
      return {
        extendInfo: {
          email: null,
          qqNumber: null,
          wechatNumber: null
        }
      }
    },
    methods: {
      initPage: function() {
        let self = this
        doPost(types.EXTEND_QUERY, {}, {
          success: function(oData) {
            if (oData.status === '0') {
              self.extendInfo = oData.data
              console.log(this.extendInfo)
            }
          },
          error: function(oData) {
            log('', oData)
            popup('', '', oData.msg || '保存信息失败')
          }
        })
      }
    },
    mounted: function() {
      this.initPage()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .contact-show
    padding: .1rem 0
    color: #000
    font-size: .3rem

</style>
