<template>
  <div class="borrow-list">
    <div class="borrow-item" v-if="borrowList && borrowList.length > 0" v-for="item in borrowList">
      <div class="flex header active flex-item">
        <img src="~common/image/Communal_nyd_2x_001.png">
        <div class="flex-grow title">
          申请金额{{item.loanAmount}}元
        </div>
        <div class="b-id">
          {{item.orderNo}}
        </div>
      </div>
      <div class="flex content flex-item h6">
        <div class="flex-grow date">
          期限：{{item.borrowTime}}天
        </div>
        <div :class="item.orderStatus">
          {{getStatusStr(item.orderStatus)}}
        </div>
      </div>
    </div>
    <div v-if="borrowList && borrowList.length == 0">
      <no-data title="暂无借款记录"></no-data>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {orderStatus} from 'common/js/constants'
  import NoData from 'base/noData/noData'
  import * as types from 'config/api-type'
  import {doPost, popup} from 'common/js/drivers'

  export default {
    data() {
      return {
        borrowList: null
      }
    },
    methods: {
      getStatusStr(key) {
        return orderStatus[key]
      },
      _fetchBorrowList() {
        let self = this
        doPost(types.BORROW_RECORD, null, {
          success: function(oData) {
            self.borrowList = oData.data
          },
          error: function(oData) {
            popup('', '信息错误', oData.msg || '获取数据失败，请稍后再试！')
          }
        })
      }
    },
    mounted() {
      this._fetchBorrowList()
    },
    components: {
      NoData
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .borrow-item
    background: #fff
    margin-top: .3rem
    padding-left: .4rem
    .header
      height: .8rem
      padding-right: .4rem
      img
        width: .44rem
        margin-right: .1rem
      .b-id
        font-size: .24rem
      .title
        font-size: .3rem
        color: #000
    .content
      height: .64rem
      padding-right: .4rem
      padding-left: .54rem
      .date
        color: #000
      .F01, .F00, .F02, .F03, .F05
        color: #2ec200
      .F04, .F07
        color: #c50000
</style>
