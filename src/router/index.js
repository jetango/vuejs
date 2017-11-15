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
// 借款结果
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

export default new Router({
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
    }
  ]
})
