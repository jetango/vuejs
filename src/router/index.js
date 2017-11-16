import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index'

Vue.use(Router)

const HelloWorld = (resolve) => {
  import('components/HelloWorld').then((module) => {
    resolve(module)
  })
}
// 借款确认
const LoanConfirm = (resolve) => {
  import('components/loanConfirm').then((module) => {
    resolve(module)
  })
}
// 借款详情
const LoanDetail = (resolve) => {
  import('components/loanDetail').then((module) => {
    resolve(module)
  })
}
// 借款结果
const LoanResult = (resolve) => {
  import('components/loanResult').then((module) => {
    resolve(module)
  })
}
// 还款计划
const RepaymentLoan = (resolve) => {
  import('components/repaymentLoan').then((module) => {
    resolve(module)
  })
}
// 还款提示
const RepaymentTip = (resolve) => {
  import('components/repaymentTip').then((module) => {
    resolve(module)
  })
}
// 还款方式
const RepaymentWay = (resolve) => {
  import('components/repaymentWay').then((module) => {
    resolve(module)
  })
}
// 借记卡列表
const BankList = (resolve) => {
  import('components/bankList').then((module) => {
    resolve(module)
  })
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    }, {
      path: '/index',
      name: 'index',
      component: Index
    }, {
      path: '/loan-confirm',
      name: 'loanConfirm',
      component: LoanConfirm
    }, {
      path: '/loan-detail',
      name: 'loanDetail',
      component: LoanDetail
    }, {
      path: '/loan-result',
      name: 'loanResult',
      component: LoanResult
    }, {
      path: '/repayment-loan',
      name: 'repaymentLoan',
      component: RepaymentLoan
    }, {
      path: '/repayment-tip',
      name: 'repaymentTip',
      component: RepaymentTip
    }, {
      path: '/repayment-way',
      name: 'repaymentWay',
      component: RepaymentWay
    }, {
      path: '/bank-list',
      name: 'bankList',
      component: BankList
    }
  ]
})
