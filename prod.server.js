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

const apiUserApplicationProxy = proxyMiddleware('/app/application', {target: 'http://192.168.10.23:9003', changeOrigin: true})
const apiUserAPPProxy = proxyMiddleware('/app/user', {target: 'http://192.168.10.23:9000', changeOrigin: true})
const apiUserProxy = proxyMiddleware('/api/user', {target: 'http://192.168.10.23:9000', changeOrigin: true})
const apiOrderProxy = proxyMiddleware('/api/order', {target: 'http://192.168.10.23:9001', changeOrigin: true})
// const apiOrderProxy = proxyMiddleware('/api/order', {target: 'http://192.168.10.23:9001', changeOrigin: true})
const apiRepayProxy = proxyMiddleware('/api/repay', {target: 'http://192.168.10.25:9400', changeOrigin: true})
const apiMemberProxy = proxyMiddleware('/api/member', {target: 'http://192.168.10.23:9004', changeOrigin: true})


app.use('/app/application', apiUserApplicationProxy)
app.use('/app/user', apiUserAPPProxy)
app.use('/api/user', apiUserProxy)
app.use('/api/order', apiOrderProxy)
app.use('/api/repay', apiRepayProxy)
app.use('/api/member', apiMemberProxy)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
