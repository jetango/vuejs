import * as types from 'config/api-type'

export default {
  [types.IDENTITY_POST]: '/api/user/identity',
  [types.IDENTITY_FETCH]: '/api/user/identity/fetch',
  [types.JOB_POST]: '/api/user/job',
  [types.JOB_FETCH]: '/api/user/job/fetch',
  [types.CONTACT_POST]: '/api/user/contact',
  [types.CONTACT_FETCH]: '/api/user/contact/fetch',
  [types.BANK]: '/api/user/bank',
  [types.BANK_LIST]: '/api/user/bankList',
  [types.SMSCODE]: '/api/user/smscode',
  [types.SCORE_FETCH]: '/api/user/score/fetch',

  [types.BORROW]: '/api/order/borrow',
  [types.BORROW_CONFIRM]: '/api/order/borrow/confirm',
  [types.BORROW_RESULT]: '/api/order/borrow/result',
  [types.BORROW_DETAIL]: '/api/order/borrow/detail',
  [types.BORROW_RECORD]: '/api/order/borrow/record',

  [types.GET_REPAYMENT_TIP]: '/api/repay/repayment',
  [types.REPAY_SCHEDULE]: '/api/repay/schedule'

}
