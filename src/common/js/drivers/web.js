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
        data: { result: 1 }
      })
    } else if (type === 'OKCANCEL') {
      if (confirm(desc)) {
        window.callback(name, {
          status: 1,
          error: '',
          message: '',
          data: { result: 1 }
        })
      } else {
        window.callback(name, {
          status: 1,
          error: '',
          message: '',
          data: { result: 0 }
        })
      }
    }
  }

  navigate(pageId, title, param, cb) {
    //
  }

  popup(pageId, title, param) {
    console.log(pageId, title, param)
    alert(param)
  }

  // 身份证正面信息
  idCardFrontInfo(cb) {
    let name = this.proxy.registCB(cb)
    window.callback(name, {
      status: '0',
      data: {
        idCardFrontPhoto: 'data:image/jpeg;base64,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',
        realName: 'james',
        idNumber: '320990999009098765',
        birth: '2017年11月11日',
        nation: '汉族',
        idAddress: '上海市黄浦区人民路1号'
      },
      msg: ''
    })
  }

  // 身份证反面信息
  idCardBackInfo(cb) {
    let name = this.proxy.registCB(cb)
    window.callback(name, {
      status: '0',
      data: {
        idCardBackPhoto: 'data:image/jpeg;base64,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',
        signOrg: '上海市公安局黄浦分局',
        effectTime: '2014.09.09-2020.09.09'
      },
      msg: ''
    })
  }

  // 人脸识别
  faceRecognition(cb) {
    let name = this.proxy.registCB(cb)
    window.callback(name, {
      status: '0',
      data: {
        faceRecognition: 1, // 1识别 0 未识别
        faceRecognitionSimilarity: 0.85 // 人脸识别度
      },
      msg: ''
    })
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
          tel: '1' + (Math.random() + '').substring(9)
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

  // 芝麻认证
  sesameCertification(cb) {
    let name = this.proxy.registCB(cb)
    window.callback(name, {
      status: '0' // 0 认证失败   1认证成功
    })
  }

  // 手机运营商认证
  phoneCertification(cb) {
    let name = this.proxy.registCB(cb)
    window.callback(name, {
      status: '0' // 0 认证失败   1认证成功
    })
  }

  // 银联支付
  unionPay(param, cb) {
    let name = this.proxy.registCB(cb)
    window.callback(name, {
      status: '0' // 0 认证失败   1认证成功
    })
  }

  // 微信支付
  weChatPay(param, cb) {
    let name = this.proxy.registCB(cb)
    window.callback(name, {
      status: '0' // 0 认证失败   1认证成功
    })
  }

  // 支付宝支付
  alipay(param, cb) {
    let name = this.proxy.registCB(cb)
    window.callback(name, {
      status: '0'
    })
  }
}
