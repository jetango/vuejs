import Proxy from 'common/js/drivers/proxy'
import { Base64 } from 'js-base64'

let callbackContent = {}
let _proxy = Proxy.getInstance()

export function setCallBackContent(func, index, partten) {
  if (!callbackContent.hasOwnProperty(func)) {
    callbackContent[func] = { count: 0, data: {} }
  }

  callbackContent[func].count++
  callbackContent[func].data['' + index] = partten
}

export function callback(func, data, codec) {
  function decode(text) {
    text = Base64.decode(text)
    text = decodeURIComponent(text)

    return text.replace(/\[:space\]/g, ' ')
  }

  if (data == null && callbackContent.hasOwnProperty(func)) {
    let arr = []
    for (let i = 0; i < callbackContent[func].count; i++) {
      arr.push(callbackContent[func].data[i])
    }
  }

  if (codec !== 'base64') {
    _proxy.callback(func, data)
    return
  }

  data = data.replace(/-/g, '+').replace(/_/g, '/').replace(/\$/g, '=')

  try {
    _proxy.callback(func, decode(data))
  } catch (e) {
    _proxy.callback(func, {
      status: '1',
      message: e.message,
      data: {}
    })
  }
}

export function doPost(api, param, cb) {
  _proxy.doPost(api, param, cb)
}

export function log(type, message) {
  _proxy.log(type, message)
}

export function dialog(title, desc, type, cb) {
  _proxy.dialog(title, desc, type, cb)
}

export function navigate(pageId, title, param, cb) {
  _proxy.navigate(pageId, title, param, cb)
}

export function popup(pageId, title, param) {
  _proxy.popup(pageId, title, param)
}

export function toast(title) {
  _proxy.toast(title)
}

export function personIdValid(cb) {
  _proxy.personIdValid(cb)
}

export function chooseContact(cb) {
  _proxy.chooseContact(cb)
}

export function addCard(param, title, cb) {
  _proxy.addCard(param, title, cb)
}

export function chooseCard(param, title, cb) {
  _proxy.chooseCard(param, title, cb)
}

export function endPage(param, pageIdentifier) {
  _proxy.endPage(param, pageIdentifier)
}

export function eeLogBiz(type, event, identity, properties) {
  _proxy.eeLogBiz(type, event, identity, properties)
}

export function eeLogError(message) {
  _proxy.eeLogError(message)
}

export function eeLogUBT(action, event, properties) {
  _proxy.eeLogUBT(action, event, properties)
}

export function chooseSchool(param, title, cb) {
  _proxy.chooseSchool(param, title, cb)
}

export function setBackBehavior(target) {
  _proxy.setBackBehavior(target)
}

export function getUrl(pageId, func) {
  _proxy.getUrl(pageId, function (data) {
    func(data.data.url)
  })
}

export function copyPaste(text) {
  _proxy.copyPaste(text)
}

export function grantAuth(type, cb) {
  _proxy.grantAuth(type, cb)
}

export function openApp(appId) {
  _proxy.openApp(appId)
}

export function share(title, linkurl, content) {
  _proxy.share(title, linkurl, content)
}

export function showBarButton(pageId, title, position, func, url, cb, param) {
  _proxy.showBarButton(pageId, title, position, func, url, cb, param)
}

export function hideBarButton(pageId, param) {
  _proxy.hideBarButton(pageId, param)
}

export function idCardFrontInfo(cb) {
  _proxy.idCardFrontInfo(cb)
}

export function idCardBackInfo(cb) {
  _proxy.idCardBackInfo(cb)
}

export function faceRecognition(cb) {
  _proxy.faceRecognition(cb)
}

export function sesameCertification(cb) {
  _proxy.sesameCertification(cb)
}

export function phoneCertification(cb) {
  _proxy.phoneCertification(cb)
}

export function tbCertification(cb) {
  _proxy.tbCertification(cb)
}

export function unionPay(param, cb) {
  _proxy.unionPay(cb)
}

export function weChatPay(param, cb) {
  _proxy.weChatPay(cb)
}

export function alipay(param, cb) {
  _proxy.alipay(cb)
}
