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
app.use(bodyParser.urlencoded({extened: false}))
const compiler = webpack(webpackConfig)
var apiRoutes = express.Router()

var responseData = function (res, data) {
  res.setHeader('userId', '21c2c008-d4c3-42f2-b05f-10575071043e')
  setTimeout(function () {
    res.json(data)
  }, 500)
}

apiRoutes.post('/identity/fetch', function (req, res) {
  var result = {
    status: 0,
    msg: 'success',
    data: {
      realName: '李四',
      idNumber: '310110198803161768',
      faceRecognition: 1,  //是否人脸识别 1识别 0 未识别
      livingProvinceCode: '浙江省',
      livingCityCode: '杭州市',
      livingDistrictCode: '西湖区',
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
apiRoutes.post('/borrow', function (req, res) {
  var result = {
    status: 0,
    msg: 'success',
    data: {
      loanAmount: '1000', //借款金额
      borrowingTime: '7', //借款时长
      interest: '100', //利息
      syntheticalFee: '100', //综合费用
      realLoanAmount: '900', //到账金额
      repayTotalAmount: '1200', //应还金额
      bankList: [{
        bankName: '工商银行', //银行
        accountNumber: '6228000666688880000' //银行卡号
      }, {
        bankName: '工商银行', //银行
        accountNumber: '6228000666688880000' //银行卡号
      }, {
        bankName: '工商银行', //银行
        accountNumber: '6228000666688880000' //银行卡号
      }] //借记卡列表
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
apiRoutes.post('/borrow/detail', function (req, res) {
  var result = {
    status: 0,
    msg: 'success',
    data: {
      "loanTime": "2017-11-11",     //借款申请时间
      "orderNo": "1681688",     //借款编号
      "loanAmount": "1000", //借款金额
      "borrowingTime": "7", //借款时长
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
apiRoutes.post('/borrow/result', function (req, res) {
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
apiRoutes.post('/borrow/confirm', function (req, res) {
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
apiRoutes.post('/identity', function (req, res) {
  var result = {
    status: 0,
    msg: 'success',
    data: {
      userId: 'YT00089'
    }
  }
  responseData(res, result)
})

apiRoutes.post('/repay', function(req, res) {
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
apiRoutes.post('/bank', function(req, res) {
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
apiRoutes.post('/bankList', function(req, res) {
  var result = {
    status: '0',
    msg: 'success',
    data: [{
      bankName: '工商银行',
      accountType: '借记卡',
      accountNumber: '6228000666688880000'
    }, {
      bankName: '招商银行',
      accountType: '借记卡',
      accountNumber: '6228000666688884487'
    }, {
      bankName: '建设银行',
      accountType: '借记卡',
      accountNumber: '6228000666688882546'
    }]
  }
  responseData(res, result)
})
/*
 * 借款记录
 * @type {[type]}
 */
apiRoutes.post('/borrow/record', function(req, res) {
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
apiRoutes.post('/contact', function(req, res) {
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
apiRoutes.post('/contact/fetch', function(req, res) {
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
apiRoutes.post('/smscode', function(req, res) {
  var result = {
    status: '1',
    msg: '',
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
apiRoutes.post('/job', function(req, res) {
  var result = {
    status: '0',
    msg: 'success',
    data: {
    }
  }
  responseData(res, result)
})

apiRoutes.post('/job/fetch', function(req, res) {
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
// userId: '26d3ac8c-ccf5-443d-a96c-71811fe6fc62'
const apiUserProxy = proxyMiddleware('/api/user', {target: 'http://192.168.2.21:9000', changeOrigin: true, headers: {accountId: 'ca62d48d-2e08-4e6b-81fa-ff39322d2fd5', userId: '708f2d6b-ee9e-4b89-bcd3-0a29c6945436'}})
const apiOrderProxy = proxyMiddleware('/api/order', {target: 'http://192.168.2.21:9001', changeOrigin: true, headers: {accountId: 'ca62d48d-2e08-4e6b-81fa-ff39322d2fd5', userId: '708f2d6b-ee9e-4b89-bcd3-0a29c6945436'}})
const apiRepayProxy = proxyMiddleware('/api/repay', {target: 'http://192.168.2.21:9002', changeOrigin: true, headers: {accountId: 'ca62d48d-2e08-4e6b-81fa-ff39322d2fd5', userId: '708f2d6b-ee9e-4b89-bcd3-0a29c6945436'}})
app.use('/api/user', apiUserProxy)
app.use('/api/order', apiOrderProxy)
app.use('/api/repay', apiRepayProxy)
// app.use('/api', apiRoutes)

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
