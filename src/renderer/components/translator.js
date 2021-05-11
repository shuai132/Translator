import CryptoJS from 'crypto-js'
import $ from 'jquery'

export function translateYouDao (input, cb) {
  const APP_KEY = '2d884bf74bbb1997'
  const APP_SECRET = '68Ef2Ev0HUGXpUj51IULRdrL9PxBgFn8'

  const salt = (new Date()).getTime()
  const curtime = Math.round(new Date().getTime() / 1000)
  const query = input
  const from = 'auto'
  const to = 'auto'
  const str1 = APP_KEY + truncate(query) + salt + curtime + APP_SECRET
  const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex)
  $.ajax({
    url: 'http://openapi.youdao.com/api',
    type: 'post',
    dataType: 'jsonp',
    data: {
      q: query,
      appKey: APP_KEY,
      salt: salt,
      from: from,
      to: to,
      sign: sign,
      signType: 'v3',
      curtime: curtime
    },
    success: function (data) {
      if (data.errorCode !== '0') {
        console.error(data)
        return
      }
      cb(data.translation[0])
    }
  })

  function truncate (q) {
    const len = q.length
    if (len <= 20) return q
    return q.substring(0, 10) + len + q.substring(len - 10, len)
  }
}
