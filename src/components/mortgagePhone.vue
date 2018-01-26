<!-- 手机抵押页面 -->
<template>
  <div class="mortgage-phone">
    <div class="list-view h4">
      <div class="item flex">
        <div class="flex-grow title">手机品牌</div>
        <div>{{infoObj.brand}}</div>
      </div>
      <div class="item flex">
        <div class="flex-grow title">手机型号</div>
        <div>{{infoObj.model}}</div>
      </div>
      <div class="item flex">
        <div class="flex-grow title">设备号</div>
        <div style="font-size: .2rem">{{infoObj.deviceId}}</div>
      </div>
    </div>
    <p class="tip"> 以您的手机作为抵押物，与资金方签订借款合同及抵押合同，并办理相关手续后获得借款。抵押期间，手机仍归您自行使用及保管。借款本息还清后，抵押合同将自动解除。</p>
    <p class="comfirm-protocol flex flex-item flex-justify">
      <span @click="agreeProtocols" class="text-gary">
        <i :class="{'icon-not-chose': isChosed}" class="iconfont icon-correct-marked"></i>我已阅读并同意
        <span @click.stop="checkServicesProtocols">《抵押合同》</span>
      </span>
    </p>
    <div class="button-box">
      <div class="button button-primary" @click="confirmMortgagePhone()">
        提交
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { navigate, popup, endPage } from 'common/js/drivers'
  import {pageIdentity} from 'common/js/constants'
  export default {
    data() {
      return {
        isChosed: false,
        infoObj: {
          brand: '',
          model: '',
          deviceId: ''
        }
      }
    },
    created() {
      let {brand, model, deviceId} = this.$route.query
      this.infoObj = {brand, model, deviceId}
    },
    methods: {
      agreeProtocols() {
        this.isChosed = !this.isChosed
      },
      checkServicesProtocols() {
        navigate('MORTGAGE_PROTOCOLS', '抵押合同协议', {url: pageIdentity.MORTGAGE_PROTOCOLS})
      },
      confirmMortgagePhone() {
        if (this.isChosed) {
          popup(null, null, '请同意抵押合同协议！')
        } else {
          let param = this.infoObj
          endPage({param, url: ''}, 'LOAN_CONFIRM', '-1')
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .tip
    font-size: .2rem;
    color: #9d9d9d;
    line-height: .34rem;
    padding: .46rem .4rem;
    text-indent: 20px;
  .button-box
    padding: .2rem .4rem .4rem
  .icon-not-chose
    color: lightgrey !important
  .comfirm-protocol
    font-size: .2rem
    i
      color: green
      font-size: .22rem
      margin-top: -0.04rem
      margin-right: 0.05rem
    span
      span
        color: #008aff
</style>
