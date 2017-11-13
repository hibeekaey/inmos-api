const Cookies = require('cookies')

module.exports = (req, res) => {
  let cookies = new Cookies(req, res)
  cookies.set("inmos_user", "hibeekaey")

  return cookies
}