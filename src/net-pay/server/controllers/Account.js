const jwt         = require ('jsonwebtoken')
const moment      = require ('moment')
const bcrypt      = require ('bcrypt')

const Model       = require ('../models/Account')
const AccountCode = require ('./AccountCode')

const updateBasicInformation = async (req, res) => {
  if (!req.body) {
    return res.redirect (403, '/403')
  }

  const mobileNumber = req.body.mobileNumber
  const data = req.body.data
  
  try {
    const account = await Model.findOneAndUpdate ({ mobileNumber }, { ...data })
    if (!account) {
      return res.redirect (404, '/404')
    }

    res.send ({
      date: moment ().toDate (),
      success: true
    })
  } catch (ex) {
    console.error (`${ moment ().format (process.env.DTF) } Error while updating basic information of ${ mobileNumber }`, ex.message || ex)
    return res.redirect (500, '/500')
  }
}

const profileData = async (req, res) => {
  if (!req.body) {
    return res.redirect (403, '/403')
  }

  const mobileNumber = req.body.mobileNumber
  const password = req.body.password

  if (!mobileNumber || !password) {
    return res.redirect ('/login')
  }

  try {

    const account = await Model.findOne ({ mobileNumber })
    if (!account) {
      return res.redirect ('/login')
    }

    if (!bcrypt.compareSync (password, account.password)) {
      return res.redirect ('/login')
    }

    res.send ({
      success: true,
      date: moment ().toDate (),
      message: 'Authentication verified.',
      user: {
        isVerified: account.verified.value,
        code: account.code,
        mobileNumber: account.mobileNumber,
        givenName: account.name.given,
        familyName: account.name.family,
        middleName: account.name.middle,
        addrHouseNo: account.address.houseNo,
        addrStreet: account.address.street,
        addrProvince: account.address.province,
        addrCity: account.address.city,
        addrZipCode: account.address.zipCode,
        bankName: account.bank.name,
        bankProvince: account.bank.province,
        bankCity: account.bank.city,
        bankCardHolder: account.bank.cardHolder,
        bankCardNumber: account.bank.cardNumber,
        validID: account.image.validIDUrl,
        dp: account.image.profileUrl,
        id: account._id
      },
      authToken: account.authToken
    })

  } catch (ex) {
    console.error (`${ moment ().format (process.env.DTF) } Error while authenticating account. ${ mobileNumber }`, ex.message || ex)
    return res.redirect (500, '/500')
  }

}

const authAccount = async (req, res) => {
  if (!req.body) {
    return res.redirect (403, '/403')
  }

  const mobileNumber = req.body.mobileNumber
  const password = req.body.password

  if (!mobileNumber || !password) {
    return res.send ({
      success: false,
      date: moment ().toDate (),
      message: 'Invalid credentials detected. Please try again. code: 0'
    })
  }

  try {

    const account = await Model.findOne ({ mobileNumber })
    if (!account) {
      return res.send ({
        success: false,
        date: moment ().toDate (),
        message: 'Invalid credentials detected. Please try again. code: 1'
      })
    }

    if (!bcrypt.compareSync (password, account.password)) {
      return res.send ({
        success: false,
        date: moment ().toDate (),
        message: 'Invalid credentials detected. Please try again. code: 2'
      })
    }

    res.send ({
      success: true,
      date: moment ().toDate (),
      message: 'Authentication verified.',
      mobileNumber: account.mobileNumber,
      authToken: account.authToken
    })

  } catch (ex) {
    console.error (`${ moment ().format (process.env.DTF) } Error while authenticating account. ${ mobileNumber }`, ex.message || ex)
    return res.redirect (500, '/500')
  }
}

const createAccount = async (req, res) => {
  if (!req.body) {
    return res.redirect (403, '/403')
  }

  try {
    const mobileNumber = req.body.mobileNumber
    const password = req.body.password
    if (!mobileNumber || !password) {
      return res.send ({
        success: false,
        date: moment ().toDate (),
        message: 'Invalid credentials detected. Please try again.'
      })
    }

    const authToken = jwt.sign ({
      mobileNumber, password, 
    }, process.env.AUTH_TOKEN_SECRET)
    const name = {
      given: process.env.NO_VALUE,
      family: process.env.NO_VALUE,
      middle: process.env.NO_VALUE
    }
    const address = {
      houseNo: process.env.NO_VALUE,
      street: process.env.NO_VALUE,
      province: process.env.NO_VALUE,
      city: process.env.NO_VALUE,
      zipCode: process.env.NO_VALUE
    }
    const bank = {
      name: process.env.NO_VALUE,
      province: process.env.NO_VALUE,
      city: process.env.NO_VALUE,
      cardHolder: process.env.NO_VALUE,
      cardNumber: process.env.NO_VALUE
    }
    const code = `NET${ AccountCode.generate (10) }PAY`

    const account = await Model.create ({ mobileNumber, password, code, authToken, name, address, bank })
    if (!account) {
      console.warn (`${ moment ().format (process.env.DTF) } Error while saving account for ${ mobileNumber }@${ password }`)
      return res.redirect (500, '/500')
    }
    res.send ({
      success: true,
      date: moment ().toDate (),
      authToken
    })
  } catch (ex) {
    console.error (`${ moment ().format (process.env.DTF) } Error while creating account.`, ex.message || ex)
    return res.redirect (500, '/500')
  }
}


const checkMobile = async (req, res) => {
  if (!req.body) {
    return res.redirect (403, '/403')
  }

  try {
    const mobileNumber = req.body.mobileNumber
    if (!mobileNumber) {
      return res.redirect (403, '/403')
    }

    const account = await Model.findOne ({ mobileNumber })

    const authToken = jwt.sign ({
      mobileNumber
    }, process.env.AUTH_TOKEN_SECRET)

    return res.send ({
      success: true,
      authToken: account ? null : authToken,
      date: moment ().toDate ()
    })
  } catch (ex) {
    console.error (`${ moment ().format (process.env.DTF) } Error while finding account mobile number for ${ mobileNumber }`)
    return res.redirect (500, '/500')
  }

}


module.exports = { checkMobile, createAccount, authAccount, profileData, updateBasicInformation }