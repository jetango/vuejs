var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || config.build.port
var proxyMiddleware = require('http-proxy-middleware')
var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/test.json', function (req, res) {
  // TODO
})

// app.use('/api', apiRoutes)

const apiUserApplicationProxy = proxyMiddleware('/application', {target: 'http://192.168.10.23:9003', changeOrigin: true})
const apiUserAPPProxy = proxyMiddleware('/user', {target: 'http://192.168.10.23:9000', changeOrigin: true})
const apiOrderProxy = proxyMiddleware('/order', {target: 'http://192.168.10.23:9001', changeOrigin: true})
const apiMemberProxy = proxyMiddleware('/member', {target: 'http://192.168.10.23:9004', changeOrigin: true})
const apiRepayProxy = proxyMiddleware('/repay', {target: 'http://192.168.10.25:9400', changeOrigin: true})

app.use('/application', apiUserApplicationProxy)
app.use('/user', apiUserAPPProxy)
app.use('/order', apiOrderProxy)
app.use('/member', apiMemberProxy)
app.use('/repay', apiRepayProxy)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
