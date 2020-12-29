const jwt = require ('jsonwebtoken')

module.exports = (req, res, next) => {

  if (!req.body) {
    return res.redirect (403, '/403')
  }

  const token = req.body.authToken || req.params.authToken

  if (token) {
    jwt.verify (token, process.env.AUTH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.redirect ('/login')
      }
      req.body.mobileNumber = decoded.mobileNumber
      if (decoded.password)
        req.body.password = decoded.password
    })
  }
  next ()
  
}