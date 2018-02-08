import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const TestList = (resolve) => {
  import('components/testList').then((module) => {
    resolve(module)
  })
}
// 借记卡列表
const BankList = (resolve) => {
  import('components/bankList').then((module) => {
    resolve(module)
  })
}
// 身份信息展示
const IdentityShow = (resolve) => {
  import('components/identityShow').then((module) => {
    resolve(module)
  })
}
// 身份信息录入
const IdentityInput = (resolve) => {
  import('components/identityInput').then((module) => {
    resolve(module)
  })
}
// 联系人信息录入
const ContactInfoInput = (resolve) => {
  import('components/contactInfoInput').then((module) => {
    resolve(module)
  })
}
// 联系人信息显示
const ContactInfoDetail = (resolve) => {
  import('components/contactInfoDetail').then((module) => {
    resolve(module)
  })
}
// 工作信息录入
const WorkInfoInput = (resolve) => {
  import('components/workInfoInput').then((module) => {
    resolve(module)
  })
}
// 工作信息显示
const WorkInfoDetail = (resolve) => {
  import('components/workInfoDetail').then((module) => {
    resolve(module)
  })
}
// 个人信息展示
const PersonalInfo = (resolve) => {
  import('components/personalinfo').then((module) => {
    resolve(module)
  })
}
// 借记卡信息（绑定银行卡）
const BindDebitCard = (resolve) => {
  import('components/bindDebitCard').then((module) => {
    resolve(module)
  })
}
// 信用认证
const CreditCertification = (resolve) => {
  import('components/creditCertification').then((module) => {
    resolve(module)
  })
}
// 支付方式
const PaymentWay = (resolve) => {
  import('components/paymentWay').then((module) => {
    resolve(module)
  })
}
// 其他信息
const ExtendInform = (resolve) => {
  import('components/extendInform').then((module) => {
    resolve(module)
  })
}
// 其他信息展示
const ExtendShow = (resolve) => {
  import('components/extendShow').then((module) => {
    resolve(module)
  })
}
// 智能推荐
const IntelligentRecommend = (resolve) => {
  import('components/intelligentRecommend').then((module) => {
    resolve(module)
  })
}
// 评估
const AssessInfo = (resolve) => {
  import('components/assessInfo').then((module) => {
    resolve(module)
  })
}

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TestList',
      component: TestList
    }, {
      path: '/identity-detail',
      name: 'identityShow',
      component: IdentityShow
    }, {
      path: '/identity-input',
      name: 'identityInput',
      component: IdentityInput
    }, {
      path: '/bank-list',
      name: 'bankList',
      component: BankList
    }, {
      path: '/contactinfo-input',
      name: 'contactInfoInput',
      component: ContactInfoInput
    }, {
      path: '/contactinfo-detail',
      name: 'contactInfoDetail',
      component: ContactInfoDetail
    }, {
      path: '/workinfo-input',
      name: 'workInfoInput',
      component: WorkInfoInput
    }, {
      path: '/workinfo-detail',
      name: 'workInfoDetail',
      component: WorkInfoDetail
    }, {
      path: '/personal-info',
      name: 'personalInfo',
      component: PersonalInfo
    }, {
      path: '/debit-card',
      name: 'bindDebitCard',
      component: BindDebitCard
    }, {
      path: '/credit-certification',
      name: 'creditCertification',
      component: CreditCertification
    }, {
      path: '/payment-way',
      name: 'paymentWay',
      component: PaymentWay
    }, {
      path: '/extend-inform',
      name: 'ExtendInform',
      component: ExtendInform
    }, {
      path: '/extend-show',
      name: 'ExtendShow',
      component: ExtendShow
    }, {
      path: '/intelligent-recommend',
      name: 'IntelligentRecommend',
      component: IntelligentRecommend
    }, {
      path: '/assess-info',
      name: 'AssessInfo',
      component: AssessInfo
    }
  ]
})
