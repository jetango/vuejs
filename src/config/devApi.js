import * as types from 'config/api-type'

export default {
  [types.IDENTITY_POST]: '/api/identity',
  [types.IDENTITY_FETCH]: '/api/identity/fetch',
  [types.BORROW_DETAIL]: '/api/borrow/detail',
  [types.BORROW_CONFIRM]: '/api/borrow/confirm',
  [types.GET_REPAYMENT_TIP]: '/api/repay',
  [types.BORROW]: '/api/borrow',
  [types.BANK]: '/api/bank',
  [types.BANK_LIST]: '/api/bankList',
  [types.REPAY_SCHEDULE]: '/api/repay/schedule',
  [types.BORROW_RECORD]: '/api/borrow/record',
  [types.CONTACT_POST]: '/api/contact',
  [types.CONTACT_FETCH]: '/api/contact/fetch',
  [types.SMSCODE]: '/api/smscode',
  [types.JOB_POST]: '/api/job',
  [types.JOB_FETCH]: '/api/job/fetch',
  [types.BORROW_RESULT]: '/api/borrow/result'
}
