// 數據響應函數
function response (res, code, msg, data = {}, token) {
  if (token) {
    res.json({ code, msg, token, data })
  } else {
    res.json({ code, msg, data })
  }
}

module.exports = response