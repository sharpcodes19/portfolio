const express     = require ('express')
const Router      = express.Router ()

const Controller  = require ('../controllers/Account')
const AuthenticationToken = require ('../middlewares/AuthenticationToken')

Router.get ('/:authToken', AuthenticationToken, Controller.profileData)
Router.post ('/auth', AuthenticationToken, Controller.authAccount)
Router.post ('/create-account', AuthenticationToken, Controller.createAccount)
Router.post ('/check-mobile', Controller.checkMobile)
Router.post ('/basic-info', AuthenticationToken, Controller.updateBasicInformation)


module.exports = Router