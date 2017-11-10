class Driver {
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
    param['version'] = '4.0.0'
    param['marketChannel'] = 'web'
    param['code'] = '[B@5b7e7289'

    if(api.indexOf('https://') < 0 && api.indexOf('http://') < 0) {
      api = baseurl + api
    }
  }

  log(type, message) {
    console.log(type, message)
  }

  dialog(title, desc, type, cb) {
    let name = this.proxy.registCB(cb)
    if(type == 'OK') {

    } else if (type == 'OKCANCEL') {

    }
  }

  navigate() {

  }

  popup() {

  }


}
