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

const apiUserProxy = proxyMiddleware('/api/user', {target: 'http://192.168.2.21:9000', changeOrigin: true})
const apiOrderProxy = proxyMiddleware('/api/order', {target: 'http://192.168.2.21:9001', changeOrigin: true})
const apiRepayProxy = proxyMiddleware('/api/repay', {target: 'http://192.168.2.21:9010', changeOrigin: true})

app.use('/api/user', apiUserProxy)
app.use('/api/order', apiOrderProxy)
app.use('/api/repay', apiRepayProxy)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
