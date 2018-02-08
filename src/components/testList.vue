<template>
  <div class="test-list">
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
      <router-link to="/debit-card">
        <div class="item flex">
          <p class="flex-grow">绑定银行卡界面</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>

    <h4>我的</h4>
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
      <router-link to="/payment-way">
        <div class="item flex">
          <p class="flex-grow">支付方式</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/extend-inform">
        <div class="item flex">
          <p class="flex-grow">扩展信息</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/extend-show">
        <div class="item flex">
          <p class="flex-grow">扩展信息展示</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/intelligent-recommend">
        <div class="item flex">
          <p class="flex-grow">智能推荐</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/assess-info">
        <div class="item flex">
          <p class="flex-grow">评估</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>

    <div class="list-view">
      <router-link :to="{path: '/about-us', query: {version: '0.0.1'}}">
        <div class="item flex">
          <p class="flex-grow">关于我们</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>

    <h4>审核</h4>
    <div class="list-view">
      <router-link :to="{path: '/evaluate-flow'}">
        <div class="item flex">
          <p class="flex-grow">评估流程</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link :to="{path: '/evaluate-data'}">
        <div class="item flex">
          <p class="flex-grow">评估数据</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link :to="{path: '/download-list'}">
        <div class="item flex">
          <p class="flex-grow">下载地址</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link :to="{path: '/order-list'}">
        <div class="item flex">
          <p class="flex-grow">订单列表</p>
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
