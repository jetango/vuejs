import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const TestList = (resolve) => {
  import('components/testList').then((module) => {
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
// 选择借记卡
const ChooseBank = (resolve) => {
  import('components/chooseBank').then((module) => {
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
// 费率查询
const RateQuery = (resolve) => {
  import('components/rateQuery').then((module) => {
    resolve(module)
  })
}
// 服务与协议页面
const ServicesProtocols = (resolve) => {
  import('components/servicesProtocols').then((module) => {
    resolve(module)
  })
}

// 借款记录
const BorrowList = (resolve) => {
  import('components/borrowList').then((module) => {
    resolve(module)
  })
}

// 借款合同
const LoanContract = (resolve) => {
  import('components/loanContract').then((module) => {
    resolve(module)
  })
}

// 代扣款协议
const AutoRepayment = (resolve) => {
  import('base/protocols/autoRepayment').then((module) => {
    resolve(module)
  })
}

// 电子签名授权协议
const ElecAuthorization = (resolve) => {
  import('base/protocols/elecAuthorization').then((module) => {
    resolve(module)
  })
}

// 认证授权
const CreditAuthorization = (resolve) => {
  import('base/protocols/creditAuthorization').then((module) => {
    resolve(module)
  })
}

// 认证授权
const ServerProtocols = (resolve) => {
  import('base/protocols/serverProtocols').then((module) => {
    resolve(module)
  })
}

// 认证授权
const LoanProtocols = (resolve) => {
  import('base/protocols/loanProtocols').then((module) => {
    resolve(module)
  })
}

// 认证授权
const RegisterProtocol = (resolve) => {
  import('base/protocols/registerProtocol').then((module) => {
    resolve(module)
  })
}

// 认证授权
const PrivacyPolicies = (resolve) => {
  import('base/protocols/privacyPolicies').then((module) => {
    resolve(module)
  })
}

// 认证授权
const RegisterAndPrivacy = (resolve) => {
  import('components/registerAndPrivacy').then((module) => {
    resolve(module)
  })
}

const RegisterAndPrivacyBaoshan = (resolve) => {
  import('components/registerAndPrivacyBaoshan').then((module) => {
    resolve(module)
  })
}

// 自动还款协议
const AutoRepayProtocol = (resolve) => {
  import('components/autoRepayProtocol').then((module) => {
    resolve(module)
  })
}

// 优惠券列表
const CouponList = (resolve) => {
  import('components/CouponList').then((module) => {
    resolve(module)
  })
}

// 优惠券
const Vip = (resolve) => {
  import('components/vip').then((module) => {
    resolve(module)
  })
}

// 引流页
const Guide = (resolve) => {
  import('page/guide').then((module) => {
    resolve(module)
  })
}

// 宝付快捷支付
const BaofuFast = (resolve) => {
  import('components/baofuFast').then((module) => {
    resolve(module)
  })
}

// 活动
const Activity = (resolve) => { import('components/activity').then((module) => { resolve(module) }) }
// 提额
const RaiseCredit = (resolve) => { import('components/raiseCredit').then((module) => { resolve(module) }) }
// 关于我们
const AboutUs = (resolve) => { import('components/aboutUs').then((module) => { resolve(module) }) }
// 关于我们
const AboutUsBaoshan = (resolve) => { import('components/AboutUsBaoshan').then((module) => { resolve(module) }) }
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
    }, {
      path: '/choose-bank',
      name: 'chooseBank',
      component: ChooseBank
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
      path: '/rate-query',
      name: 'rateQuery',
      component: RateQuery
    }, {
      path: '/services-protocols',
      name: 'servicesProtocols',
      component: ServicesProtocols
    }, {
      path: '/borrow-list',
      name: 'borrowList',
      component: BorrowList
    }, {
      path: '/loan-contract',
      name: 'loanContract',
      component: LoanContract
    }, {
      path: '/auto-repayment',
      name: 'autoRepayment',
      component: AutoRepayment
    }, {
      path: '/elec-authorization',
      name: 'elecAuthorization',
      component: ElecAuthorization
    }, {
      path: '/credit-authorization',
      name: 'creditAuthorization',
      component: CreditAuthorization
    }, {
      path: '/server-protocols',
      name: 'serverProtocols',
      component: ServerProtocols
    }, {
      path: '/loan-protocols',
      name: 'loanProtocols',
      component: LoanProtocols
    }, {
      path: '/register-protocol',
      name: 'registerProtocol',
      component: RegisterProtocol
    }, {
      path: '/privacy-policies',
      name: 'privacyPolicies',
      component: PrivacyPolicies
    }, {
      path: '/register-privacy',
      name: 'registerAndPrivacy',
      component: RegisterAndPrivacy
    }, {
      path: '/register-privacy-baoshan',
      name: 'registerAndPrivacyBaoshan',
      component: RegisterAndPrivacyBaoshan
    }, {
      path: '/autorepay-protocol',
      name: 'autorepayProtocol',
      component: AutoRepayProtocol
    }, {
      path: '/coupon-list',
      name: 'couponList',
      component: CouponList
    }, {
      path: '/vip',
      name: 'vip',
      component: Vip
    }, {
      path: '/activity',
      name: 'activity',
      component: Activity
    }, {
      path: '/raise-credit',
      name: 'raiseCredit',
      component: RaiseCredit
    }, {
      path: '/guide',
      name: 'guide',
      component: Guide
    }, {
      path: '/about-us',
      name: 'aboutus',
      component: AboutUs
    }, {
      path: '/about-us-baoshan',
      name: 'aboutusbaoshan',
      component: AboutUsBaoshan
    }, {
      path: '/question',
      name: 'question',
      component: Question
    }, {
      path: '/baofu-fast',
      name: 'baofuFast',
      component: BaofuFast
    }
  ]
})
