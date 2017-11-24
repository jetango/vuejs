import ApiObj from 'config/api'

export default class Driver {
  constructor(name, proxy) {
    this.name = name
    this.proxy = proxy
    this._init()
  }

  _init() {
    this.proxy.install(this)
  }

  doPost(api, param, cb) {
    let name = this.proxy.registCB(cb)
    window.android.call(ApiObj[api], JSON.stringify(param), name)
  }

  log(type, content) {
    window.android.plugin('log', JSON.stringify({ type, content }))
  }

  dialog(title, desc, type, cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('dialog', JSON.stringify({ 'class': type, callback: name, title, desc }))
  }

  navigate(pageId, title, param, cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('navigate', JSON.stringify({ pageId, title, param, callback: name }))
  }

  popup(pageId, title, param) {
    window.android.plugin('popup', JSON.stringify({ pageId, title, param }))
  }

  toast(title) {
    window.android.plugin('toast', JSON.stringify({ title }))
  }

  personIdValid(cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('personIdValid', JSON.stringify({ callback: name }))
  }

  chooseContact(cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('contact', JSON.stringify({ callback: name }))
  }

  addCard(param, title, cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('addCard', JSON.stringify({ param, title, callback: name }))
  }

  chooseCard(param, title, cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('chooseCard', JSON.stringify({ param, title, callback: name }))
  }

  chooseSchool(param, title, cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('chooseSchool', JSON.stringify({ param, title, callback: name }))
  }

  endPage(param, pageIdentifier) {
    window.android.plugin('endPage', JSON.stringify({ param, pageIdentifier }))
  }

  eeLogBiz(type, event, identity, properties) {
    window.android.plugin('eeLogBiz', JSON.stringify({ type, event, identity, properties }))
  }

  eeLogError(message) {
    window.android.plugin('eeLogError', JSON.stringify({ message }))
  }

  eeLogUBT(action, event, properties) {
    window.android.plugin('eeLogUBT', JSON.stringify({ action, event, properties }))
  }

  setBackBehavior(target) {
    window.android.plugin('setBackBehavior', JSON.stringify({ target }))
  }

  getUrl(pageId, func) {
    let name = this.proxy.registCB(func)
    window.android.plugin('getUrl', JSON.stringify({ pageId, callback: name }))
  }

  copyPaste(text) {
    window.android.plugin('copyPaste', JSON.stringify({ text }))
  }

  grantAuth(type, func) {
    let name = this.proxy.registCB(func)
    window.android.plugin('grantAuth', JSON.stringify({ type, callback: name }))
  }

  openApp(openId) {
    window.android.plugin('openApp', JSON.stringify({ openId }))
  }

  share(title, linkUrl, content) {
    window.android.plugin('share', JSON.stringify({ title, linkUrl }))
  }

  showBarButton(pageId, title, position, func, targetUrl, cb, param) {
    let name = this.proxy.registCB(func)
    window.android.plugin('showBarButton', JSON.stringify({ pageId, title, position, 'function': func, targetUrl, callback: name, param }))
  }

  hideBarButton(pageId, param) {
    window.android.plugin('hideBarButton', JSON.stringify({ pageId, param }))
  }

  setNavigationBar(pageId, display, param) {
    window.android.plugin('setNavigationBar', JSON.stringify({ pageId, display, param }))
  }

  openAlbum(pageId, title, param) {
    window.android.plugin('openAlbum', JSON.stringify({ pageId, title, param }))
  }

  // 身份证正面信息
  idCardFrontInfo(cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('idCardFrontInfo', JSON.stringify({ callback: name }))
  }

  // 身份证反面信息
  idCardBackInfo(cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('idCardBackInfo', JSON.stringify({ callback: name }))
  }

  // 人脸识别
  faceRecognition(cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('faceRecognition', JSON.stringify({ callback: name }))
  }

  // 芝麻认证
  sesameCertification(cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('sesameCertification', JSON.stringify({ callback: name }))
  }

  // 手机运营商认证
  phoneCertification(cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('phoneCertification', JSON.stringify({ callback: name }))
  }

  // 淘宝认证
  tbCertification(cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('tbCertification', JSON.stringify({ callback: name }))
  }

  // 银联支付
  unionPay(param, cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('unionPay', JSON.stringify({ callback: name, param: param }))
  }

  // 微信支付
  weChatPay(param, cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('weChatPay', JSON.stringify({ callback: name, param: param }))
  }

  // 支付宝支付
  alipay(param, cb) {
    let name = this.proxy.registCB(cb)
    window.android.plugin('alipay', JSON.stringify({ callback: name, param: param }))
  }
}
