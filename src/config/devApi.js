import * as types from 'config/api-type'

export default {
  [types.IDENTITY_POST]: '/api/user/identity',
  [types.IDENTITY_FETCH]: '/api/user/identity/fetch',
  [types.JOB_POST]: '/api/user/job',
  [types.JOB_FETCH]: '/api/user/job/fetch',
  [types.CONTACT_POST]: '/api/user/contact',
  [types.CONTACT_FETCH]: '/api/user/contact/fetch',
  [types.BANK]: '/api/user/bank',
  [types.BANK_LIST]: '/api/user/bank-list',
  [types.SMSCODE]: '/api/user/smscode',
  [types.SCORE_FETCH]: '/api/user/score/fetch',
  [types.SCORE]: '/api/user/score',
  [types.BORROW]: '/api/order/borrow',
  [types.BORROW_CONFIRM]: '/api/order/borrow/confirm',
  [types.BORROW_RESULT]: '/api/order/borrow/result',
  [types.BORROW_DETAIL]: '/api/order/borrow/detail',
  [types.BORROW_RECORD]: '/api/order/borrow/record',
  [types.GET_REPAYMENT_TIP]: '/api/repay/bill',
  [types.REPAY_SCHEDULE]: '/api/repay/bill-list',
  [types.USER_CONTRACT]: '/api/application/agreement'
}
