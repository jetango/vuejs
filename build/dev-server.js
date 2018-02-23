'use strict'
require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')
const axios = require('axios')
const bodyParser = require('body-parser')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()

const compiler = webpack(webpackConfig)
var apiRoutes = express.Router()

var responseData = function (res, data) {
  res.setHeader('userId', '21c2c008-d4c3-42f2-b05f-10575071043e')
  setTimeout(function () {
    res.json(data)
  }, 500)
}

apiRoutes.post('/user/identity/fetch', function (req, res) {
  var result = {
    status: 0,
    msg: 'success',
    data: {
      realName: '李四',
      idNumber: '310110198803161768',
      faceRecognition: 1,  //是否人脸识别 1识别 0 未识别
      livingProvince: '浙江省',
      livingCity: '杭州市',
      livingDistrict: '西湖区',
      livingAddress: '人民路1号',
      highestDegree: '本科',
      maritalStatus: '已婚'
    }
  }
  responseData(res, result)
})

/**
 * 借款信息接口
 * @param request {userId: 'userId',financeProductId: '1681688', loanAmount: '1000', borrowingTime: '7'}
 * @return response
 * {
 *  status: 'status',
 *  msg: 'msg',
 *  data: object
 * }
 */
apiRoutes.post('/order/borrow', function (req, res) {
  // var result = {
  //   status: 0,
  //   msg: 'success',
  //   data: {
  //     loanAmount: '1000', //借款金额
  //     borrowTime: '7', //借款时长
  //     interest: '100', //利息
  //     syntheticalFee: '100', //综合费用
  //     realLoanAmount: '900', //到账金额
  //     repayTotalAmount: '1200', //应还金额
  //     annualizedRate: '1.3', // 年化利率
  //     bankList: [{
  //       bankName: '工商银行', //银行
  //       accountNumber: '6228000666688880000' //银行卡号
  //     }, {
  //       bankName: '工商银行', //银行
  //       accountNumber: '6228000666688880000' //银行卡号
  //     }, {
  //       bankName: '工商银行', //银行
  //       accountNumber: '6228000666688880000' //银行卡号
  //     }] //借记卡列表
  //   }
  // }
  //

  var result = {
      "data": {
          "amountList": [
              {
                  "text": "2000元",
                  "value": "2000"
              },
              {
                  "text": "2200元",
                  "value": "2200"
              },
              {
                  "text": "2400元",
                  "value": "2400"
              },
              {
                  "text": "2600元",
                  "value": "2600"
              },
              {
                  "text": "2800元",
                  "value": "2800"
              },
              {
                  "text": "3000元",
                  "value": "3000"
              }
          ],
          "bankList": [
              {
                  "bankAccount": "6221882900053647806",
                  "bankName": "中国邮政储蓄银行"
              }
          ],
          "dayList": [
              {
                  "text": "30天",
                  "value": "30"
              },
              {
                  "text": "35天",
                  "value": "35"
              },
              {
                  "text": "40天",
                  "value": "40"
              },
              {
                  "text": "45天",
                  "value": "45"
              },
              {
                  "text": "50天",
                  "value": "50"
              }
          ],
          "interestRate": 0.02,
          "memberExpireTime": "2018-01-06"
      },
      "msg": "success",
      "status": "0"
  }

  responseData(res, result)
})

/**
 * 获取会员信息
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
apiRoutes.post('/member/fetch', function (req, res) {
  var result = {
    status: '0',
    msg: 'success',
    data: {
      mobile: '13022341234',
      memberStatus: '未购买', // 会员状态  已过期  \ 未购买
      memberType: '1',
      memberTypeDescribe: '月卡', // 会员类型描述
      expireTime: '', // 会员到期时间
      memberConfigList: [ // 会员配置列表
        {
          type: '1', // 会员类型
          typeDescribe: '月卡', // 会员类型描述
          realFee: '30', // 会员实际金额
          discountFee: '28', // 会员折扣价
          effectTime: '30' // 会员有效周期
        },
        {
          type: '2',
          typeDescribe: '季卡',
          realFee: '90',
          discountFee: '83',
          effectTime: '60'
        },
        {
          type: '3',
          typeDescribe: '半年卡',
          realFee: '186',
          discountFee: '178',
          effectTime: '90'
        }
      ]
    }
  }
  responseData(res, result)
})


/**
 *
 * 借款详情接口
 * @param request {userId: 'userId',orderNo: 'orderNo'}
 * @return response
 * {
 *  status: 'status',
 *  msg: 'msg',
 *  data: object
 * }
 */
apiRoutes.post('/order/borrow/detail', function (req, res) {
  var result = {
    status: 0,
    msg: 'success',
    data: {
      "loanTime": "2017-11-11",     //借款申请时间
      "orderNo": "1681688",     //借款编号
      "loanAmount": "1000", //借款金额
      "borrowTime": "7", //借款时长
      "loanTime": "2017-11-11", //放款日期
      "promiseRepaymentDate": "2017-11-18", //约定还款时间
      "actualRepaymentDate": "2017-11-18", //实际还款时间
      "interest": "100", //利息
      "syntheticalFee": "100", //综合费用
      "repayTotalAmount": "1200", //到期还款额
      "statusDescription": "审核通过" //状态说明
    }
  }
  responseData(res, result)
})
/**
 * 借款详情接口
 * @param request {userId: 'userId',orderNo: 'orderNo'}
 * @return response
 * {
 *  status: 'status',
 *  msg: 'msg',
 *  data: object
 * }
 */
apiRoutes.post('/order/borrow/result', function (req, res) {
  var result = {
    status: 0,
    msg: 'success',
    data: {
      loanAmount: 1000,
      borrowingTime: 7,
      syntheticalFee: 1024,
      orderStatusList: [
        {
          statusCode: '100',
          statusTime: '2017-11-12'
        }
      ]
    }
  }
  responseData(res, result)
})
/**
 * 借款详情接口
 * @param request
 * {
 *   userId: 'userId',
 *   financeProductId: '1681688'
 *   loanAmount: '1000'
 * }
 * @return response
 * {
 *  status: 'status',
 *  msg: 'msg',
 *  data: object
 * }
 */
apiRoutes.post('/order/borrow/confirm', function (req, res) {
  var result = {
    status: 0,
    msg: 'success',
    data: {

    }
  }
  responseData(res, result)
})
/**
 * 身份信息保存
 * @param  {Object} req
 * @param  {Object} res
 * {
 *  idCardFrontPhoto: 'url',
 *  idCardBackPhoto: 'url',
 *  realName: '张三'
 * }
 * @return {Object}
 */
apiRoutes.post('/user/identity', function (req, res) {
  var result = {
    status: 0,
    msg: 'success',
    data: {
      userId: 'YT00089'
    }
  }
  responseData(res, result)
})

apiRoutes.post('/repay/repayment', function(req, res) {
  var result = {
    status: 0,
    msg: 'success',
    data: {
      repayAmount: '1200',
      promiseRepaymentDate: '2017-11-18',
      loadAmount: 1000,
      applicationTime: '2017-11-11',
      remainDays: 8
    }
  }
  responseData(res, result)
})

/**
 * 银行卡信息保存
 */
apiRoutes.post('/user/bank', function(req, res) {
  var result = {
    status: 0,
    msg: 'success',
    data: {
      api: 'bank',
    }
  }
  responseData(res, result)
})

/**
 * 借记卡列表展示
 */
apiRoutes.post('/bank-list/auth', function(req, res) {
  var result = {
    status: '0',
    msg: 'success',
    data: [{
      bankName: '工商银行',
      accountType: '借记卡',
      bankAccount: '6228000666688880000'
    }, {
      bankName: '招商银行',
      accountType: '借记卡',
      bankAccount: '6228000666688884487'
    }, {
      bankName: '建设银行',
      accountType: '借记卡',
      bankAccount: '6228000666688882546'
    }]
  }
  responseData(res, result)
})
/*
 * 借款记录
 * @type {[type]}
 */
apiRoutes.post('/order/borrow/record', function(req, res) {
  var result = {
    status: '0',
    msg: 'success',
    data:  [
        {
          loanAmount: 1200,
          orderStatus: 'F01',
          borrowTime: '7',
          orderNo: '201711160036A'
        },
        {
          loanAmount: 1000,
          orderStatus: 'F04',
          borrowTime: '14',
          orderNo: '201711160036B'
        }
      ]
  }
  responseData(res, result)
})

/**
 * 还款计划表接口
 */
apiRoutes.post('/repay/schedule', function(req, res) {
  var result = {
    status: 0,
    msg: 'success',
    data: [{
      repayAmount: '1200',
      repayTime: '2017-11-18',
      repayStatus: 'F05'
    }, {
      repayAmount: '1300',
      repayTime: '2017-11-23',
      repayStatus: 'F05'
    }, {
      repayAmount: '1500',
      repayTime: '2017-12-19',
      repayStatus: 'F07'
    }]
  }
  responseData(res, result)
})

/*
 * 联系人信息保存
 * @type {[type]}
 */
apiRoutes.post('/user/contact', function(req, res) {
  console.log('contact_post->>>>>>', req.params, req.query, req.body)
  var result = {
    status: '0',
    msg: 'success'
  }
  responseData(res, result)
})

/**
 * 联系人信息展示
 * @type {[type]}
 */
apiRoutes.post('/user/contact/fetch', function(req, res) {
  var result = {
    status: '0',
    msg: 'success',
    data: {
      "directContactRelation": '保镖', //直接联系人关系
      "directContactName": '张三', //直接联系人姓名
      "directContactMobile": '13688866688', //直接联系人电话
      "majorContactRelation": '司机', //重要联系人关系
      "majorContactName": '李四', //重要联系人姓名
      "majorContactMobile": '13866688866' //重要联系人电话
    }
  }
  responseData(res, result)
})

/**
 * 短信验证码发送接口
 * @type {[type]}
 */
apiRoutes.post('/user/smscode', function(req, res) {
  var result = {
    status: '0',
    msg: 'success',
    data: {
      "api": "smscode"
    }
  }
  responseData(res, result)
})

/**
 * 工作信息保存
 * @type {[type]}
 */
apiRoutes.post('/user/job', function(req, res) {
  var result = {
    status: '0',
    msg: 'success',
    data: {
    }
  }
  responseData(res, result)
})

apiRoutes.post('/user/job/fetch', function(req, res) {
  var result = {
    "status": '0',
    "msg":"success",
    "data": {
        "industry": '工薪族', //职业类型
        "profession": '政府机关',
        "company": '上海造艺', //单位名称
        "companyProvince": '上海市', //公司地址省份
        "companyCity": '上海市', //公司地址城市
        "companyDistrict": '杨浦区', //公司地址地区
        "companyAddress": '发财路888号', //公司详细地址
        "telDistrictNo": '021',   //公司电话区号
        "telephone": '56881688',  //公司电话
        "telExtNo": '1',  //分机号
        "salary": '5000-10000'  //薪资（月收入）
    }
  }
  responseData(res, result)
})

apiRoutes.post('/user/score/fetch', function(req, res) {
  var result = {
    "status": '0',
    "msg":"success",
    "data": {
        "stepScore": '80', //资料完整度
        "identityFlag": '1', //身份信息是否填写
        "jobFlag": '1', //工作信息是否填
        "contactFlag": '0', //联系人信息是否填
        "zmxyFlag": '0', //芝麻信用认证
        "mobileFlag": '0', //运营商认证
        "onlineBankFlag": '0', //网银认证
        "tbFlag": '0'
    }
  }
  responseData(res, result)
})

apiRoutes.post('/application/agreement', function(req, res) {
  var result = {
    "status": '0',
    "msg":"success",
    "data": {
        "elecAuthorization": 'elec-authorization',
        "creditAuthorization": 'credit-authorization',
        "serverProtocol": 'server-protocols',
        "bankLoanProtocol": 'loan-protocols',
        "autoRepayProtocol": 'auto-repayment'
    }
  }
  responseData(res, result)
})

apiRoutes.post('/user/score', function(req, res) {
  var result = {
    "status": '0',
    "msg":"success",
    "data": {
        "api": "tbCertification"
    }
  }
  responseData(res, result)
})

/**
 * 还款计划表接口
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
apiRoutes.post('repay/bill-list', function(req, res) {
  var result = {
    "status": "0",
    "msg": "success",
    "data": {
        "billList": [{    //还款计划列表
            "curRepayAmount": "1200", //应还金额
            "billStatus": "F006", //还款状态
            "promiseRepaymentDate": "2017-11-18", //约定还款日期
            "curPeriod": "1",//本次期数
            "periods": "1" //总期数
        }]
    }
  }
  responseData(res, result)
})

/**
 * 还款接口
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
apiRoutes.post('repay/bill', function(req, res) {
  var result = {
    "status": "0",
    "msg": "success",
    "data": {
      "curRepayAmount": "1200",     //本次应还金额
      "promiseRepaymentDate": "2017-11-18", //约定还款时间
      "overdueDays": 12, // 逾期天数
      "remainingDays": 12, // 剩余多少天
      "billStatus": "F006" // 还款状态
    }
  }
  responseData(res, result)
})
/**
 * 扩展信息保存
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
apiRoutes.post('/userExtend/saveOrUpdate/auth', function(req, res) {
  var result = {
    "status": "0",
    "msg": "success",
    "data": {}
  }
  responseData(res, result)
})
/**
 * 扩展信息查询
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
apiRoutes.post('/userExtend/query/auth', function(req, res) {
  var result = {
    "status": "0",
    "msg": "success",
    "data": {
      "email": "448422895@qq.com",
      "qqNumber": "448422895",
      "wechatNumber": "15959369312",
      "userId": "173431600002"
    }
  }
  responseData(res, result)
})
/**
 * 只能推荐接口拉取数据
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
apiRoutes.post('/borrow/auth', function(req, res) {
  var result = {
    status: "0",
    msg: "success",
    data: {
      recAmount: "300",
      appProductInfoList: [
        {
          appCode: "nyd001", //用户ID
          appName: "大行贷",
          appDescription: "放款比较慢，通过率较高",
          minPrincipal: "3000",
          maxPrincipal: "5000",
          minLoanDay: "1",
          maxLoanDay: "3"
        }, {
          appCode: "nyd002", //用户ID
          appName: "侬要贷",
          appDescription: "放款速度快，通过率一般",
          minPrincipal: "500",
          maxPrincipal: "1000",
          minLoanDay: "1",
          maxLoanDay: "1"
        }
      ]

    }
  }
  responseData(res, result)
})
/**
 * 支付接口
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
apiRoutes.post('/ali/appPay', function(req, res) {
  var result = {
    status: "0",
    msg: "success",
    data: {}
  }
  responseData(res, result)
})

/**
 * 审核流程接口
 */
var statusData =  {
  'one': '0',
  'two': '0',
  'three': '0',
  'four': '0',
  'five': '0',
  'six': '0'
}
var keyMap = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six'
}
var index = 0
apiRoutes.post('/audit/flow/auth', function(req, res) {
  index++
  statusData[keyMap[index]] = '1'
  var result = {
    status: '0',
    msg: '',
    data: {
      flowInfo: statusData,
      orderNo: index > 3 ? '1111' : ''
    }
  }
  if (index == 6) {
    statusData = {
      'one': '0',
      'two': '0',
      'three': '0',
      'four': '0',
      'five': '0',
      'six': '0'
    }
    index = 0
  }
  responseData(res, result)
})
/**
 * 下载接口
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
apiRoutes.post('/download/auth', function(req, res) {
  var result = {
    status: "0",
    msg: "success",
    data: [
      {
        userId: "173431600002",
        orderNo: "452345353",
        appCode: "dahangdai",
        appName: "大行贷",
        appPhotoKey: "dahangdai",
        appDescription: "放款快，额度高",
        minPrincipal: "3000",
        maxPrincipal: "5000",
        appInvitationCode: "BA31A0",
        appEffectiveTime: "2018-02-07",
        androidDownloadUrl: "http://app-downloads.nongyaodai.com/nyd_1.0.1.apk",
        iosDownloadUrl: "https://itunes.apple.com/cn/app/%E4%BE%AC%E8%A6%81%E8%B4%B7/id1326789680?mt=8"
      }, {
        userId: "173431600002",
        orderNo: "452345353",
        appCode: "xiaohangdai",
        appName: "小行贷",
        appDescription: "放款快，额度高",
        minPrincipal: "500",
        maxPrincipal: "1000",
        appPhotoKey: "dahangdai",
        appInvitationCode: "BA31OT",
        appEffectiveTime: "2018-02-15",
        androidDownloadUrl: "http://app-downloads.nongyaodai.com/nyd_1.0.1.apk",
        iosDownloadUrl: "https://itunes.apple.com/cn/app/%E4%BE%AC%E8%A6%81%E8%B4%B7/id1326789680?mt=8"
      }
    ]
  }
  responseData(res, result)
})
/**
 * 下载接口
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
apiRoutes.post('/borrow/record/auth', function(req, res) {
  var result = {
    status: "0",
    msg: "success",
    data: [
      {
        userId: "173431600002",
        orderNo: "452345353",
        loanAmount: "3000",
        borrowPeriods: "3",
        orderStatus: '10',
        loanTime: '2018-02-08',
        appList: [
          {
            appCode: 'dahangdai',
            appName: '大行贷',
            appDescription: '放款慢，额度高',
            appInvitationCode: 'BA31A0',
            appEffectiveTime: '1518233735467',
            minPrincipal: "3000",
            maxPrincipal: "5000",
            appPhotoKey: 'appPhotoUrl',
            androidDownloadUrl: "http://www.androidDownloadUrl.com",
            iosDownloadUrl: "http://www.ios.com"
          }, {
            appCode: 'xiao',
            appName: '小行贷',
            appDescription: '放款快，额度低',
            appInvitationCode: 'BA31A0',
            appEffectiveTime: '1527233735467',
            minPrincipal: "500",
            maxPrincipal: "1000",
            appPhotoKey: 'appPhotoUrl',
            androidDownloadUrl: "http://www.androidDownloadUrl.com",
            iosDownloadUrl: "http://www.ios.com"
          }
        ]
      }, {
        userId: "173431600002",
        orderNo: "234353453",
        loanAmount: "1000",
        borrowPeriods: "5",
        orderStatus: '10',
        loanTime: '2018-02-18',
        appList: [
          {
            appCode: 'dahangdai',
            appName: '小行贷',
            appDescription: '放款快，额度低',
            appInvitationCode: 'BA31A0',
            appEffectiveTime: '1518233735467',
            minPrincipal: "500",
            maxPrincipal: "1000",
            appPhotoKey: 'appPhotoUrl',
            androidDownloadUrl: "http://www.androidDownloadUrl.com",
            iosDownloadUrl: "http://www.ios.com"
          }
        ]
      }, {
        userId: "173431600002",
        orderNo: "112345543",
        loanAmount: "1000",
        borrowPeriods: "5",
        orderStatus: '20',
        loanTime: '2018-02-18',
        appList: []
      }
    ]
  }
  responseData(res, result)
})


 // headers:  {accountId: 'ca62d48d-2e08-4e6b-81fa-ff39322d2fd5', userId: '708f2d6b-ee9e-4b89-bcd3-0a29c6945436'}

// userId: '26d3ac8c-ccf5-443d-a96c-71811fe6fc62'

const apiUserApplicationProxy = proxyMiddleware('/application', {target: 'http://10.25.192.4:9003', changeOrigin: true})
const apiUserAPPProxy = proxyMiddleware('/user', {target: 'http://10.25.192.4:9000', changeOrigin: true})
const apiOrderProxy = proxyMiddleware('/order', {target: 'http://10.25.192.4:9001', changeOrigin: true})
const apiRepayProxy = proxyMiddleware('/pay', {target: 'http://10.25.192.4:9200', changeOrigin: true})

app.use('/application', apiUserApplicationProxy)
app.use('/user', apiUserAPPProxy)
app.use('/order', apiOrderProxy)
app.use('/pay', apiRepayProxy)

// app.use('/user', apiRoutes)
// app.use('/order', apiRoutes)
// app.use('/pay', apiRoutes)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
