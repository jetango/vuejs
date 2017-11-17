import axios from 'axios'
import ApiObj from 'config/devApi'

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
    console.log('doPost', api, param, cb)
    let name = this.proxy.registCB(cb)

    axios.post(ApiObj[api], param).then((response) => {
      window.callback(name, response.data)
    })
  }

  log(type, message) {
    let logger = {
      info: 'console.info',
      error: 'console.error',
      warn: 'console.warn',
      debug: 'console.debug'
    }
    function evil(fn) {
      let Fn = Function
      return new Fn('return ' + fn)()
    }
    logger = evil(logger[type])
    logger('message', message)
  }

  dialog(title, desc, type, cb) {
    let name = this.proxy.registCB(cb)
    if (type === 'OK') {
      alert(desc)
      window.callback(name, {
        status: 1,
        error: '',
        message: '',
        data: {result: 1}
      })
    } else if (type === 'OKCANCEL') {
      if (confirm(desc)) {
        window.callback(name, {
          status: 1,
          error: '',
          message: '',
          data: {result: 1}
        })
      } else {
        window.callback(name, {
          status: 1,
          error: '',
          message: '',
          data: {result: 0}
        })
      }
    }
  }

  navigate(pageId, title, param, cb) {
    //
  }

  popup(pageId, title, param) {
    console.log(pageId, title, param)
    alert(title)
  }

  personIdValid(cb) {
    let name = this.proxy.registCB(cb)
    window.callback(name, {
      status: 1,
      data: {
        people: '汉',
        croppedImage: null,
        idNumber: '343456766778980987',
        msg: null,
        sex: '男',
        transerialsId: null,
        error: null,
        type: '第二代身份证',
        address: '陕西省洛南县保安镇乱石坪村八组',
        birthday: '1975年07月09日',
        issueAuthority: null,
        validity: null,
        name: '小哥',
        status: null
      },
      code: null,
      msg: null,
      error: '00000000',
      pageCount: null
    })
  }

  chooseContact(cb) {
    let name = this.proxy.registCB(cb)
    setTimeout(() => {
      window.callback(name, {
        status: 0,
        msg: '',
        data: {
          name: 'james',
          tel: '13000330033'
        }
      })
    }, 500)
  }

  addCard(param, title, cb) {
    let name = this.proxy.registCB(cb)
    window.callback(name, {
      status: 1,
      error: '',
      message: '',
      data: {
        result: 1,
        cardNum: '6228480402564890018',
        bankName: '中国民生银行'
      }
    })
  }

  chooseCard(param, title, cb) {
    let name = this.proxy.registCB(cb)
    window.callback(name, {
      status: 1,
      error: '',
      message: '',
      data: {
        result: 1,
        cardNum: '6228480402564890018',
        bankName: '中国民生银行'
      }
    })
  }

  chooseSchool(param, title, cb) {
    let name = this.proxy.registCB(cb)
    window.callback(name, {
      status: 1,
      error: '',
      message: '',
      data: {
        result: 1,
        schoolId: 1,
        schoolName: '清华大学'
      }
    })
  }

  endPage(param, pageIdentifier) {
    console.log(param, pageIdentifier)
  }

  eeLogBiz(type, event, identity, properties) {
    console.log('eeLogBiz', type, event, identity, properties)
  }

  eeLogError(message) {
    console.log('eeLogError', message)
  }

  eeLogUBT(action, event, properties) {
    console.log('eeLogUBT', action, event, properties)
  }

  setBackBehavior(target) {
    console.log('target', target)
  }

  getUrl(pageId, func) {
    // doPost(proxy.apis.get_we_keyList, {'webKey': pageId}, {
    //   success: function (data) {
    //     func({
    //       status: 1,
    //       data: {
    //         url: data.data[pageId]
    //       }
    //     })
    //   }
    // })
  }

  copyPaste(text) {
    console.log('copyPaste', text)
  }

  grantAuth(text, func) {
    console.log('grantAuth', text, func)
  }

  share(title, linkurl, content) {
    console.log('share', title, linkurl, content)
  }

  showBarButton(pageId, title, position, func, url, cb, param) {
    console.log(pageId, title, position, func, url, cb, param)
  }

  hideBarButton(pageId, param) {
    console.log(pageId, param)
  }
}
