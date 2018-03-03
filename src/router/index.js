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

// 认证授权
const RegisterAndPrivacy = (resolve) => {
  import('components/registerAndPrivacy').then((module) => {
    resolve(module)
  })
}

// 认证授权
const RegisterAndPrivacyIos = (resolve) => {
  import('components/registerAndPrivacyIos').then((module) => {
    resolve(module)
  })
}

// 推荐服务协议
const AssessCreditProtocol = (resolve) => {
  import('components/assessCreditProtocol').then((module) => {
    resolve(module)
  })
}

// 推荐服务协议
const AssessCreditProtocolIos = (resolve) => {
  import('components/assessCreditProtocolIos').then((module) => {
    resolve(module)
  })
}

// 协议列表
const ProtocolList = (resolve) => {
  import('components/protocolList').then((module) => {
    resolve(module)
  })
}

// 智能推荐失败
const IntelligentRecommendError = (resolve) => {
  import('components/intelligentRecommendError').then((module) => {
    resolve(module)
  })
}
// 订单列表
const OrderList = (resolve) => { import('components/orderList').then((module) => { resolve(module) }) }
// 评估数据
const EvaluateData = (resolve) => { import('components/evaluateData').then((module) => { resolve(module) }) }
// 评估数据
const EvaluateScore = (resolve) => { import('components/evaluateScore').then((module) => { resolve(module) }) }
// 评估流程
const EvaluateFlow = (resolve) => { import('components/EvaluateFlow').then((module) => { resolve(module) }) }
// 下载列表
const DownloadList = (resolve) => { import('components/downloadList').then((module) => { resolve(module) }) }
// 审核流程
const AuditFlow = (resolve) => { import('components/auditFlow').then((module) => { resolve(module) }) }
// 关于我们
const AboutUs = (resolve) => { import('components/aboutUs').then((module) => { resolve(module) }) }

const AboutUsIos = (resolve) => { import('components/aboutUsIos').then((module) => { resolve(module) }) }
// 常见问题
const Question = (resolve) => { import('components/question').then((module) => { resolve(module) }) }

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
    }, {
      path: '/order-list',
      name: 'orderList',
      component: OrderList
    }, {
      path: '/evaluate-data',
      name: 'evaluateData',
      component: EvaluateData
    }, {
      path: '/evaluate-score',
      name: 'evaluateScore',
      component: EvaluateScore
    }, {
      path: '/evaluate-flow',
      name: 'evaluateFlow',
      component: EvaluateFlow
    }, {
      path: '/download-list',
      name: 'downloadList',
      component: DownloadList
    }, {
      path: '/audit-flow',
      name: 'auditFlow',
      component: AuditFlow
    }, {
      path: '/about-us',
      name: 'aboutUs',
      component: AboutUs
    }, {
      path: '/about-us-ios',
      name: 'aboutUsIos',
      component: AboutUsIos
    }, {
      path: '/question',
      name: 'question',
      component: Question
    }, {
      path: '/register-privacy', // 用户注册服务协议
      name: 'registerAndPrivacy',
      component: RegisterAndPrivacy
    }, {
      path: '/register-privacy-ios', // 用户注册服务协议
      name: 'registerAndPrivacyIos',
      component: RegisterAndPrivacyIos
    }, {
      path: '/assess-credit-protocol', // 评估推荐服务协议
      name: 'assessCredit',
      component: AssessCreditProtocol
    }, {
      path: '/assess-credit-protocol-ios', // 评估推荐服务协议
      name: 'assessCreditIos',
      component: AssessCreditProtocolIos
    }, {
      path: '/protocol-list',
      name: 'protocolList',
      component: ProtocolList
    }, {
      path: '/intelligent-recommend-error',
      name: 'intelligentRecommendError',
      component: IntelligentRecommendError
    }
  ]
})
