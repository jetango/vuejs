export function initHtmlFontSize() {
  let win = window
  let doc = window.document
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let devicePixelRatio = window.devicePixelRatio
  let recalc = function () {
    let clientWidth = docEl.clientWidth || doc.body.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = clientWidth / 10 + 'px'
  }
  let viewportEl = doc.querySelector('meta[name="viewport"]')
  let scale = 1 / devicePixelRatio
  viewportEl.setAttribute('content', 'width=device-width,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no')
  recalc()
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
}
