<template>
  <div class="test-list">
    <div class="list-view">
      <router-link to="/rate-query">
        <div class="item flex">
          <p class="flex-grow">费率查询</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <h4>信息录入</h4>
    <div class="list-view">
      <router-link to="/identity-input">
        <div class="item flex">
          <p class="flex-grow">身份信息录入</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/identity-detail">
        <div class="item flex">
          <p class="flex-grow">身份信息展示</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/workinfo-input">
        <div class="item flex">
          <p class="flex-grow">工作信息录入</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/workInfo-detail">
        <div class="item flex">
          <p class="flex-grow">工作信息显示</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/contactinfo-input">
        <div class="item flex">
          <p class="flex-grow">联系人信息录入</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/contactinfo-detail">
        <div class="item flex">
          <p class="flex-grow">联系人信息显示</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/debit-card">
        <div class="item flex">
          <p class="flex-grow">借记卡信息</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/credit-certification">
        <div class="item flex">
          <p class="flex-grow">信用认证</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>

    <h4>借款信息</h4>
    <div class="list-view">
      <router-link :to="{path: '/loan-confirm', query: {productCode: '01', loanAmount: 1000, borrowTime: 7, mobile: '12312312312'}}">
        <div class="item flex">
          <p class="flex-grow">借款确认</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link :to="{path: '/loan-result', query: {orderNo: '1732822000010120171124'}}">
        <div class="item flex">
          <p class="flex-grow">借款结果页面</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link :to="{path: '/loan-detail', query: {orderNo: '1732822000010120171124'}}">
        <div class="item flex">
          <p class="flex-grow">借款详情</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/debit-card">
        <div class="item flex">
          <p class="flex-grow">绑定银行卡界面</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/loan-contract">
        <div class="item flex">
          <p class="flex-grow">借款合同</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>

    <h4>还款</h4>
    <div class="list-view">
      <router-link :to="{path: '/repayment-tip', query: {billNo: 'james'}}">
        <div class="item flex">
          <p class="flex-grow">发起还款</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>

    <div class="list-view">
      <router-link to="/repayment-loan">
        <div class="item flex">
          <p class="flex-grow">还款计划</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/repayment-way">
        <div class="item flex">
          <p class="flex-grow">还款方式</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>

    <h4>我的</h4>
    <div class="list-view">
      <router-link to="/borrow-list">
        <div class="item flex">
          <p class="flex-grow">借款记录</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/personal-info">
        <div class="item flex">
          <p class="flex-grow">个人信息</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/bank-list">
        <div class="item flex">
          <p class="flex-grow">借记卡列表</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/choose-bank">
        <div class="item flex">
          <p class="flex-grow">选择借记卡</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>

    <div class="list-view">
      <router-link to="/services-protocols">
        <div class="item flex">
          <p class="flex-grow">我同意XX协议</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>

    <div class="list-view">
      <a href="http://120.132.102.112:8768/pay/ali/wapPay">
        <div class="item flex">
          <p class="flex-grow">支付宝支付</p>
          <i class="iconfont icon-117"></i>
        </div>
      </a>
    </div>
  </div>
</template>
<script style="text/ecmascript-6">
  import {navigate} from 'common/js/drivers'
  export default {
    methods: {
      goPay() {
        navigate('PAY', '支付宝支付', {url: 'http://120.132.102.112:8768/pay/ali/wapPay'})
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  h4
    height: .8rem
    line-height: .8rem
    padding-left: .4rem
</style>
