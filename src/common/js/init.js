import util from 'common/js/util'

export function iosBindTouchstart() {
  // 解决ios设备下active伪类的问题
  if (util.isIos()) {
    document.body.addEventListener('touchstart', function () { })
  }
}
