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
      <router-link to="/work-info">
        <div class="item flex">
          <p class="flex-grow">工作信息</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/contact-info">
        <div class="item flex">
          <p class="flex-grow">联系人信息</p>
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
      <router-link to="/loan-confirm">
        <div class="item flex">
          <p class="flex-grow">借款确认</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/loan-result">
        <div class="item flex">
          <p class="flex-grow">借款结果页面</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>
    <div class="list-view">
      <router-link to="/loan-detail">
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

    <h4>还款</h4>
    <div class="list-view">
      <router-link to="/repayment-tip">
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
      <router-link to="/services-protocols">
        <div class="item flex">
          <p class="flex-grow">我同意XX协议</p>
          <i class="iconfont icon-117"></i>
        </div>
      </router-link>
    </div>

  </div>
</template>
<style scoped lang="stylus" rel="stylesheet/stylus">
  h4
    height: .8rem
    line-height: .8rem
    padding-left: .4rem
</style>
