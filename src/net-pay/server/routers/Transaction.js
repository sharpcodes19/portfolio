const express     = require ('express')
const Router      = express.Router ()

const Controller = require ('../controllers/Transaction')
const AuthenticationToken = require ('../middlewares/AuthenticationToken')

Router.post ('/add-entry', AuthenticationToken, Controller.addEntry)
Router.get ('/wallet-credit/:authToken/:mobileNumber', AuthenticationToken, Controller.walletCredit)
Router.get ('/:authToken/:mobileNumber/:pageNumber/:maxCount', AuthenticationToken, Controller.findTransaction)

module.exports = Router