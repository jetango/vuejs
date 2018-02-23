### 1. 所有页面键值对配置

```
export const pageIdentity = {
  'IDENTITY_INPUT': '/#/identity-input',                              // 身份信息录入
  'IDENTITY_DETAIL': '/#/identity-detail',                            // 身份信息显示
  'CONTACTINFO_INPUT': '/#/contactinfo-input',                        // 联系人信息录入
  'CONTACTINFO_DETAIL': '/#/contactinfo-detail',                      // 联系人信息显示
  'WORKINFO_INPUT': '/#/workinfo-input',                              // 工作信息录入
  'WORKINFO_DETAIL': '/#/workInfo-detail',                            // 工作信息展示
  'EXTEND_INFORM': '/#/extend-inform',                                // 扩展信息录入
  'EXTEND_SHOW': '/#/extend-show',                                    // 扩展信息展示
  'DEBIT_CARD': '/#/debit-card',                                      // 借记卡信息录入
  'BANK_LIST': '/#/bank-list',                                        // 银行卡列表
  'PAYMENT_WAY': '/#/payment-way',                                    // 支付方式
  'CREDIT_CERTIFICATION': '/#/credit-certification',                  // 信用认证
  'ASSESS_INFO': '/#/assess-info',                                    // 智能评估提示   
  'EVALUATE_FLOW': '/#/evaluate-flow',                                // 评估流程
  'EVALUATE_DATA': '/#/evaluate-data',                                // 评估结果数据
  'EVALUATE_SCORE': '/#/evaluate-score',                              // 信誉积分
  'INTELLIGENT_RECOMMEND': '/#/intelligent-recommend',                // 智能推荐            loanAmount=100&borrowPeriods=3
  'AUDIT_FLOW': '/#/audit-flow',                                      // 审核流程
  'DOWNLOAD_LIST': '/#/download-list',                                // 下载列表
  'ORDER_LIST': '/#/order-list',                                      // 订单列表
  'ABOUT_US': '/#/about-us',                                          // 关于我们
  'QUESTION': '/#/question'                                           // 常见问题
}

```

### 2. 通知原生APP调用`微信`支付
`iOS API: ` plugin://weChatPay?callback=${encodeURIComponent(name)}&param=${encodeURIComponent(JSON.stringify(param))}              
`Android API: `  window.android.plugin('weChatPay', JSON.stringify({ callback: name, param: param }))

**response data**

```
    {
        status: '0',
        msg: ''
    }
```

### 3. 通知原生APP调用`支付宝`支付
`iOS API: ` plugin://alipay?callback=${encodeURIComponent(name)}&param=${encodeURIComponent(JSON.stringify(param))}           
`Android API: ` window.android.plugin('alipay', JSON.stringify({ callback: name, param: param }))         

`
param: {
    successUrl: 'EVALUATE_FLOW',  // 成功回调页面
    title: '评估流程',            // 成功页面的标题
    key: 'EVALUATE_INFO',         // EVALUATE_INFO: 8元；AUDIT_INFO: 300元
    param：{}                     // 传给后端
}
`
**response data**

```
    {
        status: '0',
        msg: ''
    }
```

### 4. 通知原生APP调用`银联支付`支付
`iOS API: `     plugin://unionPay?callback=${encodeURIComponent(name)}&param=${encodeURIComponent(JSON.stringify(param))}            
`Android API: ` window.android.plugin('unionPay', JSON.stringify({ callback: name, param: param }))

**response data**

```
    {
        status: '0',
        msg: ''
    }
```



###  5. 复制字符串到剪切板功能

`IOS API: `  plugin://copyStr?title=${encodeURIComponent(text)}      
`Android API`  window.android.plugin('copyStr', JSON.stringify({ text }))

** response data **

```
    null（无返回）
    
```

###  6. 去下载

`IOS API: `  plugin://downLoadApp?title=${encodeURIComponent(url)}      
`Android API`  window.android.plugin('downLoadApp', JSON.stringify({ url }))

** response data **

```
    null（无返回）
    
