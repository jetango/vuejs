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

  _iosCall(url) {
    let iframeDom = document.createElement('iframe')
    iframeDom.src = `${url}&seed={Math.random()}`
    iframeDom.style.display = 'none'
    document.documentElement.appendChild(iframeDom)
  }

  /**
   * API调用函数定义
   * @param  {String}   api   请求URL
   * @param  {Json}     param 参数
   * @param  {Function} cb    回调函数
   * @return {null}
   */
  doPost(api, param, cb) {
    let name = this.proxy.registCB(cb)
    let url = `CALL://${encodeURIComponent(ApiObj[api])}?param=${encodeURIComponent(param)}&cb=${encodeURIComponent(name)}`
    this._iosCall(url)
  }

  /**
   * JS 调用 Native写本地日志
   * @param  {String} type 消息类型: info、error、debug
   * @param  {String} msg 消息内容
   * @return {null}
   */
  log(type, msg) {
    let url = `plugin://log?type=${encodeURIComponent(type)}&content=${encodeURIComponent(msg)}`
    this._iosCall(url)
  }

  /**
   * JS调用Native对话框，并返回结果（例如：确认、取消）
   * @param  {String}   title 对话框标题
   * @param  {String}   desc  对话框内容提示
   * @param  {String}   type  显示交互类型
   * @param  {Function} cb
   * @return {[type]}
   *
   * 1. 完成确认后
   *  callback(<回调对象Id>, <返回参数对象>)
   *
   * 返回参数对象:
   *  {
   *    "status": 1 || 0,
   *    "error": <errorCode>,
   *    "message": <失败消息>,
   *    "data": <JSON>
   *  }
   *
   *  2. 交互类型
   *    类型        描述              备注
   *    OK         显示"确认"按钮     默认返回'1'
   *    OKCANCEL   "确认"、"取消"     1: 确认，0: 取消
   *    YESNO      "是"、"否"         1: 是， 0： 否
   *    YESNOCANCEL "是"、“否”、"取消" 1: 是， 0： 否， -1：取消
   */
  dialog(title, desc, type, cb) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://dialog?class=${encodeURIComponent(type)}&title=${encodeURIComponent(title)}&desc=${encodeURIComponent(desc)}&callback=${encodeURIComponent(name)}`
    this._iosCall(url)
  }

  /**
   * JS调用Native跳转画面，Native负责根据PageID跳转画面
   * @param  {String}   pageId 页面ID页面预先定义
   * @param  {String}   title  被调用页面显示标题
   * @param  {Object}   param  调用页面传递参数
   * @param  {Function} cb
   * @return {null}
   */
  navigate(pageId, title, param, cb) {
    if (!cb) {
      cb = function () { }
    }
    let name = this.proty.registCB(cb)
    let url = `plugin://navigate?page=${encodeURIComponent(pageId)}&title=${encodeURIComponent(title)}&param=${encodeURIComponent(JSON.stringify(param))}&callback=${encodeURIComponent(name)}`
    this._iosCall(url)
  }

  /**
   * JS调用Native弹出框
   * @param  {String} pageId 画面ID，需要预先定义
   * @param  {String} title  被调用画面显示标题
   * @param  {String} param  调用画面参数
   * @return {null}
   */
  popup(pageId, title, param) {
    let url = `plugin://popup?page=${encodeURIComponent(pageId)}&title=${encodeURIComponent(title)}&param=${encodeURIComponent(param)}`
    this._iosCall(url)
  }

  /**
   * JS调用Native弹出框
   * @param  {String} pageId 画面ID，需要预先定义
   * @param  {String} title  被调用画面显示标题
   * @param  {String} param  调用画面参数
   * @return {null}
   */
  toast(title) {
    let url = `plugin://toast?title=${encodeURIComponent(title)}`
    this._iosCall(url)
  }

  /**
   * JS调用Native身份证识别
   * @param  {Function} cb 1. 回调对象ID，识别完成后返回结果, 2. 完成拍照后回调接口
   * @return {null}
   *
   * callback(<回调对象ID>,<返回参数对象>);
   * 返回参数对象格式
   *  {
   *    "status": <0||1>,
   *    "error": <errorCode>
   *    "message": <失败消息>
   *    "data": <json>
   *  }
   */
  personIdValid(cb) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://personIdValid?callback=${encodeURIComponent(name)}`
    this._iosCall(url)
  }

  /**
   * JS 调用Native通讯录,待用户选择通讯录后返回通讯录选择结果
   * @param  {Function} cb 回调对象
   * @return {null}
   *
   * callback(<回调对象ID>,<返回参数对象>);
   *  {
   *    "status": <0||1>,
   *    "error": <errorCode>
   *    "message": <失败消息>
   *    "data": {"name": "name", "tel": "15159999999"}
   *  }
   *
   */
  chooseContact(cb) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://contact?callback=${encodeURIComponent(name)}`
    this._iosCall(url)
  }

  addCard(param, title, cb) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://addCard?callback=${encodeURIComponent(name)}&title=${encodeURIComponent(title)}&param=${encodeURIComponent(JSON.stringify(param))}`
    this._iosCall(url)
  }

  /**
   * JS 调用Native选择银行卡,待用户选择银行卡后返回银行卡
   * @param  {String}   param 参数
   * @param  {String}   title 标题
   * @param  {Function} cb
   * @return {[type]}
   *
   * 新增银行卡并返回接口: callback(<回调对象ID>,<返回参数对象>);
   *  返回参数对象
   *    {
   *    "status": <0||1>,
   *    "error": <errorCode>
   *    "message": <失败消息>
   *    "data": {"cardNum": "<银行卡号码>", "bankName": "银行卡号码名称"}
   *    }
   */
  chooseCard(param, title, cb) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://chooseCard?callback=${encodeURIComponent(name)}&title=${encodeURIComponent(title)}&param=${encodeURIComponent(JSON.stringify(param))}`
    this._iosCall(url)
  }

  /**
   * JS 调用Native选择学校,待用户选择学校后返回学校
   * @param  {JSON}     param  参数
   * @param  {String}   title  标题
   * @param  {Function} cb     回调对象
   * @return {null}
   *
   * 新增选择学校并返回接口: callback(<回调对象ID>,<返回参数对象>);
   * 返回参数对象格式:
   *  {
   *    "status": <0||1>,
   *    "error": <errorCode>
   *    "message": <失败消息>
   *    "data": {"schoolId": "<学校Id>", "schoolName": "学校名称"}
   *  }
   *
   */
  chooseSchool(param, title, cb) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://chooseSchool?callback=${encodeURIComponent(name)}&title=${encodeURIComponent(title)}&param=${encodeURIComponent(JSON.stringify(param))}`
    this._iosCall(url)
  }

  /**
   * JS 调用Native结束当前页并将结果返回前一个页面
   * @param  {JSON}   param          参数
   * @param  {String} pageIdentifier 页面ID
   * @return {null}
   */
  endPage(param, pageIdentifier) {
    let url = `plugin://endPage?param=${encodeURIComponent(JSON.stringify(param))}&pageIdentifier=${pageIdentifier}`
    this._iosCall(url)
  }

  /**
   * JS 调用Native记录鹰眼记录业务事件
   * @param  {String} type       需要监控目标的事件名称,需根据不同的业务需求定义；如：进单（OrderIn）
   * @param  {String} event      业务的唯一标识；如：借款单号
   * @param  {String} identity   事件的具体属性，以dict的形式存在。，它的类型和中文名已经预先定义好了，自定义属性请不要以$开头
   * @param  {JSON} properties 同时，同一个名称的property，在同一业务类型中的不同event中，必须保持一致的定义和类型
   * @return {null}
   *
   * 参数描述
   * 点击"、"输入"、"跳转"、"进入"、"滑动"
   * 'action':{'click':'CLICK','input':'INPUT','jump':'JUMP','goin':'GOIN','slide':'SLIDE'}
   *
   */
  eeLogBiz(type, event, identity, properties) {
    let url = `plugin://eeLogBiz?type=${type}&event=${event}&identity=${identity}&properties=${encodeURIComponent(JSON.stringify(properties))}`
    this._iosCall(url)
  }

  /**
   * JS调用Native记录鹰眼记录错误消息
   * @param  {String} message 记录错误消息
   * @return {null}
   */
  eeLogError(message) {
    let url = `plugin://eeLogError?message=${message}`
    this._iosCall(url)
  }

  /**
   * JS 调用Native记录鹰眼记录UBT消息
   * @param  {String} action     要监控的目标的事件名称，通常是同一组目标的名字，比如"产品浏览"、"单期借款"、"借款银行卡"等等。该项必选
   * @param  {String} event      事件的具体属性，以dict的形式存在。其中以$开头的表明是系统的保留字段，它的类型和中文名已经预先定义好了，自定义属性请不要以$开头
   * @param  {JSON} properties [description]
   * @return {null}
   */
  eeLogUBT(action, event, properties) {
    let url = `plugin://eeLogUBT?action=${action}&event=${event}&properties=${encodeURIComponent(JSON.stringify(properties))}`
    this._iosCall(url)
  }

  /**
   * JS 调用Native触发返回选项
   * @param {String} target 调用画面参数
   */
  setBackBehavior(target) {
    let url = `plugin://setBackBehavior?target=${target}`
    this._iosCall(url)
  }

  /**
   * JS 调用 Native 获取Url
   * @param  {String} pageId key值
   * @param  {Function} func   回调对象
   * @return {null}
   *
   * callback(<回调对象ID>,<返回参数对象>)
   * 返回参数对象格式:
   *  {
   *    "status": <0||1>,
   *    "error": <errorCode>
   *    "message": <失败消息>
   *    "data": {"url": "<url地址>"}
   *  }
   *
   */
  getUrl(pageId, func) {
    let name = this.proxy.registCB(func)
    let url = `plugin://getUrl?pageId=${encodeURIComponent(pageId)}&callback=${encodeURIComponent(name)}`
    this._iosCall(url)
  }

  /**
   * JS 调用 Native 复制
   * @param  {String} text
   * @return {null}
   */
  copyPaste(text) {
    let url = `plugin://copyPaste?text=${encodeURIComponent(text)}`
    this._iosCall(url)
  }

  /**
   * JS 调用 Native 调用QQ 微信 授权
   * @param  {String} type 认证类型: QQ || WEIXIN
   * @param  {Function} func 回调对象
   * @return {null}
   *
   * callback(<回调对象ID>,<返回参数对象>)
   * 返回参数对象格式:
   *  {
   *    "status": <0||1>,
   *    "error": <errorCode>
   *    "message": <失败消息>
   *    "data": <TODO>
   *  }
   */
  grantAuth(type, func) {
    let name = this.proxy.registCB(func)
    let url = `plugin://grantAuth?type=${encodeURIComponent(type)}&callback=${encodeURIComponent(name)}`
    this._iosCall(url)
  }

  /**
   * JS 调用Native打开外部页面
   * @param  {String} appId
   * @return {null}
   */
  openApp(appId) {
    let url = `plugin://openApp?appId=${encodeURIComponent(appId)}`
    this._iosCall(url)
  }

  /**
   * JS 调用 Native 调用分享
   * @param  {String} title   标题
   * @param  {String} linkurl 链接
   * @param  {String} content 内容
   * @return {null}
   */
  share(title, linkurl, content) {
    let url = `plugin://share?title=${encodeURIComponent(title)}&linkurl=${encodeURIComponent(linkurl)}&content=${encodeURIComponent(content)}`
    this._iosCall(url)
  }

  /**
   * 导航栏右侧按钮控制
   * @param  {String}   pageId    <pageId>
   * @param  {String}   title     标题
   * @param  {String}   position  左、右 : 0=left,1=right
   * @param  {[type]}   func      1: 'home' 回首页， 2： 'jump' 跳转去 3: 'callback' 执行回调函数 4: 'custom' 自定义
   * @param  {String}   targetUrl 跳转地址
   * @param  {Function} cb        回调函数
   * @param  {JSON}   param     参数
   * @return {null}
   */
  showBarButton(pageId, title, position, func, targetUrl, cb, param) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://showBarButton?pageId=${encodeURIComponent(pageId)}&title=${encodeURIComponent(title)}&position=${encodeURIComponent(position)}&function=${encodeURIComponent(func)}&targetUrl=${encodeURIComponent(targetUrl)}&callback=${encodeURIComponent(name)}&param=${encodeURIComponent(param)}`
    this._iosCall(url)
  }

  /**
   * 隐藏导航栏右侧按钮控制
   * @param  {String} pageId [description]
   * @param  {JSON} param  [description]
   * @return {[type]}        [description]
   */
  hideBarButton(pageId, param) {
    let url = `plugin://hideBarButton?page=${encodeURIComponent(pageId)}&param=${encodeURIComponent(param)}`
    this._iosCall(url)
  }

  /**
   * 隐藏导航栏控制
   * @param {String} pageId
   * @param {String} display show: 显示、hide: 隐藏
   * @param {null} param
   */
  setNavigationBar(pageId, display, param) {
    let url = `plugin://setNavigationBar?pageId=${encodeURIComponent(pageId)}&display=${encodeURIComponent(display)}&param=${encodeURIComponent(param)}`
    this._iosCall(url)
  }

  /**
   * JS调用Native打开相册
   * @param  {String} pageId
   * @param  {String} title
   * @param  {JSON} param
   * @return {null}
   */
  openAlbum(pageId, title, param) {
    let url = `plugin://openAlbum?page=${encodeURIComponent(pageId)}&title=${encodeURIComponent(title)}&param=${encodeURIComponent(JSON.stringify(param))}`
    this._iosCall(url)
  }

  // 身份证正面信息
  idCardFrontInfo(cb) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://idCardFrontInfo?callback=${encodeURIComponent(name)}`
    this._iosCall(url)
  }

  // 身份证反面信息
  idCardBackInfo(cb) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://idCardBackInfo?callback=${encodeURIComponent(name)}`
    this._iosCall(url)
  }

  // 人脸识别
  faceRecognition(cb) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://faceRecognition?callback=${encodeURIComponent(name)}`
    this._iosCall(url)
  }

  // 芝麻认证
  sesameCertification(cb) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://sesameCertification?callback=${encodeURIComponent(name)}`
    this._iosCall(url)
  }

  // 手机运营商认证
  phoneCertification(cb) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://phoneCertification?callback=${encodeURIComponent(name)}`
    this._iosCall(url)
  }

  // 淘宝认证
  tbCertification(cb) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://tbCertification?callback=${encodeURIComponent(name)}`
    this._iosCall(url)
  }

  // 银联支付
  unionPay(param, cb) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://unionPay?callback=${encodeURIComponent(name)}&param=${encodeURIComponent(JSON.stringify(param))}`
    this._iosCall(url)
  }

  // 微信支付
  weChatPay(param, cb) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://weChatPay?callback=${encodeURIComponent(name)}&param=${encodeURIComponent(JSON.stringify(param))}`
    this._iosCall(url)
  }

  // 支付宝支付
  alipay(param, cb) {
    let name = this.proxy.registCB(cb)
    let url = `plugin://alipay?callback=${encodeURIComponent(name)}&param=${encodeURIComponent(JSON.stringify(param))}`
    this._iosCall(url)
  }
}
