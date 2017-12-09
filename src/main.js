import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import {iosBindTouchstart} from 'common/js/init'
import 'common/stylus/index.styl'
import AndroidDriver from 'common/js/drivers/android'
import IosDriver from 'common/js/drivers/ios'
import WebDriver from 'common/js/drivers/web'
import Proxy from 'common/js/drivers/proxy'
import {callback} from 'common/js/drivers'

Vue.config.productionTip = false

fastclick.attach(document.body)
window.callback = callback

const debug = process.env.NODE_ENV !== 'production'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created: function() {
    new AndroidDriver('ANDROID', Proxy.getInstance())
    new IosDriver('IOS', Proxy.getInstance())
    new WebDriver('WEB', Proxy.getInstance())
    if (debug) {
      //
    }
    (function init() {
      let _proxy = Proxy.getInstance()
      let op = _proxy.getUrlParam('op')
      if (!op) {
        if (navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-IOS') > 0) {
          op = 'IOS'
        } else if (navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-ANDROID') > 0) {
          op = 'ANDROID'
        }
      }
      let os = op ? op.toUpperCase() : 'WEB'
      _proxy.os = os
      _proxy.__current__ = _proxy.DRIIVERS[os]
    })()
    iosBindTouchstart()
  }
})
