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
const LoanComfirm = (resolve) => {
  import('components/loanComfirm').then((module) => {
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
      path: '/loan-comfirm',
      name: 'loanComfirm',
      component: LoanComfirm
    }, {
      path: '/loan-detail',
      name: 'loanDetail',
      component: LoanDetail
    }, {
      path: '/loan-result',
      name: 'loanResult',
      component: LoanResult
    }
  ]
})
