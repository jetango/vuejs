import * as types from 'config/api-type'

export default {
  [types.IDENTITY_POST]: '/user/identity/auth',
  [types.IDENTITY_FETCH]: '/user/identity/fetch/auth',
  [types.JOB_POST]: '/user/job/auth',
  [types.JOB_FETCH]: '/user/job/fetch/auth',
  [types.CONTACT_POST]: '/user/contact/auth',
  [types.CONTACT_FETCH]: '/user/contact/fetch/auth',
  [types.BANK]: '/user/bank/auth',
  [types.BANK_LIST]: '/user/bank-list/auth',
  [types.SMSCODE]: '/user/smscode',
  [types.SCORE_FETCH]: '/user/score/fetch/auth',
  [types.SCORE]: '/user/score/auth',
  [types.BORROW]: '/order/borrow/auth',
  [types.BORROW_CONFIRM]: '/order/borrow/confirm/auth',
  [types.BORROW_RESULT]: '/order/borrow/result/auth',
  [types.BORROW_DETAIL]: '/order/borrow/detail/auth',
  [types.BORROW_RECORD]: '/order/borrow/record/auth',
  [types.GET_REPAYMENT_TIP]: '/zeus/bill',
  [types.REPAY_SCHEDULE]: '/zeus/bill-list',
  [types.USER_CONTRACT]: '/application/agreement',
  [types.VIP]: '/member/fetch',
  [types.REGISTER]: '/api/user/channel/register'
}
