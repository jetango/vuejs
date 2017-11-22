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
    // let logger = {
    //   info: 'console.info',
    //   error: 'console.error',
    //   warn: 'console.warn',
    //   debug: 'console.debug'
    // }
    // function evil(fn) {
    //   let Fn = Function
    //   return new Fn('return ' + fn)()
    // }
    // logger = evil(logger[type])
    // logger('message', message)
    console.log('1231231', message)
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
        idCardFrontPhoto: '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',
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
        idCardBackPhoto: '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',
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
