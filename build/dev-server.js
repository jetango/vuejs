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
      faceRecognitionFlag: 1,  //是否人脸识别 1识别 0 未识别
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
      applicationTime: '2017-11-11', //申请时间
      orderNo: '1681688', //借款编号
      loanAmount: '1000', //借款金额
      borrowingTime: '7', //借款时长
      loanTime: '2017-11-11', //放款日期
      promiseRepaymentDate: '2017-11-18',//约定还款时间
      actualRepaymentDate: '2017-11-18', //实际还款时间
      interest: '100',//利息
      accountManageFee: '100', //账户管理费
      repayAmount: '1200',//到期还款额
      statusDescription: '审核通过' //状态说明
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
      orderStatusList: []
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

// const apiProxy = proxyMiddleware('/api', {target: 'http://192.168.2.20:8080', changeOrigin: true})

app.use('/api', apiRoutes)

// app.use('/api', apiProxy)

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
