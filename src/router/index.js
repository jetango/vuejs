import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index'
import LoanComfirm from 'components/loanComfirm'
import LoanDetail from 'components/loanDetail'

Vue.use(Router)

const HelloWorld = (resolve) => {
  import('components/HelloWorld').then((module) => {
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
      path: '/loanComfirm',
      name: 'loanComfirm',
      component: LoanComfirm
    }, {
      path: '/loanDetail',
      name: 'loanDetail',
      component: LoanDetail
    }
  ]
})
