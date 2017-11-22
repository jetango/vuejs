export default class Proxy {
  constructor() {
    this.DRIIVERS = {
      IOS: null,
      ANDROID: null
    }
    this.__current__ = null
    this.__id__ = 1
    this.cbFunc = {}
  }

  static getInstance() {
    if (!Proxy.instance) {
      Proxy.instance = new Proxy()
    }
    return Proxy.instance
  }

  getUrlParam(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    } else {
      return null
    }
  }

  install(driver) {
    this.DRIIVERS[driver.name.toUpperCase()] = driver
  }

  registCB(obj) {
    let st = Math.random().toString()
    st = st.substr(2, st.length)
    let name = `cbFunc${st}`

    if (typeof obj === 'function') {
      this.cbFunc[name] = {
        success: obj
      }
    } else {
      this.cbFunc[name] = obj
    }
    if (this.cbFunc[name] && this.cbFunc[name].hasOwnProperty) {
      if (!this.cbFunc[name].hasOwnProperty('error')) {
        this.cbFunc[name].error = function () {
        }
      }
    }

    return name
  }

  doPost(api, param, cb) {
    this.__current__.doPost(api, param, cb)
  }

  callback(func, data) {
    data = typeof data === 'object' ? data : JSON.parse(data)

    try {
      if (!this.cbFunc[func]) {
        console.log('Not found callback function')
      } else if (Number.parseInt(data.status) === 0) {
        this.cbFunc[func].success(data)
      } else {
        this.cbFunc[func].error(data)
      }
    } catch (e) {
      console.log('error', e.stack)
    }
  }

  log(type, msg) {
    if (typeof msg === 'object') {
      // try {
      //   msg = msg.message
      // } catch (e) { }
    }
    this.__current__.log(type, msg)
  }

  dialog(title, desc, type, cb) {
    this.__current__.dialog(title, desc, type, cb)
  }

  navigate(pageId, title, param, cb) {
    this.__current__.navigate(pageId, title, param, cb)
  }

  popup(pageId, title, param) {
    this.__current__.popup(pageId, title, param)
  }

  toast(title) {
    this.__current__.toast(title)
  }

  personIdValid(cb) {
    this.__current__.personIdValid(cb)
  }

  chooseContact(cb) {
    this.__current__.chooseContact(cb)
  }

  addCard(param, title, cb) {
    this.__current__.addCard(param, title, cb)
  }

  chooseCard(param, title, cb) {
    this.__current__.chooseCard(param, title, cb)
  }

  endPage(param, pageIdentifier) {
    this.__current__.endPage(param, pageIdentifier)
  }

  chooseSchool(param, title, cb) {
    this.__current__.chooseSchool(param, title, cb)
  }

  eeLogBiz(type, event, identity, properties) {
    this.__current__.eeLogBiz(type, event, identity, properties)
  }

  eeLogError(message) {
    this.__current__.eeLogError(message)
  }

  eeLogUBT(action, event, properties) {
    this.__current__.eeLogUBT(action, event, properties)
  }

  setBackBehavior(target) {
    this.__current__.setBackBehavior(target)
  }

  getUrl(key, cb) {
    this.__current__.getUrl(key, cb)
  }

  copyPaste(text) {
    this.__current__.copyPaste(text)
  }

  grantAuth(type, cb) {
    this.__current__.grantAuth(type, cb)
  }

  openApp(appId) {
    this.__current__.openApp(appId)
  }

  share(title, linkurl, content) {
    this.__current__.share(title, linkurl, content)
  }

  showBarButton(pageId, title, position, func, url, cb, param) {
    this.__current__.showBarButton(pageId, title, position, func, url, cb, param)
  }

  hideBarButton(pageId, param) {
    this.__current__.hideBarButton(pageId, param)
  }

  idCardFrontInfo(cb) {
    this.__current__.idCardFrontInfo(cb)
  }

  idCardBackInfo(cb) {
    this.__current__.idCardBackInfo(cb)
  }

  faceRecognition(cb) {
    this.__current__.faceRecognition(cb)
  }

  sesameCertification(cb) {
    this.__current__.sesameCertification(cb)
  }

  phoneCertification(cb) {
    this.__current__.phoneCertification(cb)
  }

  unionPay(param, cb) {
    this.__current__.unionPay(param, cb)
  }

  weChatPay(param, cb) {
    this.__current__.weChatPay(param, cb)
  }

  alipay(param, cb) {
    this.__current__.alipay(param, cb)
  }
}
